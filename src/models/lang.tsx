import { ConfigProvider } from 'antd'
import type { Locale } from 'antd/lib/locale-provider'
import enUS from 'antd/lib/locale/en_US'
import zhCN from 'antd/lib/locale/zh_CN'
import { isArray } from 'lodash-es'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

const antdLangMap: Record<string, Locale | undefined> = {
  en: enUS,
  'zh-CN': zhCN
}

const localKey = 'LANG' // Store language preference in local storage

const LangContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const allLang = i18n.languages

  const initCurrentLang = (): string => {
    const defaultLang = localStorage.getItem(localKey)
    if (defaultLang && isArray(allLang) && allLang.includes(defaultLang)) {
      return defaultLang
    }
    return i18n.language
  }

  const initAntLang = (): Locale => {
    const defaultLang = localStorage.getItem(localKey)
    if (defaultLang && isArray(allLang) && allLang.includes(defaultLang)) {
      const locale = antdLangMap[defaultLang]
      return locale ?? enUS
    }
    return enUS
  }

  const [currentLang, setCurrentLang] = useState<string>(initCurrentLang())
  const [antLocale, setAntLocale] = useState<Locale>(initAntLang())

  const switchLang = useCallback(
    (lang: string) => {
      if (isArray(allLang) && allLang.includes(lang)) {
        setCurrentLang(lang)
        localStorage.setItem(localKey, lang)
      }
    },
    [allLang]
  )

  useEffect(() => {
    i18n.changeLanguage(currentLang)
    const locale = antdLangMap[currentLang]
    if (locale !== undefined) {
      setAntLocale(locale)
    }
  }, [currentLang, i18n])

  const value: LangContextValue = useMemo(
    () => ({
      allLang,
      currentLang,
      switchLang
    }),
    [allLang, currentLang, switchLang]
  )

  return (
    <LangContext.Provider value={value}>
      <ConfigProvider
        locale={antLocale}
        theme={{ token: { colorPrimary: '#6543a9', colorBgContainer: '#fff' } }}
      >
        {children}
      </ConfigProvider>
    </LangContext.Provider>
  )
}

export { LangContext, LangContextProvider }
