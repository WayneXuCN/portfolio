'use client';

import React from 'react';
import HeaderBar from '../ui/HeaderBar.jsx';
import SocialLink from '../ui/SocialLink.jsx';
import { useLanguage } from '../../lib/LanguageContext.jsx';

const Layout = ({ children }) => {
  const { content } = useLanguage();

  if (!content?.header || !content?.footer) {
    return null;
  }

  const { header, footer } = content;
  const socialLinks = Array.isArray(footer.socialLinks) ? footer.socialLinks : [];

  return (
    <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 animate-fade-in'>
      <HeaderBar header={header} />

      <main>{children}</main>

      <footer className='pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-gray-200 dark:border-gray-800'>
        <div className='flex justify-between items-center flex-col md:flex-row gap-6 md:gap-0'>
          <p className='text-gray-600 dark:text-gray-400 text-base sm:text-lg text-center md:text-left'>
            {footer.copyright}
          </p>
          <div className='flex space-x-4 sm:space-x-6'>
            {socialLinks.map(link => (
              <SocialLink key={link.url} link={link} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
