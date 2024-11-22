'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MobileApp() {
  return (
    <section className="pb-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Левая часть */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="text-[#96E072] font-mono text-sm tracking-wider mb-4">OUR PROJECT</div>
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">in</span> Baltic.eu
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              We specialize in creating custom software tailored to businesses' needs. Our team of experts uses an Agile
              approach for fast and secure development that delivers maximum value to your business.
            </p>

            {/* Список услуг */}
            <div className="grid grid-cols-2 gap-4 text-gray-400 mb-8 pb-10">
              <ul className="list-disc list-inside space-y-2">
                <li>Web Development</li>
              </ul>
              <ul className="list-disc list-inside space-y-2">
                <li>UX/UI design</li>
              </ul>
            </div>

            {/* Кнопка */}
            <button className="button button--secondary  w-fit">
              Go to the project
            </button>
          </motion.div>

          {/* Правая часть */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Изображения */}
            <Image
              src="/images/mockup2.png"
              alt="Mobile App 2"
              width={350}
              height={700}
              className="rounded-lg shadow-xl mt-[-88px]"
            />
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
