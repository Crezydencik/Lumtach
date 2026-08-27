'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/use-projects';

export default function ProjectSlider() {
  const { t, i18n } = useTranslation();
  const { projects } = useProjects(i18n.language);

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
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col h-[500px] justify-center"
                >
                  <h2 className="text-6xl font-bold mb-6 leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 mb-8 text-lg">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-gray-400 mb-8">
                    {project.features.map((feature, idx) => (
                      <ul className="list-disc list-inside space-y-2" key={idx}>
                        <li>{feature}</li>
                      </ul>
                    ))}
                  </div>

                  <Link href={project.link} passHref>
                    <button className="button button--secondary w-fit">
                      {t('slider.button')}
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center h-[500px]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={350}
                    height={700}
                    className="rounded-lg shadow-xl"
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-[#A6EB53]/50 hover:text-[#A6EB53]"
          >
            {t('slider.moreProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
}
