import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JaVite",
  description: "Vite-Powered Java Integration",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      // empty string will be '...' in the UI
      { text: readFileSync('latest_version', 'utf-8') || '', items: 
        [
          {
            text: 'Release Notes',
            link: 'https://github.com/benny123tw/javite/releases',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/benny123tw/javite/blob/main/CONTRIBUTING.md',
          },
        ] 
      }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is JaVite?', link: '/guide/what-is-javite' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/benny123tw/javite' }, 
    ],

    logo: { src: '/duke.svg', width: 24, height: 24 }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/duke.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/duke.png' }],
    ['meta', { name: 'theme-color', content: '#ff4c4c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'JaVite | Vite-Powered Java Integration' }],
    ['meta', { property: 'og:site_name', content: 'JaVite' }],
    // ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    ['meta', { property: 'og:url', content: 'https://javite.com/' }],
  ]
})
