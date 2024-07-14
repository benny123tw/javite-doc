import { DefaultTheme, defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { readFileSync } from 'node:fs'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'What is JaVite?', link: '/guide/what-is-javite' },
  { text: 'Getting Started', link: '/guide/' },
  { text: 'Vite Plugin', link: '/guide/vite-plugin' },
  { text: 'Troubleshooting', link: '/guide/troubleshooting' },
]

const Integrations: DefaultTheme.NavItemWithLink[] = [
  { text: 'JSP', link: '/integrations/jsp' },
  { text: 'Thymeleaf', link: '/integrations/thymeleaf' },
]

const Examples: DefaultTheme.NavItemWithLink[] = [
  { text: 'Vite & JSP', link: '/examples/jsp' },
  { text: 'Vite & Thymeleaf', link: '/examples/thymeleaf' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JaVite",
  description: "Vite-Powered Java Integration",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', items: 
        [
          {
            text: 'Guide',
            items: Guides,
          }
        ],
        activeMatch: '^/guide/'
      },
      {
        text: 'Integrations',
        items:
        [
          {
            text: 'Integrations',
            items: Integrations,
          }
        ],
      },
      {
        text: 'Examples',
        items:
        [
          {
            text: 'Examples',
            items: Examples,
          }
        ],
      },
      // empty string will be '...' in the UI
      { text: readFileSync('latest_version', 'utf-8') || '', items: 
        [
          {
            text: 'Release Notes',
            link: 'https://github.com/javite-projects/javite/releases',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/javite-projects/javite/blob/main/CONTRIBUTING.md',
          },
        ] 
      }
    ],
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Guides',
        collapsed: false,
        items: Guides,
      },
      {
        text: 'Integrations',
        collapsed: false,
        items: Integrations,
      },
      {
        text: 'Examples',
        collapsed: false,
        items: Examples,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/javite-projects/javite' }, 
    ],

    logo: { src: '/duke_wave.svg', width: 24, height: 24 },

    editLink: {
      pattern: 'https://github.com/javite-projects/javite-doc/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PRESENT Benny Yen',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/duke_wave.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/duke_wave.png' }],
    ['meta', { name: 'theme-color', content: '#ff4c4c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'JaVite | Vite-Powered Java Integration' }],
    ['meta', { property: 'og:site_name', content: 'JaVite' }],
    ['meta', { property: 'og:image', content: 'https://javite.com/og.png' }],
    ['meta', { property: 'og:url', content: 'https://javite.com/' }],
  ],
  markdown: {
    codeTransformers: [transformerTwoslash()]
  }
})
