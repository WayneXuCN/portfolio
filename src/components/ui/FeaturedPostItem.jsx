import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { resolveContentHref } from '../../lib/urlUtils.js';

const FeaturedPostItem = ({ item }) => (
  <a
    href={resolveContentHref(item.url)}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={`阅读文章: ${item.title}`}
    className='relative block overflow-hidden rounded-lg shadow-md card-hover featured-post-item website-item focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white'
  >
    <div className='relative w-full h-64'>
      <Image
        src={item.image}
        alt={item.title}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      />
    </div>
    <div
      className={`absolute inset-0 ${item.overlayColor} ${item.overlayOpacity} card-overlay transition-all duration-300 flex flex-col p-6`}
    >
      <div>
        <h3 className='text-white text-xl font-bold mb-2'>{item.title}</h3>
        <p className='text-white text-sm opacity-0 transition-opacity duration-300 website-description-text transform translate-y-2 transition-transform duration-300'>
          {item.description}
        </p>
      </div>
    </div>
  </a>
);

FeaturedPostItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    overlayColor: PropTypes.string,
    overlayOpacity: PropTypes.string,
  }).isRequired,
};

export default React.memo(FeaturedPostItem);
