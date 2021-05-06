import { useState, useCallback, useMemo } from 'react';
import { getAllLocales, getLocale, setLocale } from 'umi';

export default function LangModel() {
  const [currentLang, setCurrentLang] = useState<string>('en-US');
  const allLang = getAllLocales(); // no plural because of spell checking

  const switchLang = useCallback((lang: string) => {
    setCurrentLang(lang);
    setLocale(lang, false);
  }, [allLang]);

  return {
    allLang,
    currentLang,
    switchLang,
  };
}
