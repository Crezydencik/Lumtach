import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import lv from "./locales/lv.json";

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    // Проверяем, доступен ли `localStorage`
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      return savedLanguage;
    }

    // Если язык не сохранён, используем язык браузера
    const browserLanguages = navigator.languages || [navigator.language];
    const supportedLanguages = ["en", "ru", "lv"];

    // Выбираем первый поддерживаемый язык из предпочтений браузера
    for (let i = 0; i < browserLanguages.length; i++) {
      const language = browserLanguages[i].split("-")[0]; // Отделяем код языка (например, "ru" от "ru-RU")
      if (supportedLanguages.includes(language)) {
        return language;
      }
    }

    // Если язык не поддерживается, используем язык по умолчанию
    return "en";
  }
  return "en"; // Язык по умолчанию для сервера
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    lv: {
      translation: lv,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en", // Язык по умолчанию
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem("selectedLanguage", lng); // Сохраняем выбранный язык в localStorage
  });
}

export default i18n;
