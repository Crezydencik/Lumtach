import { ProjectRecord } from './types';

export const DEFAULT_PROJECTS: ProjectRecord[] = [
  {
    id: 'in-baltic-eu',
    slug: 'in-baltic-eu',
    image: '/images/inbaltic.png',
    link: 'https://inbaltic.eu/',
    order: 1,
    published: true,
    translations: {
      ru: {
        title: 'in Baltic.eu',
        description:
          'Мы специализируемся на создании пользовательского программного обеспечения, адаптированного к потребностям бизнеса. Наша команда использует Agile-подход для быстрой и безопасной разработки, обеспечивающей максимальную ценность для вашего бизнеса.',
        features: ['Веб-разработка', 'UX/UI дизайн'],
      },
      en: {
        title: 'in Baltic.eu',
        description:
          "We specialize in creating custom software tailored to businesses' needs. Our team of experts uses an Agile approach for fast and secure development that delivers maximum value to your business.",
        features: ['Web Development', 'UX/UI design'],
      },
      lv: {
        title: 'in Baltic.eu',
        description:
          'Mēs specializējamies pielāgotu programmatūras risinājumu izstrādē uzņēmumu vajadzībām. Mūsu ekspertu komanda izmanto Agile pieeju, lai nodrošinātu ātru un drošu izstrādi, kas sniedz maksimālu vērtību jūsu biznesam.',
        features: ['Tīmekļa izstrāde', 'UX/UI dizains'],
      },
    },
  },
  {
    id: 'house-of-hope',
    slug: 'house-of-hope',
    image: '/images/houseofhope_mukcup.png',
    link: 'https://houseofhopeinfo.lv/',
    order: 2,
    published: true,
    translations: {
      ru: {
        title: 'HouseOfHope',
        description:
          'Дом Надежды — это платформа для семей, детей и молодежи, цель которой — помочь им разорвать круг бедности, социальной дискриминации и нехватки образования.',
        features: ['Веб-разработка', 'UX/UI дизайн'],
      },
      en: {
        title: 'HouseOfHope',
        description:
          'House of Hope is a platform for families, kids and youth, whose goal is to help them break the cycle of poverty, social discrimination, and lack of education.',
        features: ['Web Development', 'UX/UI design'],
      },
      lv: {
        title: 'HouseOfHope',
        description:
          'Cerību nams ir platforma ģimenēm, bērniem un jauniešiem, kuras mērķis ir palīdzēt viņiem pārraut nabadzības, sociālās diskriminācijas un izglītības trūkuma ciklu.',
        features: ['Tīmekļa izstrāde', 'UX/UI dizains'],
      },
    },
  },
];
