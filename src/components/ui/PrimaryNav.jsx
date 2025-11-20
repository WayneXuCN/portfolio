'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../lib/LanguageContext.jsx';

const PrimaryNav = () => {
  const { content } = useLanguage();
  const navLinks = (content?.nav || []).filter(link => !link.hidden);
  const pathname = usePathname();

  // Helper to check if link is active
  const isActiveLink = (href) => {
    // Handle root path
    if (href === 'index.html' || href === '/') {
      return pathname === '/';
    }
    // Handle other paths (remove .html for comparison if needed, or match exact)
    // Our content.json has .html extensions, but Next.js uses clean URLs
    const cleanHref = href.replace('.html', '');
    const cleanPath = pathname.replace('/', '');
    return cleanPath === cleanHref;
  };

  // Helper to get correct Next.js href
  const getHref = (href) => {
    if (href === 'index.html') return '/';
    return '/' + href.replace('.html', '');
  };

  return (
    <nav className="flex flex-wrap items-center gap-3 sm:gap-8 text-base font-medium text-gray-600 dark:text-gray-300">
      {navLinks.map((link, index) => {
        const active = isActiveLink(link.href);
        return (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span className="text-gray-300 dark:text-gray-600 select-none text-sm sm:text-base">
                /
              </span>
            )}
            <Link
              href={getHref(link.href)}
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
