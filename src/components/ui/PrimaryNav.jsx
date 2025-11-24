'use client';

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../lib/LanguageContext.jsx';
import { normalizeContentPath, resolveContentHref, isExternalHref } from '../../lib/urlUtils.js';

const PrimaryNav = () => {
  const { content } = useLanguage();
  const pathname = usePathname();
  const currentPath = useMemo(() => normalizeContentPath(pathname), [pathname]);

  const navLinks = useMemo(() => {
    if (!Array.isArray(content?.nav)) {
      return [];
    }
    return content.nav.filter(link => link?.href && !link.hidden);
  }, [content]);

  const isActiveLink = useCallback(
    href => {
      const normalizedHref = normalizeContentPath(href);
      if (isExternalHref(normalizedHref) || normalizedHref.startsWith('#')) {
        return false;
      }
      return normalizedHref === currentPath;
    },
    [currentPath]
  );

  return (
    <nav className='flex flex-wrap items-center gap-3 sm:gap-8 text-base font-medium text-gray-600 dark:text-gray-300'>
      {navLinks.map((link, index) => {
        const resolvedHref = resolveContentHref(link.href);
        const active = isActiveLink(link.href);
        return (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span className='text-gray-300 dark:text-gray-600 select-none text-sm sm:text-base'>
                /
              </span>
            )}
            <Link
              href={resolvedHref}
              prefetch={false}
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
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default PrimaryNav;
