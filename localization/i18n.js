// i18n.js or i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import he from './he.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',  // Compatibility for different JSON formats
  resources: {
    en: {
      translation: en,
    },
    he: {
      translation: he,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the current language is not available
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
