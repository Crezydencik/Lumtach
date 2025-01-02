'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function ProjectSlider() {
  const { t } = useTranslation();

  const slides = [
    {
      title: t('slider.slide1.title'),
      description: t('slider.slide1.description'),
      features: [t('slider.slide1.feature1'), t('slider.slide1.feature2')],
      image: '/images/inbaltic.png',
      link: 'https://inbaltic.eu/',
    },
    {
      title: t('slider.slide2.title'),
      description: t('slider.slide2.description'),
      features: [t('slider.slide2.feature1'), t('slider.slide2.feature2')],
      image: '/images/mockup2.png',
      link: '/projects/alpha',
    },
  ];

  return (
    <section id='project' className="pb-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sectitle">{t('slider.sectitle')}</div>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}" style="background-color: #A6EB53; width: 12px; height: 12px; border-radius: 50%; margin: 0 5px;"></span>`,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full"
          spaceBetween={50}
          slidesPerView={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Левая часть */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col h-[500px] justify-center"
                >
                  <h2 className="text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-400 mb-8 text-lg">{slide.description}</p>

                  {/* Список услуг */}
                  <div className="grid grid-cols-2 gap-4 text-gray-400 mb-8">
                    {slide.features.map((feature, idx) => (
                      <ul className="list-disc list-inside space-y-2" key={idx}>
                        <li>{feature}</li>
                      </ul>
                    ))}
                  </div>

                  {/* Кнопка */}
                  <Link href={slide.link} passHref>
                    <button className="button button--secondary w-fit">
                      {t('slider.button')}
                    </button>
                  </Link>
                </motion.div>

                {/* Правая часть */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center h-[500px]"
                >
                  {/* Изображения */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={350}
                    height={700}
                    className="rounded-lg shadow-xl"
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
