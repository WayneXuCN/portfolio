'use client';

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { locales, defaultLocale } from '../locales/config';

const LanguageContext = createContext();

// 安全的localStorage操作
const getStoredLanguage = () => {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const stored = localStorage.getItem('language');
    return stored && locales[stored] ? stored : defaultLocale;
  } catch {
    return defaultLocale;
  }
};

const setStoredLanguage = lang => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('language', lang);
  } catch {
    // 忽略localStorage错误(如隐私模式)
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => getStoredLanguage());
  const content = useMemo(() => locales[language]?.data, [language]);

  const toggleLanguage = () => {
    const localeKeys = Object.keys(locales);
    const currentIndex = localeKeys.indexOf(language);
    const nextIndex = (currentIndex + 1) % localeKeys.length;
    const newLang = localeKeys[nextIndex];

    setLanguage(newLang);
    setStoredLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, content, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
