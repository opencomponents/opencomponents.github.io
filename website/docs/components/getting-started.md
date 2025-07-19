---
sidebar_position: 1
---

# Getting Started

## Prerequisites

Before creating your first component, ensure you have:

- **Node.js** (version 20 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Basic familiarity with npm commands
- **Basic JavaScript knowledge** - Understanding of functions, objects, and modules
- **Command line familiarity** - Ability to navigate directories and run commands

**New to OpenComponents?** Consider starting with our [Quick Start Tutorial](../quick-start-tutorial) for a complete step-by-step guide.

## Component Creation

To create a component you need to install oc with a command:

```bash
$ npm install oc -g
```

The next step is to initialise a component:

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
    ├── template.hbs
    ├── server.js
    ├── img/
        ├── logo.png
```

- `package.json` contains the component definition, dependencies, and [more](#structure-of-the-package)
- `template.hbs` is a [template](#template) containing the markup
- `server.js` is an optional [file](#basic-server), needed when the component has some logic

Additionally the component can have static contents such as images, js, and files that will be referenced in the html markup and any other files that will be useful for the development such as tests, docs, etc.

### Structure of the package

The basic package file `package.json` looks as follows:

```json
{
  "name": "base-component-handlebars",
  "description": "",
  "version": "1.0.0",
  "oc": {
    "files": {
      "data": "server.js",
      "static": ["img"],
      "template": {
        "src": "template.hbs",
        "type": "oc-template-handlebars"
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

### Installation Problems

**Problem**: Permission errors when installing globally

```bash
# Solution: Use sudo (macOS/Linux) or run as administrator (Windows)
sudo npm install oc -g
```

**Problem**: `oc` command not found after installation

```bash
# Check if npm global bin is in your PATH
npm config get prefix
# Add {prefix}/bin to your PATH environment variable
```

### Component Creation Issues

**Problem**: `oc init` fails with template errors

```bash
# Solution: Specify template explicitly (ES6 is default)
oc init hello-world oc-template-es6
```

**Problem**: Component won't start with `oc dev`

```bash
# Solution: Install dependencies first
cd hello-world
npm install
oc dev . 3030
```

### Development Server Issues

**Problem**: Port already in use

```bash
# Solution: Use a different port
oc dev . 3031
```

**Problem**: Component shows "Loading..." forever

- Check browser console for JavaScript errors
- Verify the registry URL is accessible
- Ensure component syntax is valid

### Template Compilation Errors

**Problem**: Template syntax errors

- For ES6 templates: Validate your template literal syntax and ensure the function returns valid HTML
- For legacy Handlebars templates: Validate template syntax and check for missing variables in server.js
- Check for missing variables in server.js

**Problem**: Server.js runtime errors

- Check the server.js syntax
- Verify all required parameters are handled
- Add error handling in your data function

## Next Steps

Once you've created your first component:

1. **[Learn the CLI](cli)** - Master all available commands
2. **[Understand package.json structure](package.json-structure)** - Configure your component properly
3. **[Add server-side logic](the-server.js)** - Make your component dynamic
4. **[Publish to a registry](publishing-to-a-registry)** - Share your component
5. **[Explore client-side operations](client-side-operations)** - Advanced browser integration

For a complete hands-on tutorial, see our [Quick Start Tutorial](../quick-start-tutorial).
