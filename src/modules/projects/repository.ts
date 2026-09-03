import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { ProjectInput, ProjectRecord } from './types';

const COLLECTION_NAME = 'projects';

function collection() {
  return getFirebaseAdminDb().collection(COLLECTION_NAME);
}

function normalizeTimestamp(value: unknown) {
  if (!value) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  return null;
}

function mapProject(docId: string, data: FirebaseFirestore.DocumentData): ProjectRecord {
  return {
    id: docId,
    slug: data.slug,
    image: data.image,
    link: data.link,
    order: data.order,
    published: data.published,
    translations: data.translations,
    createdAt: normalizeTimestamp(data.createdAt),
    updatedAt: normalizeTimestamp(data.updatedAt),
  };
}

export async function listProjectRecords() {
  const snapshot = await collection().get();
  return snapshot.docs
    .map((doc) => mapProject(doc.id, doc.data()))
    .sort((first, second) => {
      if (first.order !== second.order) {
        return first.order - second.order;
      }

      return first.id.localeCompare(second.id);
    });
}

export async function getNextProjectOrder() {
  const snapshot = await collection().orderBy('order', 'desc').limit(1).get();
  const lastOrder = snapshot.docs[0]?.data().order;

  return typeof lastOrder === 'number' ? lastOrder + 1 : 1;
}

export async function createProjectRecord(input: ProjectInput) {
  const docRef = collection().doc();
  await docRef.set({
    ...input,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  const created = await docRef.get();
  return mapProject(created.id, created.data() || input);
}

export async function updateProjectRecord(id: string, input: Partial<ProjectInput>) {
  const docRef = collection().doc(id);
  await docRef.update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await docRef.get();
  if (!updated.exists) {
    throw new Error('Project not found after update.');
  }

  return mapProject(updated.id, updated.data() || {});
}

export async function deleteProjectRecord(id: string) {
  await collection().doc(id).delete();
}

export async function updateProjectOrders(projectIds: string[]) {
  const batch = getFirebaseAdminDb().batch();

  projectIds.forEach((projectId, index) => {
    batch.update(collection().doc(projectId), {
      order: index + 1,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
}
