---
sidebar_position: 1
---

# Client-side rendering

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
- The client can be before or after the components. When after, a rendering needs to happen via explicit call as described in this page: [advanced client-side operations](/docs/components/client-side-operations).

## What exactly happens during a component's client-side rendering?

1. The first thing is for the client to be initialised. This includes verifying the dependencies are satisfied (for instance, jQuery)
2. At the end of the initialisation, the client is going to fire an event `oc:ready`
3. Then the client is going to scan for `<oc-component>` tags in the page and for each one of them:
4. It is going to make an HTTP GET to the `href` parameter of the component, sending a `Accept: application/vnd.oc.unrendered+json` header (which is the standard header for getting an unrendered component).
5. In case of error (timeout or 5xx response) the client is going to retry 30 times (retry attempts and timeout are configurable)
6. In case of success, the client is going to find what kind of template the component uses and verify dependencies are satisfied. For ES6 templates (the default), it ensures the template function is ready. For legacy template types like Handlebars, it ensures the respective runtime is available and ready, downloading it if necessary before proceeding to the next step
7. The client will take the compiled view url, for instance `//cdn.com/components/my-component/1.2.3/template.js` and put it in the `<head>` tag, then waiting for it to be ready. If the template is already there (for example because there are multiple components of the same type and version in the page) it is going to skip step 7. When the template is ready it is exposed in the `window.oc.components['hash-of-the-component']` namespace as a function: `view(viewModel)=html`.
8. This is going to take the viewModel (part of the HTTP response) and use it to render the view, in order to obtain the html. When finished, it is going to place the HTML result inside the `<oc-component>` container tag. Some templates may perform additional actions. In case of a React template, for instance, the HTML may be bound to the Virtual DOM.
9. An `oc:rendered` event is published containing the pointer to the component, and all the information (version, name, html, etc.)
10. Back to 3) In order to render, in case, nested client-side components

## Framework Integration Examples

### React Integration

```jsx
import React, { useEffect, useRef } from 'react';

function OCComponent({ href, fallback = 'Loading...' }) {
  const ref = useRef();

  useEffect(() => {
    // Ensure OC client is loaded
    if (window.oc) {
      window.oc.renderNestedComponent(ref.current);
    }
  }, [href]);

  return (
    <oc-component ref={ref} href={href}>
      {fallback}
    </oc-component>
  );
}
```

### Vue.js Integration

```vue
<template>
  <oc-component :href="componentUrl" ref="ocComponent">
    {{ fallbackText }}
  </oc-component>
</template>

<script>
export default {
  props: ['componentUrl', 'fallbackText'],
  mounted() {
    if (window.oc) {
      window.oc.renderNestedComponent(this.$refs.ocComponent);
    }
  }
}
</script>
```

### Angular Integration

```typescript
import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'oc-wrapper',
  template: `
    <oc-component [attr.href]="href" #ocElement>
      {{ fallback }}
    </oc-component>
  `
})
export class OCWrapperComponent implements AfterViewInit {
  @Input() href: string;
  @Input() fallback: string = 'Loading...';

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    if ((window as any).oc) {
      (window as any).oc.renderNestedComponent(
        this.elementRef.nativeElement.querySelector('oc-component')
      );
    }
  }
}
```

## Performance Optimization

### Lazy Loading Components

```javascript
// Load components only when needed
function loadComponentWhenVisible(element) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.oc.renderNestedComponent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(element);
}

// Apply to all oc-components
document.querySelectorAll('oc-component[data-lazy]').forEach(loadComponentWhenVisible);
```

### Caching Strategies

```javascript
// Configure client-side caching
window.oc.conf = {
  cache: {
    enabled: true,
    maxAge: 300000, // 5 minutes
    maxEntries: 100
  }
};
```

## Error Handling

### Graceful Degradation

```html
<oc-component href="//registry.com/unreliable-component">
  <div class="fallback-content">
    <h3>Content temporarily unavailable</h3>
    <p>Please try refreshing the page.</p>
  </div>
</oc-component>
```

### JavaScript Error Handling

```javascript
// Listen for component errors
document.addEventListener('oc:error', function(event) {
  console.error('Component failed to load:', event.detail);
  
  // Show fallback content or retry
  const component = event.target;
  component.innerHTML = '<div class="error">Component failed to load</div>';
});
```

## What can I do in the client-side?

Look at this page: [advanced client-side operations](../components/client-side-operations)
