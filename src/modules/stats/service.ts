import { DEFAULT_STATS } from './defaults';
import { getStatsRecord, saveStatsRecord } from './repository';
import { statsInputSchema } from './schema';

export async function getHomepageStats() {
  const stats = await getStatsRecord();
  return stats || DEFAULT_STATS;
}

export async function updateHomepageStats(input: unknown) {
  const parsed = statsInputSchema.parse(input);
  return saveStatsRecord(parsed);
}
