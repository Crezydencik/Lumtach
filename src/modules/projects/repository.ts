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
  const snapshot = await collection().orderBy('order', 'asc').get();
  return snapshot.docs.map((doc) => mapProject(doc.id, doc.data()));
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

export async function isProjectsCollectionEmpty() {
  const snapshot = await collection().limit(1).get();
  return snapshot.empty;
}

export async function seedProjectRecords(projects: ProjectRecord[]) {
  const batch = getFirebaseAdminDb().batch();

  projects.forEach((project) => {
    const docRef = collection().doc(project.id);
    batch.set(docRef, {
      slug: project.slug,
      image: project.image,
      link: project.link,
      order: project.order,
      published: project.published,
      translations: project.translations,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
}
