import { redirect } from 'next/navigation';
import MediaAdmin from '@/components/admin/media-admin';
import { isAdminPageAuthenticated } from '@/modules/auth/server';
import { listProjects } from '@/modules/projects/service';

export default async function AdminMediaPage() {
  if (!(await isAdminPageAuthenticated())) {
    redirect('/login');
  }

  const projects = await listProjects({ includeUnpublished: true });

  return <MediaAdmin projects={projects} />;
}
