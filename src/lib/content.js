export const CONTENT_URL = 'content.json';

const DEFAULT_CONTENT_SINGLE = {
  site: {
    title: 'Wenjie Xu - Personal Website',
    author: '徐文杰',
    favicon: {
      ico: 'favicon.ico',
      appleTouchIcon: 'apple-touch-icon.png',
    },
  },
  nav: [
    { label: '首页', href: 'index.html' },
    { label: '关于', href: 'about.html' },
    { label: '联系', href: 'contact.html' },
  ],
  header: {
    avatar: 'https://picsum.photos/seed/avatar123/50/50.jpg',
    name: '徐文杰',
  },
  hero: {
    subtitle: 'WENJIE XU',
    title: '保持好奇 也保持自在',
    description:
      'Collaborating with diverse people is something I truly enjoy.<br />If you want to <a href="mailto:wenjie.xu.cn@outlook.com" class="underline">contact me</a>, I\'ll be happy to connect!',
  },
  websites: {
    title: 'Websites',
    items: [],
  },
  featuredPosts: {
    title: 'Featured Posts',
    items: [],
    seeAllText: 'See All Posts',
    seeAllUrl: '#',
  },
  footer: {
    copyright: '© 2025 All Rights Reserved.',
    socialLinks: [],
  },
  about: {
    hero: {
      subtitle: 'STORY',
      title: 'About Me',
      description: 'My Story',
    },
    timeline: {
      subtitle: 'TIMELINE',
      title: 'Timeline',
      period: '2015 - Now',
      items: [],
    },
    values: {
      subtitle: 'VALUES',
      title: 'Values',
      items: [],
      product: {
        subtitle: 'Product',
        title: 'Product Title',
        description: 'Product Description',
        linkText: 'Link',
        linkUrl: '#',
      },
    },
    philosophy: {
      subtitle: 'PHILOSOPHY',
      title: 'Philosophy',
      description: 'Philosophy Description',
      ctaText: 'Contact',
      ctaUrl: 'contact.html',
    },
  },
  contact: {
    hero: {
      subtitle: 'CONTACT',
      title: 'Contact Me',
      description: 'Get in touch',
    },
    cards: {
      email: {
        subtitle: 'EMAIL',
        address: 'email@example.com',
        note: 'Note',
      },
      social: {
        subtitle: 'SOCIAL',
        items: [],
      },
    },
    form: {
      subtitle: 'FORM',
      title: 'Form Title',
      note: 'Note',
    },
    services: {
      items: [],
    },
  },
};

export const DEFAULT_CONTENT = {
  zh: DEFAULT_CONTENT_SINGLE,
  en: DEFAULT_CONTENT_SINGLE,
};

const deepClone = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const mergeSection = (section = {}, fallback = {}) => ({
  ...fallback,
  ...section,
});

const mergeListSection = (section = {}, fallback = {}) => ({
  ...mergeSection(section, fallback),
  items: Array.isArray(section?.items) ? section.items : fallback.items,
});

const mergeSingleContent = (data = {}, fallback = {}) => {
  const site = mergeSection(data.site, fallback.site);
  const nav = Array.isArray(data.nav) ? data.nav : fallback.nav;
  const header = mergeSection(data.header, fallback.header);
  const hero = mergeSection(data.hero, fallback.hero);
  const websites = mergeListSection(data.websites, fallback.websites);
  const featuredPosts = {
    ...mergeListSection(data.featuredPosts, fallback.featuredPosts),
    seeAllText: data.featuredPosts?.seeAllText ?? fallback.featuredPosts.seeAllText,
    seeAllUrl: data.featuredPosts?.seeAllUrl ?? fallback.featuredPosts.seeAllUrl,
  };
  const footer = {
    ...mergeSection(data.footer, fallback.footer),
    socialLinks: Array.isArray(data.footer?.socialLinks)
      ? data.footer.socialLinks
      : fallback.footer.socialLinks,
  };

  const about = {
    hero: mergeSection(data.about?.hero, fallback.about.hero),
    timeline: mergeListSection(data.about?.timeline, fallback.about.timeline),
    values: {
      ...mergeListSection(data.about?.values, fallback.about.values),
      product: mergeSection(
        data.about?.values?.product,
        fallback.about.values.product
      ),
    },
    philosophy: mergeSection(
      data.about?.philosophy,
      fallback.about.philosophy
    ),
  };

  const contact = {
    hero: mergeSection(data.contact?.hero, fallback.contact.hero),
    cards: {
      email: mergeSection(
        data.contact?.cards?.email,
        fallback.contact.cards.email
      ),
      social: mergeListSection(
        data.contact?.cards?.social,
        fallback.contact.cards.social
      ),
    },
    form: mergeSection(data.contact?.form, fallback.contact.form),
    services: mergeListSection(
      data.contact?.services,
      fallback.contact.services
    ),
  };

  return {
    site,
    nav,
    header,
    hero,
    websites,
    featuredPosts,
    footer,
    about,
    contact,
  };
};

export const mergeContent = (data = {}) => {
  return {
    zh: mergeSingleContent(data.zh, DEFAULT_CONTENT.zh),
    en: mergeSingleContent(data.en, DEFAULT_CONTENT.en),
  };
};

export const fetchSiteContent = async () => {
  try {
    const response = await fetch(CONTENT_URL, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('加载内容时发生错误，已回退到内置副本：', error);
    return deepClone(DEFAULT_CONTENT);
  }
};

export const loadSiteContent = async () => {
  const remoteContent = await fetchSiteContent();
  return mergeContent(remoteContent);
};
