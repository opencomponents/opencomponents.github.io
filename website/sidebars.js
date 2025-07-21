/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    "intro",
    "quick-start-tutorial",
    {
      type: "category",
      label: "Introduction & Concepts",
      items: ["concepts/why-opencomponents", "concepts/architecture-overview"],
    },
    {
      type: "category",
      label: "Building Components",
      items: [
        "components/getting-started",
        "building/template-system",
        "components/package.json-structure",
        "components/the-server.js",
        "components/cli",
        "building/debugging",
      ],
    },
    {
      type: "category",
      label: "Publishing & Registry",
      items: [
        "components/publishing-to-a-registry",
        "registry/registry-configuration",
        "registry/registry-using-google-storage",
      ],
    },
    {
      type: "category",
      label: "Consuming Components",
      items: [
        "consumers/client-setup",
        "consumers/client-api",
        "consumers/rendering-lifecycle",
        "consumers/events-hooks",
        "consumers/client-side-rendering",
        "consumers/server-side-rendering",
        "consumers/batch-endpoint",
      ],
    },
    {
      type: "category",
      label: "Reference & FAQ",
      items: ["reference/faq"],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
