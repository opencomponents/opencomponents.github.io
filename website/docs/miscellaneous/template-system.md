---
sidebar_position: 2
---

# Template system

## Introduction

The template system enable building components with richer client-side libraries. Modern OpenComponents uses ES6 templates by default, with support for React, Vue, Svelte, and other frameworks. Legacy template engines (handlebars and jade) are still supported for backwards compatibility. One of the goal of this API is to make react a first class citizen of OC without having to lock the platform around it but allowing other technologies to be easily swapped in the future if wanted/needed.

Ideally component creators should only care of handling data in order to provide a viewModel within the dataProvider and build the viewLayer using a specific library/fw (i.e. react). The template should hide all the complexity away in order to compile/optimize the client bundle, perform server-side-rendering, and all the related wiring. In order to do so, templates have full access over the whole compilation/packaging phase and provide the information needed for clients to consume and handle such components.

## Using templates

Within the component's `package.json` a template type need to be specified together with its related compiler declared within devDependencies.

> By convention the compiler need to follow the naming structure: **`<template-type>-compiler`**.

For example a component of type: `oc-template-handlebars` will need a compiler named `oc-template-handlebars-compiler` in order to be correctly packaged and published:

```json
...
"oc": {
  "files": {
    "template": {
      "src": "template.hbs",
      "type": "oc-template-handlebars"
    }
  }
},
"devDependencies": {
  "oc-template-handlebars-compiler": "6.0.8"
},
...
```

### With the CLI

The CLI allow to bootstrap a new component with the `init` command. By default if no `templateType` is passed to the command a component of type `oc-template-es6` is created. Optionally you can pass any valid template as long as it follow the conventions mentioned above.

Usage:

```
$ oc init myComponent oc-template-jade  # Legacy template - ES6 recommended for new components
```

Check the [CLI documentation](/docs/components/cli) for more details.

### On the Registry

The registry need to be configured with the templates you want to allow:

```js
const configuration = {
...
templates: [require('oc-template-extra'), require('oc-template-plus')]
...
}
```

Check the [registry configuration guide](/docs/registry/registry-configuration#registry-configuration) for more details.

### Client-side rendering

Client-side rendering is done via the `oc-client.js` library. The library can now be dynamically updated to support client-side rendering of different templates:

via configuration API:

```js
<script> var oc = {
  conf: {
    templates: [
      {
        "type": "oc-template-jade","externals": [  // Legacy template - consider ES6 for new components
          {"global": "jade","url": "https://unpkg.com/jade-legacy@1.11.1/runtime.js"}
        ]
      }
    ]
  }
};
<script src="//registry.components.com/oc-client/client.js"></script>
```

via `registerTemplates()` API:

```js
cons templates = oc.registerTemplates([{
  "type": "custom-react-template",
  "externals": [{
    "global": "React",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"
  }]
}]);
```

Check the [browser client documentation](/docs/components/client-side-operations) for more details.

#### templates exposed in context

As a note, supported templates on the registry are now exposed via `context.templates` on the dataProvider, this allow for example, for components to be able to dynamically configure the browser client. See the [oc-client code](https://github.com/opentable/oc/blob/master/src/components/oc-client/server.js#L4-L5) as an example.

### Server-side rendering

At the moment `oc-template-es6`, `oc-template-react`, and other modern templates support server-side rendering (SSR). Legacy templates (`oc-template-handlebars`, `oc-template-jade`) also support SSR for backwards compatibility.

## Building templates

At the moment OC comes with `oc-template-es6` as the default modern template, with `oc-template-react`, `oc-template-vue`, and `oc-template-svelte` available for framework-specific components. Legacy templates (`oc-template-jade` and `oc-template-handlebars`) are still supported for backwards compatibility. You can fork any of those templates, or simply build your own from scratch in case you need a custom template. Please check the following templates as a reference:

- [oc-template-es6](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-es6) (recommended default)
- [oc-template-jade](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-jade) (legacy)
- [oc-template-handlebars](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-handlebars) (legacy)
- [oc-template-react](https://github.com/opencomponents/oc-template-react)
