import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
import { IS_PRODUCTION } from 'app/constants';
import en from '@/assets/locales/en/translation.json';
import zh from '@/assets/locales/zh-CN/translation.json';

const ns = ['translation'];

// fixme: work with SUPPORT_LANGUAGE_LIST constant
const resources = {
  en: {
    translation: { ...en },
  },
  'zh-CN': {
    translation: { ...zh },
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: !IS_PRODUCTION,
    ns,
    resources,
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
