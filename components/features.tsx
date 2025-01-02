'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Code2, Smartphone, Paintbrush, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: Code2,
    key: 'feature1',
    glowColor: '#E43E5C',
  },
  {
    icon: Smartphone,
    key: 'feature2',
    glowColor: '#3B82F6',
  },
  {
    icon: Paintbrush,
    key: 'feature3',
    glowColor: '#22C55E',
  },
  {
    icon: Database,
    key: 'feature4',
    glowColor: '#FACC15',
  },
];

export default function Features() {
  const { t } = useTranslation();
  const blockHeight = 320;

  return (
    <section id='services' className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sectitle mb-4">{t('features.sectitle')}</div>
        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* Левая часть */}
          <div className="md:w-1/2">
            <h2 className="text-6xl font-extrabold mb-8 leading-tight tekstdecorat">
              {t('features.heading')}
            </h2>
            <p className="text-gray-400 mb-8">{t('features.description')}</p>
            <a href="#contact" className="button button--primary">{t('features.button')}</a>
          </div>

          {/* Правая часть */}
          <div className="relative w-full">
            {/* Слайдер только для мобильной версии */}
            <div className="block md:hidden">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <SwiperSlide key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-900 p-6 rounded-3xl relative overflow-hidden shadow-xl flex flex-col justify-between"
                        style={{ height: `${blockHeight}px` }}
                      >
                        <div
                          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
                          style={{
                            boxShadow: `0 0 11px 14px ${feature.glowColor}`,
                            opacity: 0.5,
                            top: '-100px',
                            right: '-106px',
                            zIndex: 0,
                            filter: 'blur(2px)',
                          }}
                        ></div>
                        <Icon className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-4 text-white">
                          {t(`features.${feature.key}.title`)}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {t(`features.${feature.key}.description`)}
                        </p>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Сетка для десктопной версии */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-3xl relative overflow-hidden shadow-xl flex flex-col justify-between"
                    style={{ height: `${blockHeight}px` }}
                  >
                    <div
                      className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
                      style={{
                        boxShadow: `0 0 11px 14px ${feature.glowColor}`,
                        opacity: 0.5,
                        top: '-100px',
                        right: '-106px',
                        zIndex: 0,
                        filter: 'blur(2px)',
                      }}
                    ></div>
                    <Icon className="w-12 h-12 mb-4 text-white group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
