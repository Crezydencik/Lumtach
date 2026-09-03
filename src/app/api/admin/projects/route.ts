import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/modules/auth/server';
import { createProject, listProjects, reorderProjects } from '@/modules/projects/service';
import { getProjectErrorMessage } from '@/modules/projects/error-message';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const project = await createProject(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: getProjectErrorMessage(error, 'Не удалось создать проект.') },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const projects = await listProjects({ includeUnpublished: true });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load admin projects.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const projects = await reorderProjects(body.projectIds);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Не удалось сохранить порядок проектов.' },
      { status: 400 }
    );
  }
}
