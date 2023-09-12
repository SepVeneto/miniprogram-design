import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/miniprogram-design',
  title: 'miniprogram-design',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo' },
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '介绍', link: '/introduction' },
          { text: '快速开始', link: '/quickstart' },
        ],
      },
      {
        text: 'Core',
        link: '/core',
      },
      {
        text: 'Editor',
        items: [
          { text: 'Widgets', link: '/editor/widgets' },
          { text: 'Schema', link: '/editor/schema' },
          { text: 'Router', link: '/editor/router' },
          { text: 'Config', link: '/editor/config' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SepVeneto/miniprogram-design' },
    ],
  },
})
