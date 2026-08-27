import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function getFirebaseConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin environment variables.');
  }

  return {
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
    storageBucket,
  };
}

export function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseConfig());
}

export function getFirebaseAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getFirebaseAdminStorage() {
  return getStorage(getFirebaseAdminApp());
}
