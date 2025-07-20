---
sidebar_position: 2
---

# OC Client – Installation & Setup

`oc-client` is the browser runtime that discovers `<oc-component>` tags and renders them. This page explains how to include the script, initialise it safely, and configure global settings.

## Including the script

The client is itself an OC component served by every registry. Load it with a protocol-relative URL so that it automatically uses HTTP or HTTPS depending on your site:

```html
<!-- Always served at the same version as your registry -->
<script src="//your-registry.company.com/oc-client/client.js"></script>
```

**Best practice:** Place the tag just before the closing `</body>`. On load the client scans the DOM and immediately calls `oc.renderUnloadedComponents()`. If you inject the script _before_ your components, simply call that function yourself once the client is ready.

## Safe initialisation pattern

```js
window.oc = window.oc || {};
oc.cmd = oc.cmd || [];
oc.cmd.push(function (oc) {
  // This runs after the client is fully ready
  console.log("OC version:", oc.clientVersion);
});
```

Use the `cmd` queue whenever you’re not sure if the script has finished loading yet (for example in single-page apps or when dynamically injecting the client).

## Configuration reference

Expose the `conf` object _before_ the script tag to override defaults:

```html
<script>
  var oc = {
    conf: {
      debug: true,
      retryInterval: 2000,
      globalParameters: { userId: "123" },
    },
  };
</script>
<script src="//your-registry.company.com/oc-client/client.js"></script>
```

### All options

| Key                 | Type                 | Default                       | Description                                    |
| ------------------- | -------------------- | ----------------------------- | ---------------------------------------------- |
| `debug`             | `boolean`            | `false`                       | Console logging for troubleshooting            |
| `disableLifecycles` | `boolean`            | `false`                       | Turn off automatic lifecycle handling          |
| `disableLoader`     | `boolean`            | `false`                       | Hide the loading message                       |
| `globalHeaders`     | `object \| function` | –                             | Headers to include on every request            |
| `globalParameters`  | `object`             | `{}`                          | Query-string params added to every component   |
| `loadingMessage`    | `string`             | `""`                          | Text displayed while fetching                  |
| `pollingInterval`   | `number`             | `500`                         | Interval (ms) for status checks                |
| `retryInterval`     | `number`             | `5000`                        | Wait time (ms) between retries                 |
| `retryLimit`        | `number`             | `30`                          | Max retries before giving up                   |
| `retrySendNumber`   | `boolean`            | `true`                        | Append `__ocRetry` counter to requests         |
| `tag`               | `string`             | `oc-component`                | Custom element name                            |
| `templates`         | `array`              | ES6 & common legacy templates | Template definitions for client-side rendering |

### Template configuration example

Modern components built with ES6 templates need no extra configuration. Legacy templates _do_ require runtimes:

```js
var oc = {
  conf: {
    templates: [
      {
        type: "oc-template-handlebars",
        externals: [
          {
            global: "Handlebars",
            url: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.runtime.min.js",
          },
        ],
      },
    ],
  },
};
```

That’s it! Continue with [OC Client API](/docs/consumers/client-api) for day-to-day usage or jump to [Rendering Lifecycle](/docs/consumers/rendering-lifecycle) to understand what happens in the browser.
