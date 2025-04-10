'use client';

import { motion } from 'framer-motion';
import { Code2, Lightbulb, Puzzle, Shield, Layers, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const reasons = [
  {
    icon: Lightbulb,
    key: 'reason1',
    color: 'bg-[#E94E77]',
  },
  {
    icon:Handshake,
    key: 'reason2',
    color: 'bg-[#6C63FF]',
  },
  {
    icon: Shield,
    key: 'reason3',
    color: 'bg-[#96E072]',
  },
  {
    icon: Puzzle,
    key: 'reason4',
    color: 'bg-[#FFD166]',
  },
];

export default function Reasons() {
  const { t } = useTranslation();

  return (
    <section id='advant' className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lime-400 mb-4 font-mono text-center">
          {t('reasons.sectitle')}
        </div>
        <h2 className="text-6xl font-bold mb-4 text-left md:text-center  tekstdecor">
          {t('reasons.heading')}
        </h2>
        <p className="text-gray-400 text-left md:text-center  mb-12">
          {t('reasons.subheading')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {reasons.slice(0, 3).map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${reason.color} p-8 rounded-[24px] relative group overflow-hidden`}
              >
                <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm">{t(`reasons.${reason.key}.description`)}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32">
          {reasons.slice(3, 4).map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${reason.color} p-8 rounded-[24px] relative group overflow-hidden`}
              >
                <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm">{t(`reasons.${reason.key}.description`)}</p>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 p-8 rounded-[24px] relative group overflow-hidden"
          >
            <div className="bg-black/20 p-4 rounded-full w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-400">
              {t('reasons.extra.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
