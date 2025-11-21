'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { locales, defaultLocale } from '../locales/config';

const LanguageContext = createContext();
const localeKeys = Object.keys(locales);

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
  const [language, setLanguageState] = useState(defaultLocale);
  const [isReady, setIsReady] = useState(false);

  const updateLanguage = useCallback((nextLanguage, { persist = true } = {}) => {
    const fallbackLanguage = locales[nextLanguage] ? nextLanguage : defaultLocale;
    setLanguageState(prev => (prev === fallbackLanguage ? prev : fallbackLanguage));
    if (persist) {
      setStoredLanguage(fallbackLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateLanguage(getStoredLanguage());
    setIsReady(true);
  }, [updateLanguage]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleStorage = event => {
      if (event.key === 'language' && event.newValue) {
        updateLanguage(event.newValue, { persist: false });
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [updateLanguage]);

  const resolvedLanguage = locales[language] ? language : defaultLocale;
  const content = useMemo(() => {
    return locales[resolvedLanguage]?.data ?? locales[defaultLocale]?.data ?? null;
  }, [resolvedLanguage]);

  const toggleLanguage = useCallback(() => {
    const currentIndex = localeKeys.indexOf(resolvedLanguage);
    const nextIndex = (currentIndex + 1) % localeKeys.length;
    updateLanguage(localeKeys[nextIndex]);
  }, [resolvedLanguage, updateLanguage]);

  const contextValue = useMemo(
    () => ({
      language: resolvedLanguage,
      content,
      toggleLanguage,
      setLanguage: updateLanguage,
      availableLanguages: localeKeys,
      isReady,
    }),
    [resolvedLanguage, content, toggleLanguage, updateLanguage, isReady]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
