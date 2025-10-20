---
sidebar_position: 3
---

# OC Client API & Advanced Usage

This page documents the JavaScript API exposed by the OC browser client and shows how to leverage advanced features such as global parameters, headers, custom templates and actions.

## Core API methods

### oc.addStylesToHead(styles)

Inject CSS into the page head.

```js
oc.addStylesToHead(".banner { background: teal; }");
```

### oc.build(options)

Return an `<oc-component>` tag string you can inject in HTML.

```js
const html = oc.build({
  baseUrl: "//registry.com",
  name: "user-profile",
  version: "~1.x.x",
  parameters: { userId: 42 },
});
```

### oc.ready(callback)

Execute code once the client has finished boot-strapping:

```js
oc.ready(function () {
  console.log("Client ready");
});
```

### oc.renderUnloadedComponents()

Scan the DOM for unloaded components and render them. Useful after injecting HTML dynamically.

### oc.renderNestedComponent(element, callback)

Render a single component tag in isolation.

### oc.getData / oc.getAction

Fetch data or trigger an action without rendering:

```js
oc.getData(
  {
    baseUrl: "//registry.com",
    name: "user-data",
    version: "1.0.0",
    parameters: { userId: 42 },
  },
  console.log
);
```

## Global configuration helpers

### Parameters & Headers

```js
var oc = {
  conf: {
    globalParameters: { locale: "en-US" },
    globalHeaders: function () {
      return { Authorization: "Bearer " + getToken() };
    },
  },
};
```

### Retry strategy

```js
var oc = { conf: { retryInterval: 3000, retryLimit: 5 } };
```

## Registering additional templates

```js
oc.registerTemplates([
  {
    type: "vue-template",
    externals: [
      {
        global: "Vue",
        url: "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js",
      },
    ],
  },
]);
```

## Complete in-browser example

```html
<div id="dynamic"></div>

<script>
  oc.cmd.push(function (oc) {
    const html = oc.build({
      baseUrl: "//registry.com",
      name: "hello-world",
      version: "1.0.0",
      parameters: { name: "John" },
    });

    document.getElementById("dynamic").innerHTML = html;
    oc.renderUnloadedComponents();
  });
</script>
```

Continue reading:

- [Rendering Lifecycle](/docs/consumers/rendering-lifecycle)
- [Events & Hooks](/docs/consumers/events-hooks)
