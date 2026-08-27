import { redirect } from 'next/navigation';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function AdminLoginPage() {
  if (await isAdminPageAuthenticated()) {
    redirect('/admin/projects');
  }

  redirect('/login');
}
