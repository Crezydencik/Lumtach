'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function AboutCompany() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between"
        >
          <div className="md:w-1/2">
            <div className="text-[#96E072] mb-4 font-mono text-sm tracking-wider">ABOUT COMPANY</div>
            <h2 className="text-7xl font-mono leading-tight mb-8">
              WHERE<br />
              TECHNOLOGIES<br />
              <span className="text-[#333333]">BECOME REALITY</span>
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-xl text-lg">
              Lumtech is a modern, young IT company whose mission is to create innovative and functional technological solutions. Our team of talented developers, designers, and data analysis specialists works diligently to offer products that meet the needs of the modern market.
            </p>
            
            <Button className="bg-[#96E072] text-black hover:bg-[#85c665] font-mono text-lg px-8 py-6 rounded-none">
              Discuss the project
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 md:w-1/2 mt-12 md:mt-0"
          >
            {[
              { number: '12', text: 'projects' },
              { number: '12', text: 'projects' },
              { number: '12', text: 'projects' },
              { number: '72', text: 'projects' }
            ].map((item, index) => (
              <div key={index} className="bg-[#111111] p-8 rounded-2xl">
                <div className="text-5xl font-mono mb-2">{item.number}</div>
                <div className="text-gray-500 font-mono">{item.text}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}