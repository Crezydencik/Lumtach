import { redirect } from 'next/navigation';
import ProjectsAdmin from '@/components/admin/projects-admin';
import { isAdminPageAuthenticated } from '@/modules/auth/server';

export default async function AdminProjectsPage() {
  if (!(await isAdminPageAuthenticated())) {
    redirect('/login');
  }

  return <ProjectsAdmin />;
}
