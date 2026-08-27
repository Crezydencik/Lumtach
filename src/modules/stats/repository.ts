import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { StatsInput, StatsRecord } from './types';

const COLLECTION_NAME = 'settings';
const DOCUMENT_ID = 'homepageStats';

function normalizeTimestamp(value: unknown) {
  if (!value) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  return null;
}

function docRef() {
  return getFirebaseAdminDb().collection(COLLECTION_NAME).doc(DOCUMENT_ID);
}

function mapStatsRecord(data: FirebaseFirestore.DocumentData): StatsRecord {
  return {
    id: DOCUMENT_ID,
    items: data.items || [],
    createdAt: normalizeTimestamp(data.createdAt),
    updatedAt: normalizeTimestamp(data.updatedAt),
  };
}

export async function getStatsRecord() {
  const snapshot = await docRef().get();

  if (!snapshot.exists) {
    return null;
  }

  return mapStatsRecord(snapshot.data() || {});
}

export async function saveStatsRecord(input: StatsInput) {
  await docRef().set(
    {
      ...input,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  const snapshot = await docRef().get();
  return mapStatsRecord(snapshot.data() || input);
}
