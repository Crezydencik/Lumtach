'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Partn() {
  const { t } = useTranslation();
  const partners = [
    {
      name: 'RODIEN LATVIJA',
      description: t('part.first.discr'),
      logo: '/partners/rodlen.png',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="advant" className="bg-black pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sectitle mb-4 text-center">
          {t('part.title')}
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative group w-64 h-64 flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={320}
                height={160}
                className="w-80 h-40 object-contain transition-opacity duration-300"
              />

              <div
                className={`absolute inset-0 bg-black/80 text-white p-6 flex flex-col items-start justify-end opacity-0 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : ''
                }`}
              >
                <h3 className="text-lime-400 text-lg font-bold">{partner.name}</h3>
                <p className="text-sm text-gray-300 mt-2">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
