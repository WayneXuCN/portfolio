import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext.jsx';

const PrimaryNav = () => {
  const { content } = useLanguage();
  const navLinks = content?.nav || [];

  return (
    <nav className="flex flex-wrap items-center gap-8 text-base font-medium text-gray-600 dark:text-gray-300">
      {navLinks.map((link, index) => {
        return (
          <React.Fragment key={link.href}>
            {index > 0 && (
              <span className="text-gray-300 dark:text-gray-600 select-none">
                /
              </span>
            )}
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `relative group transition-colors py-1 ${
                  isActive
                    ? 'text-black dark:text-white font-bold'
                    : 'hover:text-black dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default PrimaryNav;
