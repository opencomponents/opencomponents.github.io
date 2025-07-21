---
sidebar_position: 1
---

# Why OpenComponents?

> A pragmatic, language-agnostic approach to micro-frontends for organisations where multiple autonomous teams own different parts of the UI.

## Key Benefits

1. **Server-side rendering without Node on your edge**  
   The OC Registry (a lightweight Node service) can render components and return ready-to-inject HTML to any host—C#, PHP, Java, Go… This decouples consumer stacks from JavaScript runtimes while still delivering SSR, SEO, and fast first paint.

2. **Immutable, semantically versioned artifacts**  
   Each publish creates a new, immutable version (`my-header/1.4.2`). Consumers select a range (`1.x.x`, `~1.4.0`) at runtime, enabling safe rollbacks and deterministic builds.

3. **True team autonomy**  
   Components live in separate repos, pipelines, and deploy schedules. The registry is the only contract—no shared monorepo or Webpack configuration required.

4. **Built-in CDN offload**  
   Static assets (JS, CSS, images) are automatically pushed to the configured storage adapter (S3, GCS, Azure Blob). Consumers fetch a single optimized URL.

5. **Framework-agnostic templates**  
   ES6 by default, with first-class support for React, Vue, Svelte, or custom renderers.

6. **Language-agnostic consumption**  
   Because the contract is plain HTTP + HTML, any backend or CMS can compose pages with OpenComponents, making it ideal for brownfield or polyglot environments.

## Feature Comparison

| Capability                  | OpenComponents             | Module Federation (Webpack) |
| --------------------------- | -------------------------- | --------------------------- |
| **SSR on non-Node host**    | ✅ via Registry            | ❌ Node required            |
| **Runtime version pinning** | ✅ `my-comp/1.x.x`         | ⚠️ Bundled at build time    |
| **Ecosystem lock-in**       | None (plain HTTP)          | Webpack-specific            |
| **Static asset CDN**        | Built-in upload            | External setup              |
| **Team independence**       | Separate repos & pipelines | Shared build config         |

## When to Choose OpenComponents

- Your organisation runs mixed stacks (e.g., .NET, Java, PHP) but wants shared micro-frontends.
- You need deterministic, semver-based rollout and rollback mechanisms.
- Each squad should deploy UI independently without a central build.
- SEO or performance goals require SSR, but migrating your main app to Node is not an option.

## Learn More

- [Architecture Overview](./architecture-overview.md)
- [Quick-Start Tutorial](/docs/quick-start-tutorial)
