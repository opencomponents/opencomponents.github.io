---
sidebar_position: 1
---

# Introduction

<div className="hero-section">

## Build, Deploy, and Scale Micro Frontends with Independent Teams

OpenComponents is a **powerful, language-agnostic micro frontend framework** that enables teams to develop, test, and deploy UI components independently while composing them into cohesive applications.

**Break free from monolithic frontends.**

</div>

<div className="value-props">

  <div className="value-prop-card">
    <span className="value-prop-card-icon">🚀</span>
    <div className="value-prop-card-content">
      <div className="value-prop-card-title">Team Independence</div>
      <div className="value-prop-card-desc">Develop components with your preferred tech stack while maintaining seamless integration across your organization.</div>
    </div>
  </div>

  <div className="value-prop-card">
    <span className="value-prop-card-icon">⚡</span>
    <div className="value-prop-card-content">
      <div className="value-prop-card-title">Server-Side Rendering Anywhere</div>
      <div className="value-prop-card-desc">Get SSR benefits without Node.js on your edge - works with C#, PHP, Java, Go, and any backend stack.</div>
    </div>
  </div>

  <div className="value-prop-card">
    <span className="value-prop-card-icon">🔒</span>
    <div className="value-prop-card-content">
      <div className="value-prop-card-title">Immutable & Versioned</div>
      <div className="value-prop-card-desc">Semantic versioning with immutable artifacts ensures safe rollbacks and deterministic deployments.</div>
    </div>
  </div>

  <div className="value-prop-card">
    <span className="value-prop-card-icon">🌐</span>
    <div className="value-prop-card-content">
      <div className="value-prop-card-title">Language Agnostic</div>
      <div className="value-prop-card-desc">Consume components from any backend or CMS using simple HTTP + HTML contracts.</div>
    </div>
  </div>

</div>

## Quick Start

<div className="quick-start-options">

### 🆕 **New to OpenComponents?**

Start with our [**Quick Start Tutorial**](quick-start-tutorial) for a complete hands-on introduction.

### ⚡ **Ready to dive in?**

Get up and running in 30 seconds:

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

</div>

## Core Concepts

<div className="concept-cards">

<div className="concept-card">

### 🧩 **Components**

Small units of isomorphic code consisting of HTML, JavaScript, and CSS. Components can include server-side logic for data fetching and model composition, rendering to pure HTML for injection into any page.

[Learn about Components →](components/getting-started)

</div>

<div className="concept-card">

### 🌐 **Registry**

A REST API that handles component consumption, retrieval, and publishing. The registry manages immutable, versioned components and serves as the central contract between producers and consumers.

[Explore Registry Setup →](registry/registry-configuration)

</div>

<div className="concept-card">

### 📦 **Library & CDN**

Centralized storage for published components with automatic CDN distribution for static assets (images, CSS, JavaScript). Ensures fast, global delivery of component resources.

[Setup Library →](registry/registry-configuration#s3)

</div>

<div className="concept-card">

### 🛠️ **CLI Tools**

Powerful command-line interface for creating, developing, testing, and publishing components. Includes local development server with hot reloading and component preview capabilities.

[CLI Reference →](components/cli)

</div>

</div>

## Why Choose OpenComponents?

<div className="why-oc-list-section">
  <div style={{fontWeight: 700, color: 'var(--ifm-color-primary)', fontSize: '1.1rem', marginBottom: '0.5rem'}}>
    <span style={{fontSize: '1.3rem', marginRight: '0.5rem'}}>✅</span> Perfect For:
  </div>
  <ul className="why-oc-list">
    <li>
      <span className="why-oc-list-icon">🖥️</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Mixed technology organizations</span> <span className="why-oc-list-desc">- .NET, Java, PHP backends with JavaScript frontends</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">📝</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Large-scale applications</span> <span className="why-oc-list-desc">- Multiple teams, complex deployment requirements</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">🎯</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">SEO-critical applications</span> <span className="why-oc-list-desc">- E-commerce, content sites, marketing pages</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">🔄</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Gradual modernization</span> <span className="why-oc-list-desc">- Migrating from legacy systems without big-bang rewrites</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">🌐</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Multi-brand platforms</span> <span className="why-oc-list-desc">- Shared components across different properties</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">⚡</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Performance-critical applications</span> <span className="why-oc-list-desc">- Need for server-side rendering and CDN optimization</span>
      </div>
    </li>
  </ul>
</div>
<div className="why-oc-list-section">
  <div style={{fontWeight: 700, color: 'var(--ifm-color-primary)', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem 0'}}>
    <span style={{fontSize: '1.3rem', marginRight: '0.5rem', color: '#e53935'}}>❌</span> Not Ideal For:
  </div>
  <ul className="why-oc-list">
    <li>
      <span className="why-oc-list-icon">🔒</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Highly coupled monoliths</span> <span className="why-oc-list-desc">- Projects that require tight integration and single-stack deployments</span>
      </div>
    </li>
    <li>
      <span className="why-oc-list-icon">🚫</span>
      <div className="why-oc-list-content">
        <span className="why-oc-list-title">Single-team, small projects</span> <span className="why-oc-list-desc">- Simpler architectures may be more efficient</span>
      </div>
    </li>
  </ul>
</div>

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

From a consumer's perspective, a component is an HTML fragment. You can render components **client-side, server-side, or fall back to client-side rendering** when server-side rendering fails (for example, if the registry is slow or unavailable).

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

<div className="next-steps-grid">

<div className="next-step-card primary">

### 🚀 **I'm new to OpenComponents**

Get started with a complete hands-on introduction that covers all the basics.

[**Start Tutorial →**](quick-start-tutorial)

</div>

<div className="next-step-card">

### 🧠 **Understand the Concepts**

Learn why OpenComponents exists and how it compares to other solutions.

[**Core Concepts →**](concepts/why-opencomponents)

</div>

<div className="next-step-card">

### 🔧 **Build Components**

Create your first component and learn development workflows.

**Start here:**

- [Getting Started](components/getting-started)
- [CLI Reference](components/cli)
- [Server Logic](components/the-server.js)

</div>

<div className="next-step-card">

### 🌐 **Consume Components**

Integrate components into your applications and websites.

**Integration guides:**

- [Client-side Rendering](consumers/client-side-rendering)
- [Server-side Rendering](consumers/server-side-rendering)
- [Batch Loading](consumers/batch-endpoint)

</div>

<div className="next-step-card">

### ⚙️ **Setup Infrastructure**

Deploy registries and configure production environments.

**Infrastructure:**

- [Registry Configuration](registry/registry-configuration)
- [Architecture Overview](concepts/architecture-overview)

</div>

<div className="next-step-card">

### 🔍 **Get Help**

Find answers to common questions and troubleshooting guides.

**Support resources:**

- [FAQ](reference/faq)
- [Debugging Guide](building/debugging)
- [Template System](building/template-system)

</div>

</div>
