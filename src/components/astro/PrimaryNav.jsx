/**
 * PrimaryNav.jsx (Astro React Island 版本)
 * 主导航组件，支持 active 状态高亮
 */
import React, { useMemo } from 'react';

/**
 * 标准化路径：移除 .html 扩展名和尾部斜杠
 */
const normalizePath = href => {
  if (!href) return '/';
  // 处理外部链接和锚点
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
    return href;
  }
  // 移除 .html 扩展名
  let normalized = href.replace(/\.html$/i, '');
  // 处理 index
  if (normalized === 'index' || normalized === '/index') {
    return '/';
  }
  // 确保以 / 开头
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  return normalized;
};

const PrimaryNav = ({ nav = [], currentPath = '/', lang = 'en' }) => {
  // 过滤隐藏的导航项
  const navLinks = useMemo(() => {
    if (!Array.isArray(nav)) return [];
    return nav.filter(link => link?.href && !link.hidden);
  }, [nav]);

  // 判断是否为当前激活链接
  const isActiveLink = href => {
    const normalizedHref = normalizePath(href);
    const normalizedCurrent = normalizePath(currentPath);

    // 外部链接不激活
    if (normalizedHref.startsWith('http') || normalizedHref.startsWith('mailto:')) {
      return false;
    }

    // 首页特殊处理
    if (normalizedHref === '/' || normalizedHref === '/index') {
      return (
        normalizedCurrent === '/' ||
        normalizedCurrent === `/${lang}` ||
        normalizedCurrent === `/${lang}/`
      );
    }

    return (
      normalizedCurrent.endsWith(normalizedHref) ||
      normalizedCurrent === `/${lang}${normalizedHref}`
    );
  };

  // 解析链接 href（添加语言前缀）
  const resolveHref = href => {
    const normalized = normalizePath(href);

    // 外部链接和锚点直接返回
    if (
      normalized.startsWith('http') ||
      normalized.startsWith('mailto:') ||
      normalized.startsWith('#')
    ) {
      return normalized;
    }

    // 首页
    if (normalized === '/' || normalized === '/index') {
      return `/${lang}/`;
    }

    // 添加语言前缀
    return `/${lang}${normalized}/`;
  };

  return (
    <nav className='flex flex-wrap items-center gap-3 sm:gap-8 text-base font-medium text-gray-600 dark:text-gray-300'>
      {navLinks.map((link, index) => {
        const resolvedHref = resolveHref(link.href);
        const active = isActiveLink(link.href);

        return (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span className='text-gray-300 dark:text-gray-600 select-none text-sm sm:text-base'>
                /
              </span>
            )}
            <a
              href={resolvedHref}
              aria-current={active ? 'page' : undefined}
              className={`relative group transition-colors py-1 ${
                active
                  ? 'text-black dark:text-white font-bold'
                  : 'hover:text-black dark:hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white transition-all duration-300 ease-out ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </a>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default PrimaryNav;
