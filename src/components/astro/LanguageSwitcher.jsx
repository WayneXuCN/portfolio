/**
 * LanguageSwitcher.jsx (Astro React Island 版本)
 * 语言切换按钮，用于在 /en/ 和 /zh/ 之间切换
 */
import React, { useCallback } from 'react';

const locales = {
  zh: { label: '中', path: '/zh/' },
  en: { label: 'EN', path: '/en/' },
};

const LanguageSwitcher = ({ currentLang = 'en' }) => {
  // 获取下一个语言
  const getNextLang = () => {
    const localeKeys = Object.keys(locales);
    const currentIndex = localeKeys.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % localeKeys.length;
    return localeKeys[nextIndex];
  };

  const nextLang = getNextLang();
  const nextLabel = locales[nextLang].label;
  const currentLabel = locales[currentLang].label;

  const handleSwitch = useCallback(() => {
    // 获取当前路径并替换语言前缀
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|zh)\//, '/');
    const newPath = `/${nextLang}${pathWithoutLang}`;

    // 导航到新路径
    window.location.href = newPath;
  }, [nextLang]);

  return (
    <button
      onClick={handleSwitch}
      className='ml-4 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-gray-500'
      aria-label={`当前语言: ${currentLabel}, 切换到: ${nextLabel}`}
      title={`切换到 ${nextLabel}`}
    >
      {nextLabel}
    </button>
  );
};

export default LanguageSwitcher;
