---
sidebar_position: 2
---

# Server-side rendering

You can get rendered components via the registry rest api.

```sh
curl http://my-components-registry.mydomain.com/hello-world

{
  "href": "https://my-components-registry.mydomain.com/hello-world",
  "version": "1.0.0",
  "requestVersion": "",
  "html": "<oc-component href=\"https://my-components-registry.mydomain.com/hello-world\" data-hash=\"cad2a9671257d5033d2abfd739b1660993021d02\" id=\"2890594349\" data-rendered=\"true\" data-version=\"1.0.13\">Hello John doe!</oc-component>",
  "type": "oc-component",
  "renderMode": "rendered"
}
```

Nevertheless, for improving caching and response size, when using the `node.js` client or any language capable of executing server-side javascript the request will look more like:

```sh
 curl http://my-components-registry.mydomain.com/hello-world/~1.0.0 -H Accept:application/vnd.oc.unrendered+json

{
  "href": "https://my-components-registry.mydomain.com/hello-world/~1.0.0",
  "version": "1.0.0",
  "requestVersion": "~1.0.0",
  "data": {
    "name": "John doe"
  },
  "template": {
    "src": "https://s3.amazonaws.com/your-s3-bucket/components/hello-world/1.0.0/template.js",
    "type": "oc-template-es6",
    "key": "cad2a9671257d5033d2abfd739b1660993021d02"
  },
  "type": "oc-component",
  "renderMode": "unrendered"
}
```

In this case you get the compiled view + the data, and you can do the rendering, eventually, interpolating the view-model data and rendering the compiled view with it.

When retrieving multiple components, a [batch POST endpoint](/docs/consumers/batch-endpoint) allows to make a single request to the API.

## Web Framework Integration Examples

### Express.js Integration

```javascript
const express = require('express');
const oc = require('oc-client-node');

const app = express();
const client = oc.Client({
  registries: ['https://my-registry.com'],
  components: {
    cache: {
      type: 'memory',
      options: {
        max: 100,
        maxAge: 1000 * 60 * 5 // 5 minutes
      }
    }
  }
});

app.get('/', async (req, res) => {
  try {
    const header = await client.renderComponent('header', { user: req.user });
    const footer = await client.renderComponent('footer');
    
    res.render('index', { header: header.html, footer: footer.html });
  } catch (error) {
    console.error('Component rendering failed:', error);
    res.render('index', { header: '', footer: '' });
  }
});
```

### Koa.js Integration

```javascript
const Koa = require('koa');
const oc = require('oc-client-node');

const app = new Koa();
const client = oc.Client({ registries: ['https://my-registry.com'] });

app.use(async (ctx) => {
  try {
    const components = await Promise.all([
      client.renderComponent('navigation'),
      client.renderComponent('content', { page: ctx.path })
    ]);
    
    ctx.body = `
      <html>
        <body>
          ${components[0].html}
          ${components[1].html}
        </body>
      </html>
    `;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error rendering components';
  }
});
```

### Next.js Integration

```javascript
// pages/api/components/[...component].js
import oc from 'oc-client-node';

const client = oc.Client({
  registries: ['https://my-registry.com']
});

export default async function handler(req, res) {
  const { component } = req.query;
  const componentName = component[0];
  
  try {
    const result = await client.renderComponent(componentName, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Component rendering failed' });
  }
}
```

## Caching Strategies

### Redis Caching

```javascript
const redis = require('redis');
const client = redis.createClient();

const ocClient = oc.Client({
  registries: ['https://my-registry.com'],
  components: {
    cache: {
      type: 'redis',
      options: {
        client: client,
        prefix: 'oc:',
        ttl: 300 // 5 minutes
      }
    }
  }
});
```

### Memory Caching with LRU

```javascript
const LRU = require('lru-cache');

const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 10 // 10 minutes
});

const ocClient = oc.Client({
  registries: ['https://my-registry.com'],
  components: {
    cache: {
      type: 'memory',
      options: cache
    }
  }
});
```

## Error Handling

### Graceful Fallbacks

```javascript
async function renderComponentWithFallback(name, params, fallback = '') {
  try {
    const result = await client.renderComponent(name, params);
    return result.html;
  } catch (error) {
    console.error(`Component ${name} failed:`, error);
    return fallback;
  }
}

// Usage
const header = await renderComponentWithFallback('header', { user }, '<header>Default Header</header>');
```

### Timeout Handling

```javascript
const client = oc.Client({
  registries: ['https://my-registry.com'],
  timeout: 5000, // 5 seconds
  retry: 3
});
```

## Available Clients

- [Javascript browser client](https://github.com/opencomponents/oc-client-browser)
- [Javascript Node.js client](https://github.com/opencomponents/oc-client-node)
- [PHP client](https://github.com/opencomponents/oc-client-php)
- [Ruby client](https://github.com/opencomponents/ruby-oc)
- [Rails client](https://github.com/opencomponents/opencomponents-rails)
- [Sinatra client](https://github.com/opencomponents/sinatra-opencomponents)
