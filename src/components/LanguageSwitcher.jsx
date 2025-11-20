import React from 'react';
import { useLanguage } from '../lib/LanguageContext.jsx';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="ml-4 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      aria-label="Switch Language"
    >
      {language === 'zh' ? 'EN' : '中'}
    </button>
  );
};

export default LanguageSwitcher;
