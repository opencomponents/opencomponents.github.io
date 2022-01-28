---
sidebar_position: 1
---

# Introduction

OpenComponents involves two parts:

- The [`components`](#components-management) are small units of isomorphic code mainly consisting of html, javascript, css. They can optionally contain some logic, allowing a server-side node.js application to compose a model that is used to render the view. After rendering they are pieces of pure html to be injected in any html page.
- The [`consumers`](#consuming-components) are websites or microsites ([small independently deployable web sites all connected by a front-door service or any routing mechanism](http://tech.opentable.co.uk/blog/2015/02/09/dismantling-the-monolith-microsites-at-opentable/)) that need components for rendering partial contents in their web pages.

The framework consists mainly of three parts.

- The [`cli`](#install-the-cli) allows developers to create, develop, test, and publish components.
- The [`library`](#setup-a-library) is where the components are stored after the publishing. When components depend on static resources (such as images, css files, etc.) these are stored, during packaging and publishing, in a publicly-exposed part of the library that serves as cdn.
- The [`registry`](#setup-a-registry) is a rest api that is used to consume, retrieve, and publish components. Since they are immutable, the registry is the entity that handles the traffic between the library and the consumers.

## Components management

A component is a directory composed by

| File                     | Description                                                                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `package`                | The component definition, dependencies, and more.                                                                                                                                                                                         |
| `view`                   | The view in charge to output the final markup. OC support `Handlebars` and `Jade` out of the box, but come with a powerful template system to support components built with any javascript UI framework like `React`, `Angular`, `Vue`... |
| `server` (optional)      | If the component need logic, including consuming services, this is the entity that will produce the view-model to compile the view.                                                                                                       |
| static assets (optional) | Images, Javascript, and files to be uploaded to the CDN and referenced in the HTML markup.                                                                                                                                                |
| \*                       | Any other files that will be useful for the development such as tests, docs, etc.                                                                                                                                                         |

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

# Consuming components

From a consumer's perspective, a component is an HTML fragment. You can render components just on the client-side, just on the server-side, or use the client-side rendering as failover strategy for when the server-side rendering fails (for example because the registry is not responding quickly or is down).

You don't need node.js to consume components on the server-side. The registry can provide you rendered components so that you can consume them using any tech stack.

When published, components are immutable and semantic versioned. The registry allows consumers to get any version of the component: the latest patch, or minor version, etc.

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

For more information about client-side operations, look at [this page](/docs/components/client-side-operations).

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
    "type": "handlebars",
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

# Install the cli

```sh
npm install oc -g
# to see available commands:
oc
```

# Setup a library

At the moment the only supported libraries are Amazon S3 & Google Storage.

- S3 - Create an account and for S3 get the API credentials; you will need them while setting up the registry.
- Google Storage - Create an account and setup your [gcloud](https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version) cli.

# Setup a registry

The registry is a node.js express app that serves the components. You can have multiple registries connected to a library, but you can't have multiple libraries connected to a registry.
First, create a dir and install oc:

```sh
mkdir oc-registry && cd oc-registry
npm init
npm install oc --save
```

For Google Storage registry configuration's documentation, [look at this page](/docs/registry/registry-using-google-storage).

Then on the entry point, what you need on an `index.js` file is:

```js
var oc = require("oc");

var configuration = {
  verbosity: 0,
  baseUrl: "https://my-components-registry.mydomain.com/",
  port: 3000,
  tempDir: "./temp/",
  refreshInterval: 600,
  pollingInterval: 5,
  s3: {
    key: "your-s3-key",
    secret: "your-s3-secret",
    bucket: "your-s3-bucket",
    region: "your-s3-region",
    path: "//s3.amazonaws.com/your-s3-bucket/",
    componentsDir: "components",
  },
  env: { name: "production" },
};

var registry = oc.Registry(configuration);

registry.start(function (err, app) {
  if (err) {
    console.log("Registry not started: ", err);
    process.exit(1);
  }
});
```

For the registry configuration's documentation, [look at this page](/docs/registry/registry-configuration).
