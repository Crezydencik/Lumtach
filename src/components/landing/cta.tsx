'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
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
      <div className="relative z-10 mx-auto flex h-auto flex-col items-center justify-between px-6 lg:h-24 lg:flex-row">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-gray-800 mb-6">{t('cta.description')}</p>
          <Button asChild variant="secondary" size="lg" className="px-8 py-4">
            <a href="#contact">{t('cta.button')}</a>
          </Button>
        </div>

        <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0">
          <Image
            src="/images/cta_IMG.png"
            alt={t('cta.imageAlt')}
            width={960}
            height={640}
            className="absolute right-0 h-auto lg:max-w-[150%] lg:-mt-[17REM]"
          />
        </div>
      </div>
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/images/background_block.png"
          alt={t('cta.backgroundAlt')}
          fill
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
