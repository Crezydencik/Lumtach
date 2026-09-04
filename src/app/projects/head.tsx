import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export default function ProjectsHead() {
  const title = `Кейсы по веб- и мобильной разработке — ${SITE_NAME}`;
  const description = `Портфолио ${SITE_NAME}: сайты, цифровые продукты и UX/UI-решения для бизнеса в Латвии и Европе.`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}/projects`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE_URL}/projects`} />
      <meta property="og:image" content={`${SITE_URL}/images/projects-hero-cubes.png`} />
    </>
  );
}
