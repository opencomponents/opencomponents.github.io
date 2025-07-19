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
    'intro',
    'quick-start-tutorial',
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/getting-started',
        'components/cli',
        'components/package.json-structure',
        'components/the-server.js',
        'components/publishing-to-a-registry',
        'components/client-side-operations',
      ],
    },
    {
      type: 'category',
      label: 'Consumers',
      items: [
        'consumers/client-side-rendering',
        'consumers/server-side-rendering',
        'consumers/batch-endpoint',
      ],
    },
    {
      type: 'category',
      label: 'Registry',
      items: [
        'registry/registry-configuration',
        'registry/registry-using-google-storage',
      ],
    },
    {
      type: 'category',
      label: 'Miscellaneous',
      items: [
        'miscellaneous/architecture-overview',
        'miscellaneous/template-system',
        'miscellaneous/debugging',
        'miscellaneous/faq',
      ],
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
