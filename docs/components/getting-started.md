---
sidebar_position: 1
---

# Getting Started

## Prerequisites

Before creating your first component, make sure your workstation meets the [CLI installation requirements](cli.md#installation). If you followed the **Quick-Start Tutorial** you can skip this.

First create the component directory:

```bash
$ oc init hello-world
```

The above command will create the `hello-world` [directory](#component-structure).

It is also possible to set [template](#template) type during the initialisation as an additional init parameter:

```bash
$ oc init hello-world oc-template-es6
```

By default this parameter is set to `oc-template-es6` (modern ES6 templates). Legacy templates like `oc-template-handlebars` are still supported for backwards compatibility.

## Component structure

The basic component directory is composed by the following files:

```
├── hello-world/
    ├── package.json
    ├── src/view.ts
    ├── src/server.ts
    ├── public/
        ├── logo.png
```

- `package.json` contains the component definition, dependencies, and [more](#structure-of-the-package)
- `view.ts` is a [template](#template) containing the markup
- `server.ts` is an optional [file](#basic-server), needed when the component has some logic

Additionally the component can have static contents such as images, js, and files that will be referenced in the html markup and any other files that will be useful for the development such as tests, docs, etc.

### Structure of the package

The basic package file `package.json` looks as follows:

```json
{
  "name": "base-component-es6",
  "description": "",
  "version": "1.0.0",
  "oc": {
    "files": {
      "data": "server.js",
      "static": ["img"],
      "template": {
        "src": "src/view.ts",
        "type": "oc-template-es6"
      }
    },
    "parameters": {
      "name": {
        "default": "Jane Doe",
        "description": "Your name",
        "example": "Jane Doe",
        "mandatory": false,
        "type": "string"
      }
    }
  },
  "devDependencies": {
    "oc-template-handlebars-compiler": "6.0.8"
  }
}
```

[Complete list of package.json parameters](package.json-structure)

## Template

The template represents view layer of the component. OC supports modern `ES6` templates by default, along with `React`, `Vue`, `Svelte`, and other javascript UI frameworks. Legacy templates like `Handlebars` and `Jade` are still supported for backwards compatibility.

Initialisation produces a basic hello-world example.

## Basic server

Server is the entity that produces the view-model to compile the view. It is necessary when component template has logic, including consuming services. The basic version of `server.js` after initialization looks as follows:

```js
export const data = (context, callback) => {
  const { name } = context.params;
  const { staticPath } = context;

  callback(null, {
    name,
    staticPath,
  });
};
```

[Advanced server.js operations](the-server.js).

# Editing, debugging, testing

You may want to start a local test registry using a components' folder as a library with a watcher. This will allow to consume and debug it:

```sh
$ oc dev . 3030
```

Then you may want to create a blank html page to start playing with it and see how it looks:

```html
<html>
  <body>
    <oc-component href="http://localhost:3030/hello-world">
      Optionally, some failover text here
    </oc-component>
    <script src="http://localhost:3030/oc-client/client.js"></script>
  </body>
</html>
```

Or, just use the preview function:

```sh
$ oc preview http://localhost:3030/hello-world
```

That's it. As soon as you make changes on the component, you will be able to refresh this page and see how it looks.

## When to Use Components

OpenComponents are ideal for:

- **Shared UI elements** across multiple applications (headers, footers, navigation)
- **Team independence** where different teams own different parts of the UI
- **Gradual migration** from monolithic to micro frontend architecture
- **A/B testing** individual components without affecting the entire application
- **Third-party integrations** that need to be embedded in multiple sites

## Example Repositories

Explore these example repositories to see OpenComponents in action:

- [OpenComponents Templates](https://github.com/opencomponents/vite-templates) - Modern component templates
- [Storage Adapters](https://github.com/opencomponents/storage-adapters) - Different storage solutions
- [Browser Client](https://github.com/opencomponents/oc-client-browser) - Client-side integration examples

## Troubleshooting Common Issues

- For installation problems, component creation errors, or dev-server hiccups, refer to the in-depth [CLI guide](cli.md#troubleshooting) which contains up-to-date solutions.

## Next Steps

Once you've created your first component:

1. **[Learn the CLI](cli)** - Master all available commands
2. **[Understand package.json structure](package.json-structure)** - Configure your component properly
3. **[Add server-side logic](the-server.js)** - Make your component dynamic
4. **[Publish to a registry](publishing-to-a-registry)** - Share your component
5. **[Explore client-side operations](../consumers/rendering-lifecycle)** - Advanced browser integration

For a complete hands-on tutorial, see our [Quick Start Tutorial](../quick-start-tutorial).
