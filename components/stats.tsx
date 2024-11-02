'use client';

import { motion } from 'framer-motion';
import { Users, Code2, Building2, Trophy } from 'lucide-react';

const stats = [
  { icon: Users, value: '150+', label: 'Clients Worldwide' },
  { icon: Code2, value: '200+', label: 'Projects Completed' },
  { icon: Building2, value: '10+', label: 'Years Experience' },
  { icon: Trophy, value: '50+', label: 'Awards Won' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-gray-900 rounded-lg mb-4">
                <stat.icon className="w-8 h-8 text-lime-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}