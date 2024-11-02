'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is a cryptocurrency exchange?',
    answer: 'Cryptocurrency exchanges serve as digital marketplaces where individuals can engage in the buying and selling of cryptocurrencies such as Bitcoin, Ethereum, and Tether.',
  },
  {
    question: 'What does Bit Market offer?',
    answer: 'Bit Market offers a comprehensive suite of cryptocurrency trading tools, secure wallet services, and real-time market analytics to help you make informed trading decisions.',
  },
  {
    question: 'How to stay updated on cryptocurrency prices?',
    answer: 'Stay updated through our real-time price alerts, market analysis tools, and comprehensive trading charts available on our platform.',
  },
  {
    question: 'How to engage in cryptocurrency trading on Bit Market?',
    answer: 'To start trading, create an account, complete verification, deposit funds, and use our intuitive trading interface to execute your trades.',
  },
  {
    question: 'How to purchase Bitcoin and other cryptocurrencies on Bit Market?',
    answer: 'You can easily purchase cryptocurrencies using various payment methods including bank transfers, credit cards, and other supported payment systems.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-7xl font-mono text-center mb-16">FAQ</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex justify-between items-center text-left"
              >
                <span className="text-xl font-mono pr-8">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="bg-[#96E072] p-2 rounded-full">
                      <Minus className="w-6 h-6 text-black" />
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-2 rounded-full">
                      <Plus className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 pb-6 font-mono">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}