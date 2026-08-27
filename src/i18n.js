import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import lv from './locales/lv.json';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      return savedLanguage;
    }

    const browserLanguages = navigator.languages || [navigator.language];
    const supportedLanguages = ['en', 'ru', 'lv'];

    for (let i = 0; i < browserLanguages.length; i += 1) {
      const language = browserLanguages[i].split('-')[0];
      if (supportedLanguages.includes(language)) {
        return language;
      }
    }
  }

  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    lv: { translation: lv },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('selectedLanguage', lng);
  });
}

export default i18n;
