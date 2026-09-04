const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export const SITE_URL = configuredSiteUrl || 'https://lumtach.com';
export const SITE_NAME = 'Lumtach';
export const SITE_DESCRIPTION =
  'Lumtach — IT-компания в Риге: разработка сайтов, интернет-магазинов, веб-сервисов и мобильных приложений для бизнеса в Латвии и Европе. UX/UI-дизайн, CRM и автоматизация бизнес-процессов.';
