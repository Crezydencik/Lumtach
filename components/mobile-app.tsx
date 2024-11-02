'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MobileApp() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Mobile App Development</h2>
            <p className="text-gray-400 mb-8">
              We create stunning, high-performance mobile applications that deliver exceptional user experiences across all platforms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">iOS Development</h3>
                <p className="text-gray-400 text-sm">Native and cross-platform solutions</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Android Apps</h3>
                <p className="text-gray-400 text-sm">Cutting-edge Android development</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://source.unsplash.com/random/600x800?app=1"
                alt="Mobile App 1"
                width={300}
                height={600}
                className="rounded-lg shadow-xl"
              />
              <Image
                src="https://source.unsplash.com/random/600x800?mobile=1"
                alt="Mobile App 2"
                width={300}
                height={600}
                className="rounded-lg shadow-xl mt-12"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}