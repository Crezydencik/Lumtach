import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/modules/auth/server';
import { getHomepageStats, updateHomepageStats } from '@/modules/stats/service';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const stats = await getHomepageStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load stats.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const stats = await updateHomepageStats(body);
    return NextResponse.json({ stats });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update stats.' },
      { status: 400 }
    );
  }
}
