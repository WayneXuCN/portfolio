import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children, content }) => {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('en')) {
      setLanguage('en');
    } else {
      setLanguage('zh');
    }
  }, []);

  const currentContent = content ? content[language] : null;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    content: currentContent,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
