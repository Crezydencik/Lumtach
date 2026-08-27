'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirebaseClientAuth } from '@/lib/firebase-client';

function getLoginErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Неверный формат email.';
      case 'auth/missing-password':
        return 'Введите пароль.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Неверный email или пароль.';
      case 'auth/too-many-requests':
        return 'Слишком много попыток входа. Попробуйте чуть позже.';
      case 'auth/network-request-failed':
        return 'Ошибка сети при входе в Firebase.';
      default:
        return error.message || 'Ошибка входа через Firebase.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ошибка входа.';
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!email.trim()) {
        throw new Error('Введите email.');
      }

      if (!password) {
        throw new Error('Введите пароль.');
      }

      const auth = getFirebaseClientAuth();
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        await signOut(auth).catch(() => null);
        throw new Error(payload?.error || 'Login failed.');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (requestError) {
      console.error('Admin login failed:', requestError);
      setError(getLoginErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(166,235,83,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(106,80,255,0.16),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-[#111116]/95 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur md:p-8">
        <div className="mb-8">
          <div className="sectitle">ADMIN</div>
          <h1 className="mt-4 text-3xl font-semibold uppercase leading-tight text-white md:text-4xl">
            Вход в админку
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Войдите через Firebase Auth по email и паролю, чтобы управлять проектами на трёх языках.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-sm text-white/70">
            <label htmlFor="admin-email" className="block">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2 text-sm text-white/70">
            <label htmlFor="admin-password" className="block">
              Пароль
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#A6EB53] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </section>
  );
}
