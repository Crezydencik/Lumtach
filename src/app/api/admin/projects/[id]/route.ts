import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/modules/auth/server';
import { deleteProject, updateProject } from '@/modules/projects/service';

export const runtime = 'nodejs';

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const project = await updateProject(context.params.id, body);
    return NextResponse.json({ project });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update project.' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    if (!(await isAdminRequestAuthenticated(_request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    await deleteProject(context.params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
