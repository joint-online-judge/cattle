import { useState, useCallback } from 'react';
import { getAllLocales, getLocale, setLocale } from 'umi';

/**
 * Global language model.
 * Encapsulation of umi locale plugin.
 */
export default function LangModel() {
  const [currentLang, setCurrentLang] = useState<string>(getLocale());
  const allLang = getAllLocales(); // No plural because of spell checking

  const switchLang = useCallback((lang: string) => {
    setCurrentLang(lang);
    setLocale(lang, false);
  }, []);

  return {
    allLang,
    currentLang,
    switchLang,
  };
}
