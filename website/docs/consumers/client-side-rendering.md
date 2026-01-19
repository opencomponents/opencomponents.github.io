---
sidebar_position: 5
---

# Client-side Rendering

## Integration

To make this happen, a components registry has to be publicly available.
This is how to integrate the component:

```html
<html>
  <head></head>
  <body>
    <oc-component
      href="//my-components-registry.mydomain.com/hello-world/1.X.X"
    ></oc-component>
    <script src="//my-components-registry.mydomain.com/oc-client/client.js"></script>
  </body>
</html>
```

- It is recommended to use protocol-less urls for rendering so that we can use https where possible for security reasons
- The `/oc-client/client.js` is a convenient shortcut for serving the browser oc-client of the **same version as the registry**.
- The client can be before or after the components. When after, a rendering needs to happen via explicit call – see [advanced client-side operations](/docs/consumers/rendering-lifecycle).

## What exactly happens during a component's client-side rendering?

1. The first thing is for the client to be initialised. This includes verifying the required template runtimes are available
2. At the end of the initialisation, the client is going to fire an event `oc:ready`
3. Then the client is going to scan for `<oc-component>` tags in the page and for each one of them:
4. It is going to make an HTTP GET to the `href` parameter of the component, sending a `Accept: application/vnd.oc.unrendered+json` header (which is the standard header for getting an unrendered component).
5. In case of error (timeout or 5xx response) the client is going to retry 30 times (retry attempts and timeout are configurable)
6. In case of success, the client is going to find what kind of template the component uses and verify dependencies are satisfied. For ES6 templates (the default), it ensures the template function is ready. For legacy template types like Handlebars, it ensures the respective runtime is available and ready, downloading it if necessary before proceeding to the next step
7. The client will take the compiled view url, for instance `//cdn.com/components/my-component/1.2.3/template.js` and put it in the `<head>` tag, then waiting for it to be ready. If the template is already there (for example because there are multiple components of the same type and version in the page) it is going to skip step 7. When the template is ready it is exposed in the `window.oc.components['hash-of-the-component']` namespace as a function: `view(viewModel)=html`.
8. This is going to take the viewModel (part of the HTTP response) and use it to render the view, **producing** the HTML. When finished, it places the HTML result inside the `<oc-component>` container tag. Some templates may perform additional actions. In case of a React template, for instance, the HTML may be bound to the Virtual DOM.
9. An `oc:rendered` event is published containing the pointer to the component, and all the information (version, name, html, etc.)
10. Back to 3) **To render nested client-side components, if any are present**

## What can I do in the client-side?

Look at this page: [advanced client-side operations](rendering-lifecycle)
