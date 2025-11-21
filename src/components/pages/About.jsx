import React from 'react';
import Link from 'next/link';
import Hero from '../ui/Hero.jsx';

const About = ({ content }) => {
  const { about } = content;
  const { hero, timeline, values, philosophy } = about;

  return (
    <>
      <Hero subtitle={hero.subtitle} title={hero.title} description={hero.description} />

      <section className='mb-12 sm:mb-16 md:mb-20'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <p className='text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400'>
              {timeline.subtitle}
            </p>
            <h3 className='text-3xl font-semibold display-font'>{timeline.title}</h3>
          </div>
          <span className='text-gray-400 dark:text-gray-500 text-sm'>{timeline.period}</span>
        </div>
        <div className='space-y-6'>
          {timeline.items.map((item, index) => (
            <article
              key={index}
              className='p-6 rounded-2xl border border-gray-200 dark:border-gray-700 card-hover'
            >
              <p className='text-xs text-gray-400 dark:text-gray-500 uppercase tracking-[0.35em] mb-2'>
                {item.period}
              </p>
              <h4 className='text-2xl font-semibold mb-3'>{item.title}</h4>
              <p className='text-gray-600 dark:text-gray-300'>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mb-12 sm:mb-16 md:mb-20'>
        <div className='grid md:grid-cols-2 gap-10'>
          <div className='text-center md:text-left'>
            <p className='text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3'>
              {values.subtitle}
            </p>
            <h3 className='text-3xl font-semibold display-font mb-6'>{values.title}</h3>
            <ul className='space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed'>
              {values.items.map((item, index) => (
                <li key={index} className='flex flex-col items-center md:block'>
                  <span className='font-semibold text-gray-900 dark:text-gray-100 md:mr-2 mb-1 md:mb-0'>
                    {item.label}：
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 card-hover'>
            <p className='text-sm text-pink-500 dark:text-pink-400 font-semibold tracking-[0.35em] mb-4'>
              {values.product.subtitle}
            </p>
            <h4 className='text-2xl font-semibold mb-3'>{values.product.title}</h4>
            <p className='text-gray-600 dark:text-gray-300'>{values.product.description}</p>
            <Link
              href={values.product.linkUrl}
              className='inline-flex items-center text-pink-500 dark:text-pink-400 font-medium underline mt-4'
              suppressHydrationWarning
            >
              {values.product.linkText} <i className='fas fa-arrow-right ml-2'></i>
            </Link>
          </div>
        </div>
      </section>

      <section className='mb-12 sm:mb-16 md:mb-20'>
        <div className='bg-black dark:bg-gray-800 text-white rounded-3xl p-10 md:p-14 card-hover'>
          <p className='uppercase text-sm tracking-[0.4em] text-gray-300 dark:text-gray-400 mb-4'>
            {philosophy.subtitle}
          </p>
          <h3 className='display-font text-4xl font-semibold mb-6'>{philosophy.title}</h3>
          <p className='text-lg text-gray-200 dark:text-gray-300 mb-8'>{philosophy.description}</p>
          <Link
            href={philosophy.ctaUrl}
            className='inline-flex items-center text-black bg-white dark:text-white dark:bg-gray-700 px-5 py-3 rounded-full font-semibold'
          >
            {philosophy.ctaText} <i className='fas fa-arrow-right ml-3'></i>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
