'use client';

import React from 'react';
import { useLanguage } from '../../lib/LanguageContext.jsx';
import { locales } from '../../locales/config';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  const getNextLanguageLabel = () => {
    const localeKeys = Object.keys(locales);
    const currentIndex = localeKeys.indexOf(language);
    const nextIndex = (currentIndex + 1) % localeKeys.length;
    const nextLang = localeKeys[nextIndex];
    return locales[nextLang].label;
  };

  const currentLabel = locales[language].label;
  const nextLabel = getNextLanguageLabel();

  return (
    <button
      onClick={toggleLanguage}
      className='ml-4 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-gray-500'
      aria-label={`当前语言: ${currentLabel}, 切换到: ${nextLabel}`}
      title={`切换到 ${nextLabel}`}
    >
      {nextLabel}
    </button>
  );
};

export default LanguageSwitcher;
