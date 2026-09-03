import { NextResponse } from 'next/server';
import { getHomepageStats } from '@/modules/stats/service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await getHomepageStats();
    return NextResponse.json(
      { stats },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load stats.' }, { status: 500 });
  }
}
