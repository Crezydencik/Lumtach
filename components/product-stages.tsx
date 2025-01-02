'use client';

import { useTranslation } from 'react-i18next';

const steps = [
  {
    number: '1',
    key: 'step1',
    bgColor: 'bg-[#E43E5C]',
  },
  {
    number: '2',
    key: 'step2',
    bgColor: 'bg-[#7561FF]',
  },
  {
    number: '3',
    key: 'step3',
    bgColor: 'bg-[#A6EB53]',
  },
  {
    number: '4',
    key: 'step4',
    bgColor: 'bg-[#F6DB4F]',
  },
];

export default function ProductDevelopmentStages() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sectitle mb-4 text-center">{t('stages.sectitle')}</div>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-2 tekstdecor">{t('stages.heading')}</h2>
          <p className="text-lg text-gray-400">{t('stages.description')}</p>
        </div>
        <div className="flex flex-wrap gap-6">
          {/* Два основных блока в одном ряду */}
          {steps.slice(0, 2).map((step, index) => (
            <div
              key={index}
              className={`flex-1 p-6 rounded-lg shadow-lg ${step.bgColor} text-black`}
              style={{ minWidth: '280px', borderRadius: '16px' }}
            >
              <div className="text-5xl font-extrabold mb-4">{step.number}</div>
              <h3 className="text-2xl font-semibold mb-4">{t(`stages.${step.key}.title`)}</h3>
              <p className="text-base">{t(`stages.${step.key}.description`)}</p>
            </div>
          ))}
          {/* Последний блок с двумя подблоками */}
          <div className="flex flex-col flex-1 gap-6 min-w-[280px]">
            {steps.slice(2).map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${step.bgColor} text-black flex-1`}
                style={{ borderRadius: '16px' }}
              >
                <div className="text-5xl font-extrabold mb-4">{step.number}</div>
                <h3 className="text-2xl font-semibold mb-4">{t(`stages.${step.key}.title`)}</h3>
                <p className="text-base">{t(`stages.${step.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
