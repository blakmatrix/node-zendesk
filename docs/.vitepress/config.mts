import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "node-zendesk",
  description: "A Zendesk API client wrapper",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/Node_Zendesk_logo.svg',
    github: 'blakmatrix/node-zendesk',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'API',
        link: '/api/'
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/blakmatrix/node-zendesk' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2012-present | Made by Farrin A. Reid with ❤️'
    },
  }
})
