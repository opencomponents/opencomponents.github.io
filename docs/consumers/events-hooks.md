---
sidebar_position: 5
---

# Events & Hooks

The OC client fires a series of lifecycle events you can hook into to orchestrate complex user-flows, perform logging, or show custom loading states. This page lists the available events and shows how to subscribe, unsubscribe, and fire custom ones.

## Subscribing to Events

```js
// Log every component that finishes rendering
oc.events.on("oc:rendered", function (event, data) {
  console.log("Component rendered:", data.name, data.version);
});
```

## Unsubscribing

```js
function myHandler(event, data) {
  /* ... */
}
oc.events.on("oc:rendered", myHandler);

// Remove a specific handler
oc.events.off("oc:rendered", myHandler);

// Remove all handlers for an event or array of events
oc.events.off(["oc:rendered", "oc:failed"]);
```

## Firing Custom Events

```js
oc.events.fire("custom:event", { message: "Hello World" });
```

## Resetting

Remove _all_ subscriptions – handy in tests:

```js
oc.events.reset();
```

## Event Reference

| Event           | When Fired                      | Event Data                                           |
| --------------- | ------------------------------- | ---------------------------------------------------- |
| `oc:ready`      | Client initialisation complete  | `oc` object                                          |
| `oc:rendered`   | Component successfully rendered | `{ name, version, id, html, element, baseUrl, key }` |
| `oc:failed`     | Component rendering failed      | `{ originalError, data, component }`                 |
| `oc:unrendered` | Component removed from DOM      | `{ element, id }`                                    |

## Error Handling & Troubleshooting

```js
oc.events.on("oc:failed", function (event, data) {
  console.error("Component failed:", data.originalError);
  data.component.innerHTML = '<div class="error">Component unavailable</div>';
});
```

Common causes & quick checks:

- Network connectivity to the registry
- Correct component `href` URLs
- `debug` mode (`oc.conf.debug = true`) for verbose logging
- Template configuration mismatches

Retry strategy example:

```js
var oc = {
  conf: {
    retryInterval: 3000, // 3 s between retries
    retryLimit: 5, // 5 attempts max
    retrySendNumber: true, // Append __ocRetry parameter
  },
};
```
