---
sidebar_position: 4
---

# Rendering Lifecycle

Learn how the OC client discovers and renders components on the page – including synchronous, asynchronous and nested rendering, plus support for ES modules. If you’re looking for an architectural birds-eye view of what happens in the browser, you’re in the right place.

## Rendering Components

### Synchronous Rendering

Components render automatically when the page loads:

```html
<oc-component href="//registry.com/header/1.0.0"></oc-component>
<oc-component href="//registry.com/footer/1.0.0"></oc-component>
```

### Asynchronous Rendering

Render components programmatically:

```js
oc.ready(function () {
  const container = document.getElementById("async-content");
  container.innerHTML = oc.build({
    baseUrl: "//registry.com",
    name: "dynamic-widget",
    version: "2.1.0",
    parameters: { theme: "blue" },
  });
  oc.renderUnloadedComponents();
});
```

### Nested Component Rendering

Handle components within components:

```js
oc.events.on("oc:rendered", function (event, data) {
  if (data.name === "parent-component") {
    // Parent rendered, now render nested components
    const nestedComponents = data.element.querySelectorAll("oc-component");
    nestedComponents.forEach(function (component) {
      oc.renderNestedComponent(component, function () {
        console.log("Nested component rendered");
      });
    });
  }
});
```

### ESM (ES Module) Support

Modern components using ES modules are automatically detected and rendered:

```html
<oc-component href="//registry.com/modern-component/3.0.0"></oc-component>
```

ESM components expose a `mount` function and receive props directly.

## Render Flow Diagram

```mermaid
graph TD
A[Page Load] --> B[OC Client Script Loaded]
B --> C[Client Initialization]
C --> D[Fire oc:ready Event]
D --> E[Scan DOM for oc-component Tags]
E --> F{Component Found?}
F -->|Yes| G[Set data-rendering=true]
F -->|No| Z[Complete]
G --> H[Show Loading Message]
H --> I[Fetch Component from Registry]
I --> J{Fetch Success?}
J -->|No| K[Retry Logic]
K --> L{Retry Limit Reached?}
L -->|No| M[Wait Retry Interval]
M --> I
L -->|Yes| N[Fire oc:failed Event]
N --> O[Set data-failed=true]
O --> P[Clear Loading Message]
P --> E
J -->|Yes| Q[Load Template Externals]
Q --> R[Render Component HTML]
R --> S{Render Success?}
S -->|No| N
S -->|Yes| T[Inject HTML into DOM]
T --> U[Set data-rendered=true]
T --> V[Fire oc:rendered Event]
V --> W{ESM Component?}
W -->|Yes| X[Call mount function]
W -->|No| Y[Reactivate Scripts]
X --> E
Y --> E

style A fill:#e1f5fe
style D fill:#c8e6c9
style N fill:#ffcdd2
style V fill:#c8e6c9
style Z fill:#e8f5e8
```
