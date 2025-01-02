'use client';

import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section
      className="py-20 relative overflow-hidden rounded-lg w-[90%]"
      style={{
        background: 'linear-gradient(90deg, #A6EB53 0%, #7561FF 100%)',
        margin: '0 auto',
      }}
    >
      <div className="relative z-10 mx-auto px-6 flex flex-col lg:flex-row items-center justify-between h-auto lg:h-24">
        {/* Текстовый блок */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-gray-800 mb-6">{t('cta.description')}</p>
          <a href="#contact" className="button button--tertiary">{t('cta.button')}</a>
        </div>

        {/* Изображение или графика */}
        <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="/images/cta_IMG.png"
            alt={t('cta.imageAlt')}
            className="absolute right-0 h-auto lg:max-w-[150%] lg:-mt-[17REM]"
          />
        </div>
      </div>
      <div className="absolute inset-0 opacity-50">
        <img
          src="/images/background_block.png"
          alt={t('cta.backgroundAlt')}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
