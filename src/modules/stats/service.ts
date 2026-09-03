import { getStatsRecord, saveStatsRecord } from './repository';
import { statsInputSchema } from './schema';

export async function getHomepageStats() {
  return getStatsRecord();
}

export async function updateHomepageStats(input: unknown) {
  const parsed = statsInputSchema.parse(input);
  return saveStatsRecord(parsed);
}
