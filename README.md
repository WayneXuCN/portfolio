<p align="center">
  <img src="public/assets/img/website.png" alt="Starter Theme Preview" width="800" />
</p>

<h1 align="center">Starter Theme</h1>

<p align="center">
  <strong>A modern, minimalist personal landing page theme built with Astro 5</strong>
</p>

<p align="center">
  <a href="https://github.com/WayneXuCN/starter-theme/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://astro.build/">
    <img src="https://img.shields.io/badge/Astro-5.x-ff5d01.svg?logo=astro" alt="Astro" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19.x-61dafb.svg?logo=react" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg?logo=tailwindcss" alt="Tailwind CSS" />
  </a>
  <a href="https://bun.sh/">
    <img src="https://img.shields.io/badge/Bun-1.x-fbf0df.svg?logo=bun" alt="Bun" />
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-deployment">Deployment</a>
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_zh.md">中文</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **i18n Ready** | Built-in internationalization with Astro's native i18n routing and Content Collections |
| 🌙 **Dark Mode** | Automatic theme switching with system preference detection and localStorage persistence |
| 📱 **Responsive** | Mobile-first design that looks great on all devices |
| 📡 **RSS Aggregation** | Fetch and display posts from external RSS/Atom feeds |
| 📧 **Contact Form** | Pre-configured EmailJS integration for functional contact forms |
| 📊 **Analytics** | Optional Google Analytics 4 integration |
| ⚡ **Performance** | 100/100 Lighthouse scores with static site generation |
| 🎨 **Tailwind CSS** | Utility-first styling with full dark mode support |
| 🏝️ **Islands Architecture** | Interactive React components with minimal JavaScript |
| 🧪 **E2E Testing** | Playwright test suite included |

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) 1.0+ (recommended) or [Node.js](https://nodejs.org/) 18+

### Create Your Site

```bash
# Clone the template
git clone https://github.com/WayneXuCN/starter-theme.git my-site
cd my-site

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to see your site.

### Build for Production

```bash
bun run build
```

Output is generated in the `dist/` directory, ready for deployment to any static hosting platform.

## 📁 Project Structure

```
starter-theme/
├── src/
│   ├── components/astro/     # React island components
│   │   ├── HeaderBar.jsx     # Navigation header
│   │   ├── Hero.jsx          # Hero section
│   │   ├── Footer.jsx        # Site footer
│   │   ├── ThemeToggle.jsx   # Dark mode toggle
│   │   └── ...
│   ├── content/
│   │   └── i18n/             # Translations (Content Collections)
│   │       ├── en.json
│   │       └── zh.json
│   ├── layouts/
│   │   └── BaseLayout.astro  # Global HTML layout
│   ├── lib/
│   │   └── i18n.ts           # i18n utilities
│   ├── pages/
│   │   ├── index.astro       # Root redirect
│   │   ├── 404.astro         # Error page
│   │   ├── en/               # English routes
│   │   └── zh/               # Chinese routes
│   └── content.config.ts     # Content Collections schema
├── public/                   # Static assets
├── scripts/
│   └── fetch-rss.bun.js      # RSS aggregation script
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
└── package.json
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# EmailJS (required for contact form)
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics (optional)
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Site Configuration

Edit `astro.config.mjs` to update your site URL:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  // ...
});
```

### Content Management

All site content is managed through JSON files in `src/content/i18n/`:

| File | Description |
|------|-------------|
| `zh.json` | Chinese content |
| `en.json` | English content |

Each file contains:

```json
{
  "site": { "title": "...", "description": "...", "author": "..." },
  "nav": [{ "label": "Home", "href": "index.html" }],
  "header": { "name": "...", "avatar": "..." },
  "hero": { "title": "...", "subtitle": "...", "description": "..." },
  "websites": { "title": "...", "items": [...] },
  "featuredPosts": { "title": "...", "rss": {...}, "items": [...] },
  "footer": { "copyright": "...", "socialLinks": [...] },
  "about": { ... },
  "contact": { ... }
}
```

### RSS Feeds

Configure RSS aggregation in your locale JSON:

```json
{
  "featuredPosts": {
    "rss": {
      "enabled": true,
      "feeds": [
        { "url": "https://blog.example.com/feed.xml", "parser": "default" }
      ],
      "limit": 6
    }
  }
}
```

## 🎨 Customization

### Adding a New Language

1. **Update Astro config** (`astro.config.mjs`):

   ```js
   i18n: {
     defaultLocale: 'zh',
     locales: ['zh', 'en', 'ja'],
     routing: { prefixDefaultLocale: true },
   },
   ```

2. **Update i18n utilities** (`src/lib/i18n.ts`):

   ```ts
   export const locales = ['zh', 'en', 'ja'] as const;
   
   export const localeConfig = {
     // ...existing
     ja: { label: '日', name: '日本語', hrefLang: 'ja' },
   };
   ```

3. **Create translation file** (`src/content/i18n/ja.json`)

4. **Create page routes** (`src/pages/ja/`)

### Styling

- **Colors & Theme**: Edit `tailwind.config.mjs`
- **Global Styles**: Edit `src/styles/global.css`
- **Dark Mode**: Use Tailwind's `dark:` prefix

### Components

All interactive components are React islands in `src/components/astro/`:

| Component | Purpose |
|-----------|---------|
| `HeaderBar.jsx` | Navigation with language switcher |
| `Hero.jsx` | Hero section with title and CTA |
| `Home.jsx` | Homepage layout with sections |
| `About.jsx` | About page content |
| `Contact.jsx` | Contact page with form |
| `Footer.jsx` | Site footer |
| `ThemeToggle.jsx` | Dark/light mode toggle |
| `LanguageSwitcher.jsx` | Language selector |

## 🚢 Deployment

The theme generates static HTML files that can be deployed anywhere:

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages

Use the included GitHub Actions workflow or deploy manually:

```bash
bun run build
# Upload dist/ to gh-pages branch
```

### Cloudflare Pages

Connect your repository and set:
- **Build command**: `bun run build`
- **Output directory**: `dist`

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run fetch:rss` | Fetch RSS feeds |
| `bun run test` | Run Playwright tests |
| `bun run format` | Format code with Prettier |

## 🧪 Testing

```bash
# Run all tests
bun run test

# Run tests in headed mode
bun run test:headed

# Run tests with UI
bun run test:ui
```

## 📊 Lighthouse Scores

<p align="center">
  <img src="public/assets/img/desktop_pagespeed.png" alt="Lighthouse Desktop Score" width="600" />
</p>

| Metric | Score |
|--------|-------|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **UI**: [React](https://react.dev/) 19.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **Runtime**: [Bun](https://bun.sh/) 1.x
- **Testing**: [Playwright](https://playwright.dev/)
- **Email**: [EmailJS](https://www.emailjs.com/)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/WayneXuCN">Wenjie Xu</a>
</p>
