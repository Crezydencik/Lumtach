'use client';

import '../app/styles/button.scss';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between pt-10 px-6 lg:px-16 bg-black text-white">
      {/* Текстовая часть */}
      <div className="max-w-lg lg:max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          EMPOWERING<br />
          BUSINESS THROUGH<br />
          TECHNOLOGY
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          We aim to simplify and strengthen your business through advanced technological solutions.
        </p>
        <Button className="bg-lime-400 text-black hover:bg-lime-500 px-8 py-4 rounded-md">
          Discuss the project
        </Button>
      </div>

      {/* Визуальная часть */}
      <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0 -ml-26">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full flex justify-center items-center"
        >
          <img
            src="/images/prevwierimage.png"
            className="w-full max-w-[500px] lg:max-w-[1200px] object-contain -ml-26"
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
