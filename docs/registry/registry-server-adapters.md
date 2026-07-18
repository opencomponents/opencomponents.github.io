# Registry Server Adapters

:::info New feature
Swappable HTTP server adapters are available since **v0.50.58**.
:::

## Overview

The registry's HTTP layer sits behind a neutral `HttpServerAdapter` interface.
By default the registry uses **Express**, exactly as before — nothing changes
if you don't touch the `server` option. But the adapter is now pluggable, so
you can swap in a different HTTP server implementation without the registry
core taking a dependency on it.

The first alternative adapter is [`oc-fastify-server-adapter`](#fastify-adapter---oc-fastify-server-adapter),
which lets a registry run on [Fastify](https://fastify.dev/) instead of
Express.

## Configuration

Add a `server` block to the registry configuration with an `adapter` factory
and its `options`:

```js
const oc = require("oc");

const registry = oc.Registry({
  // regular OC registry options...
  server: {
    adapter: someServerAdapterFactory,
    options: {
      // adapter-specific options
    },
  },
});
```

| Parameter        | Type     | Mandatory | Default                 | Description                                                                 |
| ---------------- | -------- | --------- | ------------------------ | ----------------------------------------------------------------------------- |
| `server`         | object   | no        | Express adapter          | Presence swaps the HTTP server implementation. Absent → Express (default).   |
| `server.adapter` | function | no        | Express adapter factory | Server adapter factory returning an `HttpServerAdapter`.                     |
| `server.options` | object   | no        | `{ port: options.port }` | Options passed to the adapter factory.                                       |

If you omit `server` entirely, or omit `server.adapter`, the registry falls
back to the built-in Express adapter, so this is fully opt-in and non-breaking.

## Fastify adapter - `oc-fastify-server-adapter`

A Fastify implementation of the `HttpServerAdapter` interface.

```sh
npm install oc-fastify-server-adapter fastify
```

`oc` is a peer dependency. Use this adapter with an OC version that exports
the HTTP server adapter types (`>=0.50.58`).

```js
const oc = require("oc");
const createFastifyAdapter = require("oc-fastify-server-adapter").default;

const registry = oc.Registry({
  // regular OC registry options...
  server: {
    adapter: createFastifyAdapter,
    options: {
      host: "0.0.0.0",
      port: 3030,
      trustProxy: true,
    },
  },
});
```

`options.host` defaults to `0.0.0.0`, matching Node/Express `server.listen(port)`
behavior. Set it to `127.0.0.1` or another interface to bind more narrowly.

### Opt-in contract and differences from Express

Because Fastify isn't a drop-in replacement for Express, there are a few
behavioral differences to be aware of before switching:

- `registry.start()` returns a Fastify instance as `app`, not an Express
  application. Code that reaches into `app` must use Fastify APIs.
- `server.httpServer()` and the `{ server }` value returned by
  `registry.start()` are the underlying Node `http.Server`.
- User routes are registered through Fastify's router. OC route patterns such
  as `:param` and `*splat` are normalized, but advanced Express-only route
  syntax is not supported.
- `fromConnect()` supports common Connect middleware, including middleware
  that ends the response without calling `next()`. Middleware that depends on
  Express-specific request/response APIs may still need changes.
- JSON and urlencoded body limits follow the OC/Express configuration. Gzip,
  deflate, and brotli encoded request bodies are inflated before Fastify
  parses them.
- Urlencoded bodies use `qs` parsing to match Express `extended: true`
  semantics. Query strings use Node's `querystring` parser to match Express
  5's simple parser.
- Cookies use OC/Express-style options. `maxAge` is accepted in milliseconds
  and translated to Fastify's seconds-based serializer, with `Path=/` as the
  default. Signed cookies are not supported unless the adapter grows a
  Fastify cookie secret option.
- Multipart uploads are normalized to OC's uploaded file shape. Oversized
  fields return a `LIMIT_FIELD_VALUE`-style 413 instead of silently
  truncating.
- Strong ETags and 304 conditional responses are enabled to match the
  Express registry.
- `OPTIONS` requests are handled by the adapter so OC CORS middleware can
  answer preflight requests. The `Allow` header is scoped to matching routes
  when possible; unmatched `OPTIONS` paths still receive the global adapter
  method set for preflight compatibility.
- Handler errors are rendered by OC's configured error handler. The Fastify
  adapter returns `text/html` error bodies when OC enables the error
  handler, but default Fastify 404/error body shapes can differ from Express
  for requests outside OC routes.
- Non-empty OC route handler chains must eventually send a response. This
  matches existing OC callback-style handlers; empty handler arrays return
  404 defensively.
- Logging uses Fastify response timing, so formatting is not byte-for-byte
  identical to Morgan's Express output.

## Writing a custom server adapter

The registry core has no dependency on Express or Fastify — it only calls the
`HttpServerAdapter` contract. To support another HTTP server, implement a
factory function that returns an object with the same shape used by the
built-in adapters (route registration, body parsing, cookies, file uploads,
request timing, logging, error handling, listen/close, etc.), and pass it as
`server.adapter`. Look at `oc-fastify-server-adapter`'s source for a complete
reference implementation.
