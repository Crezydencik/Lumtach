import { NextResponse } from 'next/server';
import { getHomepageStats } from '@/modules/stats/service';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const stats = await getHomepageStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load stats.' }, { status: 500 });
  }
}
