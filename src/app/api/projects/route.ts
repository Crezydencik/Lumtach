import { NextResponse } from 'next/server';
import { listProjects } from '@/modules/projects/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json(
      { projects },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load projects.' }, { status: 500 });
  }
}
