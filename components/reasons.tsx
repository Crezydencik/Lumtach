'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const reasons = [
  {
    icon: Code2,
    description: 'We aim to simplify and strengthen your business through advanced technological solutions.',
    color: 'bg-[#E94E77]',
  },
  {
    icon: Code2,
    description: 'We aim to simplify and strengthen your business through advanced technological solutions.',
    color: 'bg-[#6C63FF]',
  },
  {
    icon: Code2,
    description: 'We aim to simplify and strengthen your business through advanced technological solutions.',
    color: 'bg-[#96E072]',
  },
  {
    icon: Code2,
    description: 'We aim to simplify and strengthen your business through advanced technological solutions.',
    color: 'bg-[#FFD166]',
  },
];

export default function Reasons() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lime-400 mb-4 font-mono text-center">ADVANTAGES</div>
        <h2 className="text-6xl font-bold mb-4 text-center">
          REASONS TO <span className="text-gray-500">WORK</span><br />
          WITH <span className="text-gray-500">LUMTACH</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">
          We aim to simplify and strengthen your business through advanced<br />
          technological solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {reasons.slice(0, 3).map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${reason.color} p-8 rounded-[24px] relative group overflow-hidden`}
            >
              <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
                <reason.icon className="w-6 h-6" />
              </div>
              <p className="text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32">
          {reasons.slice(3, 4).map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${reason.color} p-8 rounded-[24px] relative group overflow-hidden`}
            >
              <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
                <reason.icon className="w-6 h-6" />
              </div>
              <p className="text-sm">{reason.description}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 p-8 rounded-[24px] relative group overflow-hidden"
          >
            <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-400">
              We aim to simplify and strengthen your business through advanced technological solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}