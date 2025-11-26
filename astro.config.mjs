import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // 静态站点生成
  output: 'static',
  
  // 尾部斜杠策略
  trailingSlash: 'always',
  
  // 站点基础配置
  site: 'https://wenjiexu.site', // 在部署时更新为实际域名
  
  // i18n 国际化配置
  i18n: {
    // 默认语言
    defaultLocale: 'zh',
    // 支持的语言列表
    locales: ['zh', 'en'],
    // 路由配置
    routing: {
      // 默认语言也添加前缀，如 /zh/, /en/
      prefixDefaultLocale: true,
    },
  },
  
  // 集成配置
  integrations: [
    react(),
    tailwind({
      // 使用自定义配置文件
      configFile: './tailwind.config.mjs',
    }),
  ],
  
  // Vite 配置
  vite: {
    // 优化依赖预构建
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});