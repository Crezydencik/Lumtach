import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export default function Head() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/lumtech-logo.svg`,
    image: `${SITE_URL}/images/prevwierimage.png`,
    description: SITE_DESCRIPTION,
    email: 'lumtach@gmail.com',
    telephone: '+37129992017',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riga',
      addressCountry: 'LV',
    },
    areaServed: ['Latvia', 'Europe'],
    availableLanguage: ['ru', 'lv', 'en'],
    sameAs: [
      'https://www.facebook.com/lumtach',
      'https://www.instagram.com/lumtach/',
    ],
    knowsAbout: [
      'Custom software development',
      'Web development',
      'Разработка сайтов в Риге',
      'Веб-разработка в Латвии',
      'Website development in Riga',
      'E-commerce development',
      'Создание интернет-магазинов',
      'Mājaslapu izstrāde Rīgā',
      'Interneta veikalu izstrāde',
      'Mobile application development',
      'Разработка мобильных приложений',
      'Mobilo lietotņu izstrāde',
      'UX/UI design',
      'UX/UI дизайн в Риге',
      'UX/UI dizains Rīgā',
      'Data analytics',
      'CRM development',
      'Разработка CRM для бизнеса',
      'CRM sistēmu izstrāde',
      'Business process automation',
      'Автоматизация бизнес-процессов',
      'Biznesa procesu automatizācija',
    ],
  };

  return (
    <>
      <title>{`${SITE_NAME} — разработка сайтов и мобильных приложений в Риге`}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta name="keywords" content="разработка сайтов Рига, заказать сайт в Риге, веб-разработка Латвия, создание интернет-магазина, разработка веб-сервисов, мобильные приложения на заказ, разработка приложений Латвия, UX/UI дизайн Рига, разработка ПО, CRM для бизнеса, автоматизация бизнес-процессов, IT-компания Рига, mājaslapu izstrāde Rīgā, mājaslapu izstrāde Latvijā, pasūtīt mājaslapu, interneta veikalu izstrāde, tīmekļa izstrāde, mobilo lietotņu izstrāde, UX/UI dizains Rīgā, programmatūras izstrāde, CRM sistēmu izstrāde, biznesa procesu automatizācija" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content="Lumtach — разработка сайтов и мобильных приложений в Риге" />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={`${SITE_URL}/images/prevwierimage.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lumtach — IT-решения для бизнеса" />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <meta name="twitter:image" content={`${SITE_URL}/images/prevwierimage.png`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
