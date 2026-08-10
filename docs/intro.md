# Introduction

OpenComponents is a language-agnostic micro frontend framework: it lets independent teams build, publish, and version UI components as isomorphic HTML/CSS/JS bundles, and lets *any* backend (Node.js, .NET, PHP, Java, Go, ...) render and consume them over a simple HTTP + HTML contract.

New to the project? Read [Why OpenComponents?](concepts/why-opencomponents) for the motivation, or jump straight into the [Quick Start Tutorial](quick-start-tutorial) to build your first component.

## The pieces

- **Component** – a small, versioned bundle of view + optional server logic. See [Building Components](building/getting-started).
- **Registry** – the REST API that stores, versions, and serves components. See [Registry Configuration](registry/registry-configuration).
- **Library** – the storage backend (S3, Google Cloud Storage, Azure, ...) the registry uses to persist published components.
- **Client** – the browser/Node.js/PHP/Ruby runtime that discovers and renders components. See [Consuming Components](consumers/client-setup).

## 30-second start

```bash
# Install the CLI
npm install -g oc

# Create your first component
oc init my-component

# Start a local dev registry and preview it
oc dev . 3030
open http://localhost:3030/my-component/~preview
```

For the full walkthrough — creating, developing, publishing, and consuming a component — see the [Quick Start Tutorial](quick-start-tutorial).

## Where to go next

| I want to... | Go to |
| --- | --- |
| Understand why OC exists and when to use it | [Why OpenComponents?](concepts/why-opencomponents) |
| See how the pieces fit together | [Architecture Overview](concepts/architecture-overview) |
| Build a component | [Building Components](building/getting-started) |
| Consume components in an app | [Consuming Components](consumers/client-setup) |
| Set up a registry | [Registry Configuration](registry/registry-configuration) |
| Find answers to common questions | [FAQ](reference/faq) |
