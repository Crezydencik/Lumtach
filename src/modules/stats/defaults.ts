import { StatsRecord } from './types';

export const DEFAULT_STATS: StatsRecord = {
  id: 'homepage',
  items: [
    {
      key: 'projects',
      value: '10',
      labels: {
        ru: 'проектов',
        en: 'projects',
        lv: 'projekti',
      },
    },
    {
      key: 'clients',
      value: '20',
      labels: {
        ru: 'клиентов',
        en: 'clients',
        lv: 'klienti',
      },
    },
    {
      key: 'awards',
      value: '4',
      labels: {
        ru: 'награды',
        en: 'awards',
        lv: 'balvas',
      },
    },
    {
      key: 'employees',
      value: '5',
      labels: {
        ru: 'сотрудников',
        en: 'employees',
        lv: 'darbinieki',
      },
    },
  ],
};
