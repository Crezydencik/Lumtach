'use client';
import { useTranslation } from 'react-i18next';
import '../app/styles/button.scss'
import { Button } from '@/components/ui/button';

export default function AboutCompany() {
  const { t } = useTranslation();

  return (
    <section id='about' className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Основной контейнер */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Левая часть */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="sectitle mb-3">{t('about.sectitle')}</div>
            <h2 className="text-6xl font-mono leading-tight mb-8 tekstdecor">
              {t('about.heading')}
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {t('about.description')}
            </p>
            <div className="flex justify-start">
              <a href="#contact" className="button button--secondary">
                {t('about.button')}
              </a>
            </div>
          </div>

          {/* Правая часть (Объединенная сетка чисел) */}
          <div className="grid grid-cols-2 gap-0 md:w-[45%]">
            {[
              { number: '10', text: t('about.stats.projects') },
              { number: '20', text: t('about.stats.clients') },
              { number: '4', text: t('about.stats.awards') },
              { number: '5', text: t('about.stats.employees') },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 flex flex-col items-center justify-center text-center h-[150px] w-full border border-black tekstdecor"
              >
                <div className="text-6xl font-mono font-bold text-white mb-2">
                  {item.number}
                </div>
                <div className="text-gray-500 text-sm uppercase">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}