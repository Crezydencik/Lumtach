import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionCookie,
} from '@/modules/auth/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const idToken = body?.idToken;

    if (!idToken) {
      return NextResponse.json({ error: 'Missing Firebase ID token.' }, { status: 400 });
    }

    const sessionCookie = await createAdminSessionCookie(idToken);
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionCookie,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sign in.' },
      { status: 401 }
    );
  }
}
