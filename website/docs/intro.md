---
sidebar_position: 1
---

# Introduction

OpenComponents is a framework for building and deploying **micro frontends** - small, independent, and reusable UI components that can be developed by different teams and composed into larger applications.

## Target Audience

OpenComponents is built for **companies with multiple autonomous teams** that ship UI independently. If you’re a solo developer, this approach may be over-engineering.

## What is OpenComponents?

Think of OpenComponents as a way to break down your frontend into small, manageable pieces that can be:

- **Developed independently** by different teams
- **Deployed separately** without affecting other parts
- **Reused across** multiple applications
- **Updated individually** without full application rebuilds

## Quick Start

**New to OpenComponents?** Start with our [Quick Start Tutorial](quick-start-tutorial) for a complete step-by-step guide.

**Ready to dive in?** Here's the 30-second overview:

```bash
# Install the CLI
npm install -g oc

# Create your first component
oc init my-component

# Start local development
oc dev . 3030

# View your component
open http://localhost:3030/my-component/~preview
```

## Core Concepts

OpenComponents involves two main parts:

- **[Components](#components-management)** are small units of isomorphic code mainly consisting of HTML, JavaScript, and CSS. They can optionally contain some logic, allowing a server-side Node.js application to compose a model that is used to render the view. After rendering they are pieces of pure HTML to be injected in any HTML page.
- **[Consumers](#consuming-components)** are websites or microsites ([small independently deployable web sites all connected by a front-door service or any routing mechanism](http://tech.opentable.co.uk/blog/2015/02/09/dismantling-the-monolith-microsites-at-opentable/)) that need components for rendering partial contents in their web pages.

## Architecture Overview

The framework consists mainly of three parts:

- The **[CLI](#install-the-cli)** allows developers to create, develop, test, and publish components.
- The **[Library](#setup-a-library)** is where the components are stored after publishing. When components depend on static resources (such as images, CSS files, etc.) these are stored, during packaging and publishing, in a publicly-exposed part of the library that serves as CDN.
- The **[Registry](#setup-a-registry)** is a REST API that is used to consume, retrieve, and publish components. Since they are immutable, the registry is the entity that handles the traffic between the library and the consumers.

For a detailed technical overview, see our [Architecture Overview](concepts/architecture-overview).

## Components management

A component is a directory composed by

| File                     | Description                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `package`                | The component definition, dependencies, and more.                                                                                                                                                                                                                                                                  |
| `view`                   | The view in charge to output the final markup. OC uses `ES6` templates by default and comes with a powerful template system to support components built with any javascript UI framework like `React`, `SolidJS`, `Vue`. Legacy `Handlebars` and `Jade` templates are still supported for backwards compatibility. |
| `server` (optional)      | If the component need logic, including consuming services, this is the entity that will produce the view-model to compile the view.                                                                                                                                                                                |
| static assets (optional) | Images, Javascript, and files to be uploaded to the CDN and referenced in the HTML markup.                                                                                                                                                                                                                         |
| \*                       | Any other files that will be useful for the development such as tests, docs, etc.                                                                                                                                                                                                                                  |

After publishing, components are immutable and semantic versioned.

[Getting started with components](/docs/components/getting-started)

[Working on the server](/docs/components/the-server.js)

## Creation

To create a folder containing the component:

```sh
npm install oc -g
oc init hello-world
```

## Editing, debugging, testing

To start a local test registry using a components' folder as a library with a watcher:

```sh
oc dev . 3030
```

To see how the component looks like when consuming it:

```sh
oc preview http://localhost:3030/hello-world
```

As soon as you make changes on the component, you will be able to refresh this page and see how it looks.

## Publishing to a registry

You will need an online registry connected to a library. A component with the same name and version cannot already exist on that registry.

```sh
# you have to do the registry config first, just once
oc registry add http://my-components-registry.mydomain.com

# then, ship it
oc publish hello-world/
```

Now, it should be available at `http://my-components-registry.mydomain.com/hello-world`.

# Consuming Components

From a consumer's perspective, a component is an HTML fragment. You can render components just on the client-side, just on the server-side, or use the client-side rendering as failover strategy for when the server-side rendering fails (for example because the registry is not responding quickly or is down).

You don't need Node.js to consume components on the server-side. The registry can provide you rendered components so that you can consume them using any tech stack.

When published, components are immutable and semantic versioned. The registry allows consumers to get any version of the component: the latest patch, or minor version, etc.

**When to use OpenComponents:**

- Building micro frontends with multiple teams
- Need for independent deployment of UI components
- Sharing components across different applications
- Gradual migration from monolithic frontends

## Client-side rendering

To make this happen, your components registry has to be publicly available.
This is all you need:

```html
<html>
  <head></head>
  <body>
    <oc-component
      href="http://my-components-registry.mydomain.com/hello-world/1.X.X"
    ></oc-component>
    <script src="http://my-components-registry.mydomain.com/oc-client/client.js"></script>
  </body>
</html>
```

For more information about client-side operations, look at [this page](/docs/consumers/rendering-lifecycle).

## Server-side rendering

You can get rendered components via the registry rest api.

```sh
curl http://my-components-registry.mydomain.com/hello-world

{
  "href": "https://my-components-registry.mydomain.com/hello-world",
  "version": "1.0.0",
  "requestVersion": "",
  "html": "<oc-component href=\"https://my-components-registry.mydomain.com/hello-world\" data-hash=\"cad2a9671257d5033d2abfd739b1660993021d02\" id=\"2890594349\" data-rendered=\"true\" data-version=\"1.0.13\">Hello John doe!</oc-component>",
  "type": "oc-component",
  "renderMode": "rendered"
}
```

Nevertheless, for improving caching and response size, when using the `node.js` client or any language capable of executing server-side javascript the request will look more like:

```sh
 curl http://my-components-registry.mydomain.com/hello-world/~1.0.0 -H Accept:application/vnd.oc.unrendered+json

{
  "href": "https://my-components-registry.mydomain.com/hello-world/~1.0.0",
  "version": "1.0.0",
  "requestVersion": "~1.0.0",
  "data": {
    "name": "John doe"
  },
  "template": {
    "src": "https://s3.amazonaws.com/your-s3-bucket/components/hello-world/1.0.0/template.js",
    "type": "es6",
    "key": "cad2a9671257d5033d2abfd739b1660993021d02"
  },
  "type": "oc-component",
  "renderMode": "unrendered"
}
```

In this case you get the compiled view + the data, and you can do the rendering, eventually, interpolating the view-model data and rendering the compiled view with it.

When retrieving multiple components, a [batch POST endpoint](/docs/consumers/batch-endpoint) allows to make a single request to the API.

- [Javascript browser client](https://github.com/opencomponents/oc-client-browser)
- [Javascript Node.js client](https://github.com/opencomponents/oc-client-node)
- [PHP client](https://github.com/opencomponents/oc-client-php)
- [Ruby client](https://github.com/opencomponents/ruby-oc)
- [Rails client](https://github.com/opencomponents/opencomponents-rails)
- [Sinatra client](https://github.com/opencomponents/sinatra-opencomponents)

### Install the CLI

See the dedicated [CLI guide](components/cli#install-the-cli) for installation, shell-autocomplete, and update instructions.

# Setup a library

See detailed guides for:

- [S3 library adapter](registry/registry-configuration#s3)
- [Google Cloud Storage adapter](registry/registry-using-google-storage)

# Setup a registry

A full configuration reference and production-ready examples live in [Registry Configuration](registry/registry-configuration). Start there when you need to spin up your first registry.

## What Should I Read Next?

**Choose your path based on your role:**

### 🚀 **I'm new to OpenComponents**

Start with the [Quick Start Tutorial](quick-start-tutorial) for a complete hands-on introduction.

### 🔧 **I want to build components**

1. [Components Getting Started](components/getting-started) - Learn component creation
2. [CLI Reference](components/cli) - Master the command-line tools
3. [Server-side Logic](components/the-server.js) - Add dynamic behavior

### 🌐 **I want to consume components**

1. [Client-side Rendering](consumers/client-side-rendering) - Browser integration
2. [Server-side Rendering](consumers/server-side-rendering) - Backend integration
3. [Batch Endpoint](consumers/batch-endpoint) - Efficient multi-component loading

### ⚙️ **I need to set up infrastructure**

1. [Registry Configuration](registry/registry-configuration) - Set up your component registry
2. [Architecture Overview](concepts/architecture-overview) - Understand the system design

### 🔍 **I need help with specific topics**

- [FAQ](reference/faq) - Common questions and answers
- [Debugging](building/debugging) - Troubleshooting guide
- [Template System](building/template-system) - Advanced templating options
