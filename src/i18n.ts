import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    supportedLngs: ['en', 'zh-CN'],
    fallbackLng: ['en', 'zh-CN'],
    load: 'currentOnly',
    debug:
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'staging',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    returnNull: false
  })

export default i18n
