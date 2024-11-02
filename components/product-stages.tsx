'use client';

import { motion } from 'framer-motion';

const stages = [
  {
    number: '1',
    title: 'Research and Design',
    description: "This stage involves analyzing customer requirements, studying the market and competitive environment, defining project goals and tasks. It's where the overall product concept is developed, including user interface, visual design, application architecture, and its functional capabilities.",
    color: 'bg-[#E94E77]',
    width: 'w-full md:w-[400px]',
  },
  {
    number: '2',
    title: 'Development',
    description: 'The process of coding and project realization based on previous stages. Programming, integrating functions, testing individual modules.',
    color: 'bg-[#6C63FF]',
    width: 'w-full md:w-[300px]',
  },
  {
    number: '3',
    title: 'Testing',
    description: 'After product development, specialists test for errors and deficiencies to ensure it meets quality standards.',
    color: 'bg-[#96E072]',
    width: 'w-full md:w-[300px]',
  },
  {
    number: '4',
    title: 'Deployment and Launch',
    description: 'The stage where the finished product is released and implemented for end-user use.',
    color: 'bg-[#FFD166]',
    width: 'w-full md:w-[300px]',
  },
];

export default function ProductStages() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lime-400 mb-4 font-mono">HOW IT WORKS</div>
        <h2 className="text-4xl font-bold mb-4">
          PRODUCT<br />
          DEVELOPMENT <span className="text-gray-500">STAGES</span>
        </h2>
        <p className="text-gray-400 mb-12">From Research to Implementation: Steps Defining Project Success</p>
        
        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stage.color} ${stage.width} p-8 rounded-[24px] relative`}
            >
              <div className="text-6xl font-bold mb-4">{stage.number}</div>
              <h3 className="text-xl font-bold mb-4">{stage.title}</h3>
              <p className="text-sm opacity-90">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}