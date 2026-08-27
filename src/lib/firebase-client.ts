import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function getFirebaseClientConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!apiKey || !authDomain || !projectId) {
    throw new Error('Missing Firebase client environment variables.');
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
  };
}

export function getFirebaseClientApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseClientConfig());
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}
