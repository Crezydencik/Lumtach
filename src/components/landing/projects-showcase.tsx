'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/use-projects';

type ProjectsShowcaseProps = {
  compact?: boolean;
};

export default function ProjectsShowcase({ compact = false }: ProjectsShowcaseProps) {
  const { t, i18n } = useTranslation();
  const { projects } = useProjects(i18n.language);

  return (
    <section id="project" className={compact ? 'bg-black pb-16' : 'bg-black px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8'}>
      <div className="mx-auto max-w-7xl">
        <div className={compact ? 'mb-10' : 'mb-16 flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between'}>
          <div>
            <div className="sectitle">{t('slider.sectitle')}</div>
            {!compact ? (
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold uppercase leading-tight text-white md:text-6xl">
                {t('projectsPage.title')}
              </h1>
            ) : null}
          </div>
          {!compact ? (
            <p className="max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              {t('projectsPage.description')}
            </p>
          ) : null}
        </div>

        <div className="space-y-10 md:space-y-14">
          {projects.map((project, index) => {
            const isReverse = index % 2 === 1;

            return (
              <motion.section
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="border-b border-white/8 pb-12 last:border-b-0"
              >
                <div className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 ${isReverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isReverse ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-[500px] flex-col justify-center"
                  >
                    <div className="mb-5 inline-flex text-[12px] font-mono uppercase tracking-[0.24em] text-[#A6EB53]">
                      {t('projectsPage.caseStudy')}
                    </div>
                    <h2 className="mb-6 max-w-2xl text-5xl font-bold leading-tight text-white md:text-6xl">
                      {project.title}
                    </h2>
                    <p className="mb-8 max-w-2xl text-lg leading-[1.7] text-gray-400">
                      {project.description}
                    </p>

                    <div className="mb-8 grid grid-cols-1 gap-4 text-gray-400 sm:grid-cols-2">
                      {project.features.map((feature, featureIndex) => (
                        <ul className="list-disc list-inside space-y-2" key={`${project.id}-${featureIndex}`}>
                          <li>{feature}</li>
                        </ul>
                      ))}
                    </div>

                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button--secondary w-fit"
                    >
                      {t('slider.button')}
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isReverse ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-[500px] items-center justify-center"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={520}
                      height={820}
                      className="rounded-lg shadow-xl"
                    />
                  </motion.div>
                </div>
              </motion.section>
            );
          })}
        </div>

      </div>
    </section>
  );
}
