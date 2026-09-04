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
import { Button } from '../ui/button';

export default function ProjectSlider() {
  const { t, i18n } = useTranslation();
  const { projects, isLoading, error } = useProjects(i18n.language);
  const homepageProjects = projects.slice(0, 3);
  const hasProjects = homepageProjects.length > 0;

  return (
    <section id='project' className="pb-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sectitle">{t('slider.sectitle')}</div>
        {hasProjects ? (
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
            loop={homepageProjects.length > 1}
          >
            {homepageProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectSlide project={project} buttonLabel={t('slider.button')} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex min-h-[280px] items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] px-6 text-center text-gray-400">
            {isLoading ? t('slider.loading') : error ? t('slider.error') : t('slider.empty')}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects">
              <Button variant="outline">
            {t('slider.moreProjects')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

type ProjectSlideProps = {
  project: ReturnType<typeof useProjects>['projects'][number];
  buttonLabel: string;
};

function ProjectSlide({ project, buttonLabel }: ProjectSlideProps) {
  const projectTitle = project.title?.trim() || project.slug || 'Project';

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-[500px] flex-col justify-center md:h-[500px]"
                  >
                    <h2 className="text-6xl font-bold mb-6 leading-tight">
                      {projectTitle}
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
                      <Button variant="outline">
                       {buttonLabel}
                      </Button>
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
                      alt={projectTitle}
                      width={350}
                      height={700}
                      className="rounded-lg shadow-xl"
                    />
                  </motion.div>
    </div>
  );
}
