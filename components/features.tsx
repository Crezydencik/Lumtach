'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Paintbrush, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Code2,
    title: 'SOFTWARE DEVELOPMENT',
    description: 'We specialize in creating custom software tailored to businesses\' needs. Our team of experts uses an Agile approach for fast and secure development that delivers maximum value to your business.',
    glowColor: 'from-pink-500/20',
  },
  {
    icon: Smartphone,
    title: 'WEB & MOBILE DEVELOPMENT',
    description: 'We specialize in crafting modern websites and mobile applications, delivering unique solutions and outstanding user experiences. We stay up-to-date with the latest technologies to provide a competitive edge in the digital landscape.',
    glowColor: 'from-blue-500/20',
  },
  {
    icon: Paintbrush,
    title: 'UX/UI DESIGN',
    description: 'UX/UI design is an essential part of creating attractive, intuitive, and user-friendly digital interfaces. In our company, we specialize in UX/UI design, helping businesses create appealing digital experiences that bring satisfaction to users.',
    glowColor: 'from-lime-500/20',
  },
  {
    icon: Database,
    title: 'DATA SCIENCE',
    description: 'Data science is essential for informed business decisions. Our company specializes in extracting valuable insights from various data sources, including big data.',
    glowColor: 'from-yellow-500/20',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-lime-400 mb-4 font-mono">OUR SERVICES</div>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-6xl font-bold mb-8">
              TAILORED TO<br />
              YOUR <span className="text-gray-500">NEEDS</span>
            </h2>
            <p className="text-gray-400 mb-8">
              We diligently strive to ensure that our solutions not only perform their functions but also inspire, support, and yield tangible results. Our approach is rooted in innovation, specialized software solutions, and a personalized touch tailored to each client.
            </p>
            <Button className="custom-button bg-lime-400 text-black hover:bg-lime-500 text-lg px-8 py-4">
              Learn more
            </Button>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 p-6 rounded-lg relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-radial ${feature.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />
                <feature.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}