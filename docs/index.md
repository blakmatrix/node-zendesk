---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "node-zendesk"
  text: "A Zendesk API client wrapper"
  tagline: <strong>Power Up Zendesk:</strong> A robust wrapper for seamless API interactions.
  actions:
    - theme: brand
      text: Guide
      link: /guide/
    - theme: alt
      text: API Examples
      link: /code/README
  image:
    src: /Node_Zendesk_logo.svg
    alt: node-zendesk logo

features:
  - icon: 🌍
    title: Seamless Integration with Zendesk
    details: Elevate your apps with <code>node-zendesk</code>. Seamlessly and efficiently connect your applications with Zendesk's vast suite of customer service and engagement products. Our library is purpose-built to tap into Zendesk's APIs without a hiccup.
    link: "https://developer.zendesk.com/rest_api/docs/core/introduction"
    linkText: "Zendesk's documentation"
  - icon: ⚡️
    title: Modern and Lightweight
    details: Built with the modern developer in mind, <code>node-zendesk</code> is lightweight and optimized for performance. Experience rapid setup and minimal overhead, with top-notch support for both JavaScript and TypeScript.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-178.3 659.6 1000 700"><path fill="#E271A5" d="M-16.2 828L124 1004l140.2-176H277l-146.8 184.2L273 1191.3h-12.8L124 1020.4l-136.1 170.9h-13.3l142.8-179.1L-29.5 828h13.3z"/><path fill="#64D8C7" d="M334.8 1009.6c0-96.7 73.7-184.2 169.4-184.2 100.3 0 168.9 93.6 168.9 184.2 0 97.2-73.7 182.7-168.9 184.2-100.3-3-169.4-91-169.4-184.2zm169.4 174c94.7 0 158.6-88.5 158.6-174 0-90.6-68.6-174-158.6-174-94.7 0-159.1 88-159.1 174 2.5 90.6 67 174 159.1 174z"/><path fill="#D5EFEA" d="M533.5 970.6c6.8 0 14.1 4.8 18.1 11.9 4.5 7.9 4.5 17.5-.2 27-8.4 17.1-39.6 34.4-47.6 38.6-8-4.2-39.2-21.5-47.6-38.6-4.7-9.5-4.7-19.1-.2-27 4.1-7.1 11.4-11.9 18.1-11.9 15 0 26 14.7 26.1 14.9l3.5 4.8 3.5-4.8c.3-.2 11.2-14.9 26.3-14.9m0-4.7c-17.5 0-29.6 16.7-29.6 16.7s-12.2-16.7-29.7-16.7c-15.8 0-34.3 20.6-21.9 45.9 10.4 21.2 51.5 41.7 51.5 41.7s41.1-20.5 51.5-41.7c12.5-25.3-6-45.9-21.8-45.9z"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></path></svg>
    title: "Extensive Linting with <code>xo</code>"
    details: "No more bikeshedding about code styles. <code>node-zendesk</code> adopts the <code>xo</code> package, ensuring code is always in its best shape. Benefit from built-in linting that covers almost all coding scenarios and integrates seamlessly with many editors."
    link: https://github.com/xojs/xo/tree/main#editor-plugins
    linkText: "Learn about xo's editor plugins"
  - icon: 🤝
    title: "Active Community and Transparent Development"
    details: "With <code>node-zendesk</code>, you're never coding alone. Join an active community of developers, get swift answers to queries, and enjoy the benefits of open and transparent development. We value every contributor, and our maintenance is a labor of love."
    link: https://github.com/blakmatrix/node-zendesk/blob/master/CONTRIBUTING.md
    linkText: "Contribute to node-zendesk"


---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>