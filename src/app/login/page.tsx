import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/login-form';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function LoginPage() {
  if (await isAdminPageAuthenticated()) {
    redirect('/admin/projects');
  }

  return <AdminLoginForm />;
}
