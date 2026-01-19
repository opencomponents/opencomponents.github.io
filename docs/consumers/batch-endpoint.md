---
sidebar_position: 7
---

# Batch Endpoint

It allows to retrieve a set of components with a single request to the API. While this should be convenient during the server-side rendering, it is not a good practice for client-side rendering.

## Server-side rendering via REST API using the POST route

```bash
curl http://my-components-registry.mydomain.com/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"components":[{"name": "hello-world", "version": "1.X.X"}, {"name": "my-component", "parameters": { "something": 2345 }}]}'
```

Response:

```json
[{
  "status": 200,
  "response": {
    "href": "https://my-components-registry.mydomain.com/hello-world/1.X.X",
    "name": "hello-world",
    "version": "1.0.0",
    "requestVersion": "1.X.X",
    "html": "Hello John doe!",
    "type": "oc-component",
    "renderMode": "rendered"
  }
},{
  "status": 200,
  "response": {
    "href": "https://my-components-registry.mydomain.com/my-component/?something=2345",
    "name": "my-component",
    "version": "1.0.0",
    "requestVersion": "",
    "html": "Bla bla",
    "type": "oc-component",
    "renderMode": "rendered"
  }
}]
```
```

## Payload API

| Parameter                    | Type               | Mandatory | Description                                                                                                          |
| ---------------------------- | ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------- |
| components                   | `array of objects` | `yes`     | Components to retrieve                                                                                               |
| components[index].name       | `string`           | `yes`     | Component name                                                                                                       |
| components[index].version    | `string`           | `no`      | Default latest, the component's version                                                                              |
| components[index].parameters | `object`           | `no`      | Component's parameters                                                                                               |
| omitHref                     | `boolean`          | `no`      | Default false, when `true` omits the href value in the response of each component                                    |
| parameters                   | `object`           | `no`      | Global parameters for all components to retrieve. When component has its own parameters, globals will be overwritten |

## Performance Optimization

### When to Use Batch vs Individual Requests

**Use Batch Endpoint When:**
- Rendering multiple components on the same page
- Components are needed simultaneously
- Network latency is a concern
- You want to reduce HTTP overhead

**Use Individual Requests When:**
- Loading components asynchronously
- Implementing lazy loading
- Components have different caching requirements
- You need fine-grained error handling

### Optimal Batch Size

```js
// Recommended: 5-10 components per batch
const componentBatches = chunkArray(allComponents, 8);

for (const batch of componentBatches) {
  const results = await fetchBatch(batch);
  renderComponents(results);
}
```

### Caching Strategies

```js
// Cache batch responses by component combination
const cacheKey = components.map(c => `${c.name}:${c.version}`).join(',');

if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}

const result = await fetchBatch(components);
cache.set(cacheKey, result, { ttl: 300 }); // 5 minutes
return result;
```

## Error Handling for Batch Operations

### Partial Failure Handling

```js
async function renderBatchWithFallbacks(components) {
  try {
    const results = await fetchBatch(components);
    
    return results.map((result, index) => {
      if (result.status !== 200) {
        console.warn(`Component ${components[index].name} failed:`, result);
        return {
          status: 200,
          response: {
            html: getFallbackContent(components[index].name),
            name: components[index].name
          }
        };
      }
      return result;
    });
  } catch (error) {
    console.error('Batch request failed:', error);
    return components.map(comp => ({
      status: 500,
      response: { html: getFallbackContent(comp.name), name: comp.name }
    }));
  }
}
```

### Retry Logic

```js
async function fetchBatchWithRetry(components, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchBatch(components);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Real-World Examples

### E-commerce Page

```js
// Fetch all components for a product page
const productPageComponents = await fetchBatch([
  { name: 'header', parameters: { user: currentUser } },
  { name: 'product-details', parameters: { productId: '123' } },
  { name: 'recommendations', parameters: { userId: currentUser.id } },
  { name: 'reviews', parameters: { productId: '123', limit: 5 } },
  { name: 'footer' }
]);
```

### Dashboard Layout

```js
// Load dashboard widgets in batches
const dashboardWidgets = await fetchBatch([
  { name: 'analytics-widget', parameters: { timeframe: 'week' } },
  { name: 'sales-widget', parameters: { region: 'US' } },
  { name: 'inventory-widget' },
  { name: 'notifications-widget', parameters: { userId: user.id } }
]);
```

### Performance Monitoring

```js
const startTime = Date.now();

const components = await fetchBatch(componentList);

const endTime = Date.now();
console.log(`Batch request completed in ${endTime - startTime}ms`);

// Log individual component performance
components.forEach((comp, index) => {
  if (comp.status !== 200) {
    console.error(`Component ${componentList[index].name} failed`);
  }
});
```
