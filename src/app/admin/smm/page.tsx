import { redirect } from 'next/navigation';
import SmmAgent from '@/components/admin/smm-agent';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function AdminSmmPage() {
  if (!(await isAdminPageAuthenticated())) {
    redirect('/login');
  }

  return <SmmAgent />;
}
