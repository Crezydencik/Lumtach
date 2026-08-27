import { LocalizedProjectView, ProjectLocale, ProjectRecord } from './types';

export function localizeProject(project: ProjectRecord, locale: string): LocalizedProjectView {
  const normalizedLocale = (locale.split('-')[0] || 'en') as ProjectLocale;
  const fallbackLocale: ProjectLocale = ['ru', 'en', 'lv'].includes(normalizedLocale) ? normalizedLocale : 'en';
  const translation = project.translations[fallbackLocale];

  return {
    id: project.id,
    slug: project.slug,
    image: project.image,
    link: project.link,
    order: project.order,
    published: project.published,
    locale: fallbackLocale,
    title: translation.title,
    description: translation.description,
    features: translation.features,
  };
}
