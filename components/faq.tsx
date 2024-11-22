'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqsColumn1 = [
  {
    question: 'What is a cryptocurrency exchange?',
    answer: 'Cryptocurrency exchanges serve as digital marketplaces where individuals can engage in the buying and selling of cryptocurrencies such as Bitcoin, Ethereum, and Tether.',
  },
  {
    question: 'What does Bit Market offer?',
    answer: 'Bit Market offers a comprehensive suite of cryptocurrency trading tools, secure wallet services, and real-time market analytics to help you make informed trading decisions.',
  },
  {
    question: 'How to purchase Bitcoin and other cryptocurrencies on Bit Market?',
    answer: 'You can easily purchase cryptocurrencies using various payment methods including bank transfers, credit cards, and other supported payment systems.',
  },
];

const faqsColumn2 = [
  {
    question: 'How to stay updated on cryptocurrency prices?',
    answer: 'Stay updated through our real-time price alerts, market analysis tools, and comprehensive trading charts available on our platform.',
  },
  {
    question: 'How to engage in cryptocurrency trading on Bit Market?',
    answer: 'To start trading, create an account, complete verification, deposit funds, and use our intuitive trading interface to execute your trades.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleOpenIndex = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl font-mono text-center mb-16 text-white">FAQ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Первый столбец */}
          <div>
            {faqsColumn1.map((faq, index) => {
              const id = `column1-${index}`;
              return (
                <div key={id} className="border-b border-gray-800">
                  <button
                    onClick={() => toggleOpenIndex(id)}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <span className="text-lg font-mono text-white pr-4">{faq.question}</span>
                    <div className="flex-shrink-0">
                      {openIndex === id ? (
                        <div className="bg-[#96E072] p-2 rounded-full">
                          <Minus className="w-5 h-5 text-black" />
                        </div>
                      ) : (
                        <div className="bg-gray-800 p-2 rounded-full">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 pb-4 font-mono">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Второй столбец */}
          <div>
            {faqsColumn2.map((faq, index) => {
              const id = `column2-${index}`;
              return (
                <div key={id} className="border-b border-gray-800">
                  <button
                    onClick={() => toggleOpenIndex(id)}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <span className="text-lg font-mono text-white pr-4">{faq.question}</span>
                    <div className="flex-shrink-0">
                      {openIndex === id ? (
                        <div className="bg-[#96E072] p-2 rounded-full">
                          <Minus className="w-5 h-5 text-black" />
                        </div>
                      ) : (
                        <div className="bg-gray-800 p-2 rounded-full">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 pb-4 font-mono">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
