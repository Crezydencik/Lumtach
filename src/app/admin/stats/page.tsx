import { redirect } from 'next/navigation';
import StatsAdmin from '@/components/admin/stats-admin';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function AdminStatsPage() {
  if (!(await isAdminPageAuthenticated())) {
    redirect('/login');
  }

  return <StatsAdmin />;
}
