'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      x: '0%',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black">
        <div className="flex items-center justify-between h-20 px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/lumtech-logo.svg"
              alt="Lumtech"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <button className="bg-[#96E072] text-black hover:bg-[#85c665] px-6 py-2 rounded-full text-sm font-mono">
              Contact us
            </button>

            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-white font-mono flex items-center space-x-1 text-sm"
              aria-label="Toggle language menu"
            >
              EN <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#96E072]" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-20 right-0 w-[320px] h-[calc(100vh-80px)] bg-black border-l border-gray-800 z-40"
          >
            <div className="flex flex-col h-full justify-between p-8">
              <div className="space-y-8">
                <Link href="/" className="block text-white hover:text-[#96E072] text-xl font-mono">
                  HOME
                </Link>
                <Link href="/about" className="block text-white hover:text-[#96E072] text-xl font-mono">
                  ABOUT US
                </Link>
                <Link href="/services" className="block text-white hover:text-[#96E072] text-xl font-mono">
                  SERVICES
                </Link>
              </div>

              <div>
                <div className="text-sm text-[#96E072] font-mono uppercase mb-4">Contact us</div>
                <div className="space-y-2 text-gray-400 text-sm font-mono">
                  <p>+1 (999) 999-99-99</p>
                  <p>hello@logipsum.com</p>
                  <p>Riga, Latvia</p>
                </div>
                <div className="flex space-x-4 mt-6">
                  {['FB', 'IG', 'YT', 'TW'].map((social) => (
                    <Link key={social} href="#" className="text-gray-400 hover:text-[#96E072]">
                      <div className="w-8 h-8 border border-gray-800 rounded-full flex items-center justify-center text-sm">
                        {social}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Полупрозрачный оверлей для затемнения основной области */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isLangOpen && (
        <div className="absolute top-20 right-20 w-24 bg-black border border-gray-800 rounded-lg shadow-lg z-50">
          {['EN', 'LV', 'RU'].map((lang) => (
            <button key={lang} className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 font-mono text-sm">
              {lang}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
