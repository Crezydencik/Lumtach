export const STATS_LOCALES = ['ru', 'en', 'lv'] as const;
export const STATS_KEYS = ['projects', 'clients', 'awards', 'employees'] as const;

export type StatsLocale = (typeof STATS_LOCALES)[number];
export type StatsKey = (typeof STATS_KEYS)[number];

export type StatsItem = {
  key: StatsKey;
  value: string;
  labels: Record<StatsLocale, string>;
};

export type StatsRecord = {
  id: string;
  items: StatsItem[];
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type StatsInput = {
  items: StatsItem[];
};
