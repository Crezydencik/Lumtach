'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu, Facebook, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string | undefined) => {
    i18n.changeLanguage(lang); // Переключение языка
    setIsLangOpen(false); // Закрыть меню после выбора языка
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false); // Закрыть меню, если клик вне его
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Управление скроллом при открытии меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Отключить прокрутку
    } else {
      document.body.style.overflow = ''; // Восстановить прокрутку
    }
    return () => {
      document.body.style.overflow = ''; // Очистить стиль при размонтировании
    };
  }, [isOpen]);

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

          <div className="flex  items-center space-x-4">
            <a href="#contact" className="hidden md:flex bg-[#A6EB53] text-black hover:bg-[#96D44B] px-6 py-2 rounded-full text-sm font-mono">
              {t('navbar.contact')}
            </a>

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="language-toggle text-white font-mono flex items-center space-x-1 text-sm"
                aria-label="Toggle language menu"
              >
                {i18n.language.toUpperCase()} <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isLangOpen && (
                <div className="language-menu absolute right-0 mt-3 w-24 bg-black border border-gray-800 rounded-lg shadow-lg z-50">
                  {['en', 'lv', 'ru'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 font-mono text-sm"
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#A6EB53]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 right-0 w-[320px] h-[calc(100vh-80px)] bg-black border-l border-gray-800 z-40"
          >
            <div className="flex flex-col h-full justify-between p-8">
              <div className="space-y-8">
                <Link href="#home" className="block text-white hover:text-[#A6EB53] text-xl font-mono">
                  {t('navbar.home')}
                </Link>
                <a href="#about" className="block text-white hover:text-[#A6EB53] text-xl font-mono">
                  {t('navbar.about')}
                </a>
                <a href="#services" className="block text-white hover:text-[#A6EB53] text-xl font-mono">
                  {t('navbar.services')}
                </a>
                <a href="#project" className="block text-white hover:text-[#A6EB53] text-xl font-mono">
                  {t('navbar.project')}
                </a>
                <a href="#advant" className="block text-white hover:text-[#A6EB53] text-xl font-mono">
                  {t('navbar.advantages')}
                </a>
              </div>

              <div>
                <div className="text-sm text-[#A6EB53] font-mono uppercase mb-4">
                  {t('navbar.contact')}
                </div>
                <div className="space-y-2 text-gray-400 text-sm font-mono">
                  <p>IK: Deniss Kargins</p>
                  <p>+37129992017</p>
                  <p>lumtach@gmail.com</p>
                  <p>Riga, Latvia</p>
                </div>
                <div className="flex space-x-4 mt-6">
                        <Link href="https://www.facebook.com/lumtach" target="_blank" className="text-gray-400 hover:text-[#A6EB53]">
                            <div className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-sm hover:border-[#A6EB53]">
                              <Facebook className="w-6 h-6" />
                            </div>
                        </Link>
                        <Link href="https://www.instagram.com/lumtach/" target="_blank" className="text-gray-400 hover:text-[#A6EB53]">
                            <div className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-sm hover:border-[#A6EB53]">
                                <Instagram className="w-6 h-6" />
                            </div>
                         </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
