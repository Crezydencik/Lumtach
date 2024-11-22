'use client';

import { motion } from 'framer-motion';
const steps = [
  {
    number: '1',
    title: 'Research and Design',
    description:
      'This stage involves analyzing customer requirements, studying the market and competitive environment, defining project goals and tasks. It\'s where the overall product concept is developed, including user interface, visual design, application architecture, and its functional capabilities.',
    bgColor: 'bg-[#E43E5C]',
  },
  {
    number: '2',
    title: 'Development',
    description:
      'The process of coding and project realization based on previous stages. Programming, integrating functions, testing individual modules.',
    bgColor: 'bg-[#7561FF]',
  },
  {
    number: '3',
    title: 'Testing',
    description:
      'After product development, specialists test for errors and deficiencies to ensure it meets quality standards.',
    bgColor: 'bg-[#A6EB53]',
  },
  {
    number: '4',
    title: 'Deployment and Launch',
    description:
      'The stage where the finished product is released and implemented for end-user use.',
    bgColor: 'bg-[#F6DB4F]',
  },
];

export default function ProductDevelopmentStages() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-lime-400 mb-4 font-mono text-center">HOW IT WORKS</div>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-2">PRODUCT DEVELOPMENT STAGES</h2>
          <p className="text-lg text-gray-400">
            From Research to Implementation: Steps Defining Project Success
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {/* Два основных блока в одном ряду */}
          {steps.slice(0, 2).map((step, index) => (
            <div
              key={index}
              className={`flex-1 p-6 rounded-lg shadow-lg ${step.bgColor} text-black`}
              style={{ minWidth: '280px', borderRadius: '16px' }}
            >
              <div className="text-5xl font-extrabold mb-4">{step.number}</div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-base">{step.description}</p>
            </div>
          ))}
          {/* Последний блок с двумя подблоками */}
          <div className="flex flex-col flex-1 gap-6 min-w-[280px]">
            <div
              className={`p-6 rounded-lg shadow-lg ${steps[2].bgColor} text-black flex-1`}
              style={{ borderRadius: '16px' }}
            >
              <div className="text-5xl font-extrabold mb-4">{steps[2].number}</div>
              <h3 className="text-2xl font-semibold mb-4">{steps[2].title}</h3>
              <p className="text-base">{steps[2].description}</p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-lg ${steps[3].bgColor} text-black flex-1`}
              style={{ borderRadius: '16px' }}
            >
              <div className="text-5xl font-extrabold mb-4">{steps[3].number}</div>
              <h3 className="text-2xl font-semibold mb-4">{steps[3].title}</h3>
              <p className="text-base">{steps[3].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}