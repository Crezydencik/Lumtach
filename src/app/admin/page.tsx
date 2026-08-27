import { redirect } from 'next/navigation';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function AdminIndexPage() {
  if (await isAdminPageAuthenticated()) {
    redirect('/admin/projects');
  }

  redirect('/login');
}
