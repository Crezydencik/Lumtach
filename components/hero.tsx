'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
      >
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            EMPOWERING<br />
            BUSINESS THROUGH<br />
            TECHNOLOGY
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl">
            Transform your business with our cutting-edge solutions and expert development team
          </p>
          <Button className="custom-button bg-lime-400 text-black hover:bg-lime-500 text-lg px-8 py-6">
            Get Started
          </Button>
        </div>
      </motion.div>
      
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-96 h-96 rounded-full bg-gradient-to-r from-lime-400 to-blue-500 blur-3xl opacity-20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}