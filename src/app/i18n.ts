import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import { IS_PRODUCTION } from 'app/constants';
// To change i18n configuration, refer to the file right below
import { SUPPORT_LANGUAGES } from 'app/constants/i18n';

const ns = ['translation'];

const resources = () => {
  const ret = {};
  Object.keys(SUPPORT_LANGUAGES).forEach((lang) => {
    ret[lang] = {
      translation: { ...SUPPORT_LANGUAGES[lang].i18next },
    };
  });
  return ret;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: !IS_PRODUCTION,
    ns,
    resources: resources(),
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
