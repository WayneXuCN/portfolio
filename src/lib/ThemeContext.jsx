'use client';

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const ThemeContext = createContext();

// 安全的localStorage和主题操作
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('theme');
    if (saved && (saved === 'light' || saved === 'dark')) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const applyTheme = theme => {
  if (typeof window === 'undefined') return;
  const action = theme === 'dark' ? 'add' : 'remove';
  document.documentElement.classList[action]('dark');
};

const storeTheme = theme => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // 忽略localStorage错误
  }
};

export const ThemeProvider = ({ children }) => {
  // 初始化时直接读取已应用的主题(layout中的script已设置)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  // 只在主题变化时更新
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storeTheme(newTheme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
