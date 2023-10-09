import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";


const getSideBar = (): any => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "docs",
      //scanStartPath: 'api',
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true,
    },
  ]);
  return generatedSidebar ?? [];
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "node-zendesk",
  description: "A Zendesk API client wrapper",
  //base: "/node-zendesk/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/Node_Zendesk_logo.svg',
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API Example", link: "/code/README" },
    ],

    sidebar: getSideBar(),
    outline: { level: [2, 6] },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/blakmatrix/node-zendesk' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2012-present | Made by Farrin A. Reid with ❤️'
    },
  }
})
