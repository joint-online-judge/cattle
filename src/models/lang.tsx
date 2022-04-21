import i18next from 'i18next'
import type { FC } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

export interface LangContextValue {
	allLang: readonly string[]
	currentLang: string
	switchLang: (lang: string) => void
}

const LangContext = createContext<LangContextValue>({
	allLang: [],
	currentLang: '',
	switchLang: () => {}
})

const LangContextProvider: FC = ({ children }) => {
	const [currentLang, setCurrentLang] = useState<string>(i18next.language)
	const allLang = i18next.languages

	const switchLang = useCallback(
		(lang: string) => {
			if (allLang.includes(lang)) {
				setCurrentLang(lang)
				i18next.changeLanguage(lang)
			}
		},
		[allLang]
	)

	const value: LangContextValue = useMemo(
		() => ({
			allLang,
			currentLang,
			switchLang
		}),
		[allLang, currentLang, switchLang]
	)

	return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export { LangContext, LangContextProvider }
