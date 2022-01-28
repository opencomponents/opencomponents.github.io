---
sidebar_position: 1
---

# Getting Started

## Component creation

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
$ oc init hello-world oc-template-jade
```

By default this parameter is set to `oc-template-handlebars`.

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

The template represents view layer of the component. OC support `Handlebars`(via the `oc-template-handlebars`) and `Jade`(via the `oc-template-jade`) out of the box, but it come with a powerful template system to support components built with any javascript UI framework like `React`, `Angular`, `Vue`...|

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

[Advanced server.js operations](The-server.js).

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
