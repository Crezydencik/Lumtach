'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-between px-6 pt-20 text-white lg:flex-row lg:px-16">
      <div className="max-w-2lg lg:max-w-3xl">
        <h1 className="tekstdecor  mt-10">
          {t('hero.title')}
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          {t('hero.description')}
        </p>
        <a href="#contact" className="bg-lime-400 text-black hover:bg-lime-500 px-8 py-4 rounded-md">
          {t('hero.button')}
        </a>
      </div>

      <div className="relative mt-10 w-full lg:mt-0 lg:w-1/2 lg:-ml-26">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full flex justify-center items-center"
        >
          <Image
            src="/images/prevwierimage.png"
            alt={t('hero.title')}
            width={1200}
            height={900}
            priority
            className="w-full max-w-[500px] object-contain lg:max-w-[1200px] lg:-ml-26"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: 'linear',
            }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-lime-400 to-blue-500 blur-3xl opacity-20 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
