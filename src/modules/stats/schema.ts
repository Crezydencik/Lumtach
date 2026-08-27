import { z } from 'zod';
import { STATS_KEYS, STATS_LOCALES } from './types';

const statsItemSchema = z.object({
  key: z.enum(STATS_KEYS),
  value: z.string().trim().min(1).max(20),
  labels: z.object(
    Object.fromEntries(
      STATS_LOCALES.map((locale) => [locale, z.string().trim().min(1).max(80)])
    ) as Record<(typeof STATS_LOCALES)[number], z.ZodString>
  ),
});

export const statsInputSchema = z.object({
  items: z.array(statsItemSchema).length(STATS_KEYS.length),
});
