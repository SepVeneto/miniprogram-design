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
        text: 'core',
        link: '/core',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SepVeneto/miniprogram-design' },
    ],
  },
})
