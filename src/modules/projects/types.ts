export const PROJECT_LOCALES = ['ru', 'en', 'lv'] as const;

export type ProjectLocale = (typeof PROJECT_LOCALES)[number];

export type ProjectTranslation = {
  title: string;
  description: string;
  features: string[];
};

export type ProjectTranslations = Record<ProjectLocale, ProjectTranslation>;

export type ProjectRecord = {
  id: string;
  slug: string;
  image: string;
  link: string;
  order: number;
  published: boolean;
  translations: ProjectTranslations;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ProjectInput = Omit<ProjectRecord, 'id' | 'createdAt' | 'updatedAt'>;

export type LocalizedProjectView = {
  id: string;
  slug: string;
  image: string;
  link: string;
  order: number;
  published: boolean;
  locale: ProjectLocale;
  title: string;
  description: string;
  features: string[];
};
