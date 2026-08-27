import { NextResponse } from 'next/server';
import { listProjects } from '@/modules/projects/service';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load projects.' }, { status: 500 });
  }
}
