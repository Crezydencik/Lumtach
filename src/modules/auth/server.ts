import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseAdminApp } from '@/lib/firebase-admin';

export const ADMIN_SESSION_COOKIE = 'lumtach_admin_session';
const ALLOWED_ADMIN_EMAILS = ['admin@lumtach.com'];

function isAllowedAdminUser(decoded: { email?: string | null; email_verified?: boolean | null }) {
  if (!decoded.email) {
    return false;
  }

  return ALLOWED_ADMIN_EMAILS.includes(decoded.email.toLowerCase());
}

export async function createAdminSessionCookie(idToken: string) {
  const auth = getAuth(getFirebaseAdminApp());
  const decoded = await auth.verifyIdToken(idToken);

  if (!isAllowedAdminUser(decoded)) {
    throw new Error('This Firebase account is not allowed to access admin.');
  }

  return auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });
}

export async function isValidAdminSessionValue(value?: string | null) {
  if (!value) {
    return false;
  }

  try {
    const decoded = await getAuth(getFirebaseAdminApp()).verifySessionCookie(value, true);
    return isAllowedAdminUser(decoded);
  } catch {
    return false;
  }
}

export async function isAdminRequestAuthenticated(request: NextRequest) {
  return isValidAdminSessionValue(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function isAdminPageAuthenticated() {
  return isValidAdminSessionValue(cookies().get(ADMIN_SESSION_COOKIE)?.value);
}
