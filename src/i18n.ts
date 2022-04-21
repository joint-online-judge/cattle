import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		// lng: 'en-US',
		fallbackLng: ['en-US', 'zh-CN'],
		supportedLngs: ['en-US', 'zh-CN'],
		load: 'currentOnly',
		debug: process.env.NODE_ENV === 'development',
		interpolation: {
			escapeValue: false
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		}
	})

export default i18n
