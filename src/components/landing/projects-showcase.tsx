'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/use-projects';
import { Button } from '../ui/button';
import Link from 'next/link';

type ProjectsShowcaseProps = {
  compact?: boolean;
};

export default function ProjectsShowcase({ compact = false }: ProjectsShowcaseProps) {
  const { t, i18n } = useTranslation();
  const { projects, isLoading } = useProjects(i18n.language);

  return (
    <section id="project" className={compact ? 'bg-black pb-16' : 'bg-black px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8'}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 border-b border-white/10 pb-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="sectitle">{t('slider.sectitle')}</div>
            <h1 className="tekstdecor  mt-5">
              {t('projectsPage.title')}
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              {t('projectsPage.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="relative mx-auto w-full max-w-[42rem] lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_45%_72%,rgba(166,235,83,0.18),transparent_30%)] blur-3xl" />
            <Image
              src="/images/projects-hero-cubes.png"
              alt=""
              width={1024}
              height={1280}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="relative h-auto w-full object-contain"
            />
          </motion.div>
        </div>

        <div className="pt-14 md:pt-20">

          {isLoading ? (
            <div className="space-y-14">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="h-[30rem] animate-pulse border-b border-white/10 bg-white/[0.03]" key={index} />
              ))}
            </div>
          ) : projects.length ? (
            <div className="space-y-16 md:space-y-24">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
                  className="border-b border-white/10 pb-16 last:border-0 last:pb-0 md:pb-24"
                >
                  <ProjectCase project={project} reverse={Boolean(index % 2)} buttonLabel={t('slider.button')} />
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="py-10 text-sm text-white/50">{t('slider.empty')}</p>
          )}
        </div>
      </div>
    </section>
  );
}

type ProjectCaseProps = {
  project: ReturnType<typeof useProjects>['projects'][number];
  reverse: boolean;
  buttonLabel: string;
};

function ProjectCase({ project, reverse, buttonLabel }: ProjectCaseProps) {
  const { t } = useTranslation();
  const projectTitle = project.title?.trim() || project.slug || 'Project';

  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="max-w-xl">
                      <div className="mb-5 text-[11px] font-mono font-medium uppercase tracking-[0.26em] text-[#A6EB53]">
                        {t('projectsPage.caseStudy')}
                      </div>
                      <h3 className="text-6xl font-bold mb-6 leading-tight">
                        {projectTitle}
                      </h3>
                      <p className="text-gray-400 mb-8 text-lg">
                        {project.description}
                      </p>
                      {project.features.length ? (
                         <div className="grid grid-cols-2 gap-4 text-gray-400 mb-8">
                      {project.features.map((feature, idx) => (
                        <ul className="list-disc list-inside space-y-2" key={idx}>
                          <li>{feature}</li>
                        </ul>
                      ))}
                    </div>
                      ) : null}
                        <Link href={project.link} passHref>
                          <Button variant="outline">
                            {buttonLabel}
                          </Button>
                        </Link>
                    </div>
                    <div className="relative mx-auto w-full max-w-xl">
                      <Image
                        src={project.image}
                        alt={projectTitle}
                        width={640}
                        height={500}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-auto w-full object-contain"
                      />
                    </div>
    </div>
  );
}
