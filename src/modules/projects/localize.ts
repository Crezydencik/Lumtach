import { LocalizedProjectView, ProjectLocale, ProjectRecord } from './types';

export function localizeProject(project: ProjectRecord, locale: string): LocalizedProjectView {
  const normalizedLocale = (locale.split('-')[0] || 'en') as ProjectLocale;
  const fallbackLocale: ProjectLocale = ['ru', 'en', 'lv'].includes(normalizedLocale) ? normalizedLocale : 'en';
  const translation = project.translations[fallbackLocale];
  const title = [
    translation?.title,
    project.translations.en?.title,
    project.translations.ru?.title,
    project.translations.lv?.title,
  ].find((value) => value?.trim())?.trim()
    || formatSlugAsTitle(project.slug)
    || extractNameFromDescription(translation?.description)
    || 'Project';

  return {
    id: project.id,
    slug: project.slug,
    image: project.image,
    link: project.link,
    order: project.order,
    published: project.published,
    locale: fallbackLocale,
    title,
    description: translation.description,
    features: translation.features,
  };
}

function formatSlugAsTitle(slug?: string) {
  return (slug || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractNameFromDescription(description?: string) {
  const match = description?.trim().match(/^(.+?)\s+(?:is|are|—|–|-)\s/i);
  return match?.[1]?.trim() || '';
}
