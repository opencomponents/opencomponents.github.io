---
sidebar_position: 4
---

# The server.js

## When Do You Need server.js?

Understanding when to use `server.js` is crucial for building effective OpenComponents. Here's a simple decision guide:

### Static Components (No server.js needed)

Use static components when your content doesn't change based on user input or external data:

```javascript
// template.js - Static component
export default function (model) {
  return `<div class="banner">Welcome to our site!</div>`;
}
```

**Use cases:**

- Static banners or promotional content
- Fixed navigation menus
- Copyright footers
- Terms of service links

### Dynamic Components (server.js required)

Use `server.js` when you need to:

- **Fetch data from APIs or databases**
- **Process user parameters**
- **Implement business logic**
- **Handle authentication or personalization**
- **Format or transform data**

```javascript
// template.js - Dynamic component
export default function (model) {
  return `<div>Hello ${model.name}, you have ${model.messageCount} messages</div>`;
}
```

```javascript
// server.js - Provides dynamic data
module.exports.data = function (context, callback) {
  const userId = context.params.userId;
  // Fetch user data and message count
  callback(null, {
    name: "John",
    messageCount: 5,
  });
};
```

## Simple Examples First

Let's start with the most basic dynamic component and gradually add complexity.

### Example 1: Basic Parameter Handling

**Goal**: Display a personalized greeting using a name parameter.

```javascript
// server.js - Simple parameter handling
module.exports.data = function (context, callback) {
  callback(null, {
    name: context.params.name || "Guest",
  });
};
```

```javascript
// template.js
export default function (model) {
  return `<div>Hello ${model.name}!</div>`;
}
```

**Usage**: `<oc-component href="http://localhost:3030/greeting?name=Alice"></oc-component>`

### Example 2: Simple Data Processing

**Goal**: Format and display current date information.

```javascript
// server.js - Basic data processing
module.exports.data = function (context, callback) {
  const now = new Date();
  callback(null, {
    currentDate: now.toLocaleDateString(),
    currentTime: now.toLocaleTimeString(),
    dayOfWeek: now.toLocaleDateString("en-US", { weekday: "long" }),
  });
};
```

```javascript
// template.js
export default function (model) {
  return `
    <div class="date-widget">
      <h3>Today is ${model.dayOfWeek}</h3>
      <p>Date: ${model.currentDate}</p>
      <p>Time: ${model.currentTime}</p>
    </div>
  `;
}
```

### Example 3: Conditional Logic

**Goal**: Show different content based on user preferences.

```javascript
// server.js - Conditional logic
module.exports.data = function (context, callback) {
  const theme = context.params.theme || "light";
  const showWelcome = context.params.showWelcome === "true";

  callback(null, {
    theme: theme,
    showWelcome: showWelcome,
    cssClass: theme === "dark" ? "dark-theme" : "light-theme",
    welcomeMessage: showWelcome ? "Welcome back!" : "",
  });
};
```

## Practical Use Case Examples

### Use Case 1: User Authentication Status

```javascript
// server.js - Authentication check
module.exports.data = function (context, callback) {
  const authToken = context.requestHeaders.authorization;

  if (authToken && authToken.startsWith("Bearer ")) {
    // In real implementation, validate token
    callback(null, {
      isAuthenticated: true,
      userRole: "user",
      showLoginButton: false,
      showLogoutButton: true,
    });
  } else {
    callback(null, {
      isAuthenticated: false,
      userRole: "guest",
      showLoginButton: true,
      showLogoutButton: false,
    });
  }
};
```

### Use Case 2: API Data Fetching

```javascript
// server.js - API integration (requires dependencies in package.json)
module.exports.data = function (context, callback) {
  const userId = context.params.userId;

  if (!userId) {
    return callback(null, { error: "User ID required" });
  }

  // Example API call (requires axios in dependencies)
  // const axios = require('axios');
  // axios.get(`https://api.example.com/users/${userId}`)
  //   .then(response => {
  //     callback(null, {
  //       user: response.data,
  //       lastLogin: response.data.lastLogin,
  //       profileComplete: response.data.profileComplete
  //     });
  //   })
  //   .catch(error => {
  //     callback(null, { error: 'Failed to load user data' });
  //   });

  // Mock data for example
  callback(null, {
    user: { name: "John Doe", email: "john@example.com" },
    lastLogin: "2025-01-15",
    profileComplete: true,
  });
};
```

### Use Case 3: Localization

```javascript
// server.js - Internationalization
module.exports.data = function (context, callback) {
  const language =
    context.params.lang || context.acceptLanguage[0]?.code || "en";

  const translations = {
    en: {
      welcome: "Welcome",
      goodbye: "Goodbye",
      loading: "Loading...",
    },
    es: {
      welcome: "Bienvenido",
      goodbye: "Adiós",
      loading: "Cargando...",
    },
    fr: {
      welcome: "Bienvenue",
      goodbye: "Au revoir",
      loading: "Chargement...",
    },
  };

  callback(null, {
    language: language,
    text: translations[language] || translations.en,
  });
};
```

## Advanced Features

### Error Handling

```javascript
// server.js - Proper error handling
module.exports.data = function (context, callback) {
  try {
    const requiredParam = context.params.required;

    if (!requiredParam) {
      return callback(new Error("Required parameter missing"));
    }

    // Process data
    const result = processData(requiredParam);
    callback(null, result);
  } catch (error) {
    callback(error);
  }
};

function processData(param) {
  // Your processing logic here
  return { processed: param };
}
```

### Using Context Properties

The context object provides access to request data and registry functionality:

In the given example, we want to pass name parameter to our view. To achieve this goal, we can modify server file in this way:

```js
"use strict";

module.exports.data = function (context, callback) {
  callback(null, {
    name: "John",
  });
};
```

The `first parameter` is used in case we want to fire an error and avoid the rendering.

The `second parameter` of the `callback` function is a view-model (JSON object) which is used by the view.

However, for more complicated operations we may need query parameters from component request. In this case we can use `params` property from [context](#context-properties) object (first parameter of our server function).

In our example we want to extract `name` parameter from the `context` object:

```js
module.exports.data = function (context, callback) {
  callback(null, {
    name: context.params.name || "John",
  });
};
```

To consume the component passing the `name` parameter we need to modify the reference link, e.g:

```html
<oc-component
  href="http://localhost:3030/hello-world?name=James"
></oc-component>
```

## Context properties

Context aggregates request data, and the registry's context. It consists of the following fields:

```js
{
  "acceptLanguage": [
    {
      "code": "en",
      "region": "US",
      "quality": 1
    },
    {
      "code": "en",
      "quality": 0.8
    }
  ],
  "baseUrl": "http://localhost:3030/",
  "env": {
    "name": "local"
  },
  "params": {
    "name": "Johnny"
  },
  "renderComponent": [Function],
  "renderComponents": [Function],
  "requestHeaders": {
      "host": "localhost:3000",
      "connection": "keep-alive",
      "accept": "application/vnd.oc.unrendered+json",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36",
      "content-type": "text/plain",
      "referer": "http://localhost:3000/oc-client/0.28.5/~preview/",
      "accept-encoding": "gzip, deflate, sdch",
      "accept-language": "en-US,en;q=0.8",
  },
  "setEmptyResponse": [Function],
  "setHeader": [Function],
  "staticPath": "http://localhost:3030/hello-world/1.0.0/static/"
}
```

| Parameter          | Type                 | Description                                                                                                                                                                                                                                                                   |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `acceptLanguage`   | `array of objects`   | represents parsed `accept-language` part of the request header sorted by quality. More details [here](https://github.com/opentable/accept-language-parser)                                                                                                                    |
| `baseUrl`          | `string`             | represents public registry base url. This is required when we want to nest components that are hosted in the same registry for client-side rendering                                                                                                                          |
| `env`              | `object`             | represents the registry environment variables. The registry's admin [can share here arbitrary data](/docs/registry/registry-configuration#registry-configuration)                                                                                                             |
| `params`           | `object`             | represents parameters extracted from the query string                                                                                                                                                                                                                         |
| `plugins`          | `array of functions` | [custom functionalities that extend the registry](/docs/registry/registry-configuration#plugins). Note: if a component needs a plugin, [it needs to be declared in the component's package.json](/docs/components/getting-started#structure-of-the-package)                   |
| `renderComponent`  | `function`           | Needed to do server-side nested renderings. [renderComponent API](#rendercomponent-api)                                                                                                                                                                                       |
| `renderComponents` | `function`           | Needed to do server-side nested renderings. [renderComponents API](#rendercomponents-api)                                                                                                                                                                                     |
| `requestHeaders`   | `object`             | represents the original request headers. When component is rendered client side this will be what is sent from the browser, when rendered server side, using oc-client, this will contain whatever the client has been configured to forward                                  |
| `setEmptyResponse` | `function`           | Sets the response to be completely empty (included container and renderInfo). Recommended is to return it: `return context.setEmptyResponse();`                                                                                                                               |
| `setHeader`        | `function`           | Needed to set custom headers. Signature is (name, value)                                                                                                                                                                                                                      |
| `setCookie`        | `function`           | Needed to set cookies. Signature is (name, value, options?) where options supports all standard Express cookie options (httpOnly, secure, maxAge, etc.)                                                                                                                       |
| `staticPath`       | `string`             | represents the path to static resources i.e. images, styles, javascript files. This is required to [reference static resources to the view](#add-static-resource-to-the-component) and **already includes a final slash** (this is relevant due to how S3 handles filePaths). |

### renderComponent API

Signature: `context.renderComponent(componentName [, options], callback)`

| Parameter            | Type       | Mandatory | Description                                                                  |
| -------------------- | ---------- | --------- | ---------------------------------------------------------------------------- |
| `componentName`      | `string`   | `yes`     | The component's name to be rendered. Needs to be hosted on the same registry |
| `options`            | `object`   | `no`      | The options                                                                  |
| `options.version`    | `string`   | `no`      | Default '' (latest) - the version of the component to render                 |
| `options.parameters` | `object`   | `no`      | Component's parameters                                                       |
| `options.headers`    | `object`   | `no`      | Headers to be injected to the nested component                               |
| `callback`           | `function` | `yes`     | The callback. Signature is callback(error, html)                             |

### renderComponents API

Signature: `context.renderComponents(components [, options], callback)`

| Parameter                      | Type       | Mandatory | Description                                                                                                                                                                                   |
| ------------------------------ | ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components`                   | `array`    | `yes`     | The components to be rendered. Need to be hosted on the same registry                                                                                                                         |
| `components[index].name`       | `string`   | `yes`     | The component's name to be rendered                                                                                                                                                           |
| `components[index].version`    | `string`   | `no`      | Default '' (latest) - the version of the component to render                                                                                                                                  |
| `components[index].parameters` | `object`   | `no`      | The components' parameters                                                                                                                                                                    |
| `options`                      | `object`   | `no`      | The global options                                                                                                                                                                            |
| `options.parameters`           | `object`   | `no`      | Components "global" parameters. If in need to render many components with the same parameters, they can be specified "globally" instead of in each component's "parameters" field             |
| `options.headers`              | `object`   | `no`      | Headers to be forwarded to be injected to the nested components                                                                                                                               |
| `callback`                     | `function` | `yes`     | The callback. Signature is callback(error, response). Response will be an array with a mix of strings of html (in case of success) and/or `Error` containing the details (in case of failure) |

## Add static resource to the component

In this example an image (`public/static_resource.png`) will be our static resource.

### Prepare package file

First step is to prepare `package.json` file. It is necessary to add `static` property in `oc.files` object:

```js
{
  "name": "hello-world",
  "description": "description of my hello-world component",
  "version": "1.0.0",
  "repository": "",
  "oc": {
    "files": {
      "data": "server.js",
      "template": {
        "src": "template.js",
        "type": "oc-template-es6"
      },
      "static": ["public"]
    }
  },
  "devDependencies": {
    "oc-template-es6-compiler": "6.0.8"
  }
}
```

It is an array of names of directories. In the above example the `public` directory will be included inside the package.

### Add image in the view template

We can add image to the component view template using `img` tag in which `src` attribute is bound to `img` viewModel property.

```javascript
export default function (model) {
  return `<img src="${model.path}public/static_resource.png" />`;
}
```

### Update server file

To provide `img` parameter in our viewModel we need to update `server.js`. The important thing is we need to use `context.staticPath` to provide url to the static resources:

```js
module.exports.data = function (context, callback) {
  callback(null, {
    path: context.staticPath,
  });
};
```

## Performance Considerations

### Keep server.js Lightweight

```javascript
// ❌ Avoid heavy processing in server.js
module.exports.data = function (context, callback) {
  // Don't do this - heavy computation blocks rendering
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  callback(null, { result });
};

// ✅ Better - delegate heavy work or use caching
module.exports.data = function (context, callback) {
  // Use caching for expensive operations
  const cached = getFromCache(context.params.key);
  if (cached) {
    return callback(null, cached);
  }

  // Or delegate to background service
  callback(null, { message: "Processing started", status: "pending" });
};
```

### Optimize Data Fetching

```javascript
// ✅ Good - efficient data fetching
module.exports.data = function (context, callback) {
  const userId = context.params.userId;

  // Only fetch what you need
  const fields = "name,email,avatar";

  // Use timeouts to prevent hanging
  const timeout = setTimeout(() => {
    callback(null, { error: "Request timeout" });
  }, 5000);

  fetchUserData(userId, fields)
    .then((data) => {
      clearTimeout(timeout);
      callback(null, data);
    })
    .catch((error) => {
      clearTimeout(timeout);
      callback(null, { error: "Failed to load data" });
    });
};
```

### Memory Management

```javascript
// ✅ Clean up resources
module.exports.data = function (context, callback) {
  const largeData = processLargeDataset();

  // Extract only what's needed for the view
  const viewData = {
    summary: largeData.summary,
    count: largeData.items.length,
  };

  // Don't pass large objects to the view
  callback(null, viewData);
};
```

## Node.js Dependencies

### Local Development

List dependencies in your component's `package.json`:

```json
{
  "name": "my-component",
  "dependencies": {
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "axios": "^1.0.0"
  }
}
```

Then use them in `server.js`:

```javascript
const _ = require("lodash");
const moment = require("moment");
const axios = require("axios");

module.exports.data = function (context, callback) {
  const users = _.uniqBy(context.params.users, "id");
  const formattedDate = moment().format("YYYY-MM-DD");

  callback(null, {
    users: users,
    currentDate: formattedDate,
  });
};
```

### Publishing Considerations

When publishing, the registry may restrict dependencies for security and performance:

- **Allowed**: Common utilities (lodash, moment, axios)
- **Restricted**: File system access, network libraries, native modules
- **Forbidden**: Packages with security vulnerabilities

Check with your registry administrator about approved dependencies.

## Troubleshooting Common Issues

### Issue: "Cannot read property of undefined"

```javascript
// ❌ Problem - not checking if params exist
module.exports.data = function (context, callback) {
  const name = context.params.user.name; // Error if user is undefined
  callback(null, { name });
};

// ✅ Solution - defensive programming
module.exports.data = function (context, callback) {
  const user = context.params.user || {};
  const name = user.name || "Anonymous";
  callback(null, { name });
};
```

### Issue: "Callback already called"

```javascript
// ❌ Problem - calling callback multiple times
module.exports.data = function (context, callback) {
  if (context.params.error) {
    callback(new Error("Something went wrong"));
  }
  callback(null, { data: "success" }); // Error - callback called twice
};

// ✅ Solution - use return statements
module.exports.data = function (context, callback) {
  if (context.params.error) {
    return callback(new Error("Something went wrong"));
  }
  callback(null, { data: "success" });
};
```

### Issue: "Component renders but shows no data"

```javascript
// ❌ Problem - forgetting to call callback
module.exports.data = function (context, callback) {
  const data = { message: "Hello" };
  // Forgot to call callback(null, data);
};

// ✅ Solution - always call callback
module.exports.data = function (context, callback) {
  const data = { message: "Hello" };
  callback(null, data);
};
```

### Issue: "Server.js syntax errors"

```javascript
// ❌ Common syntax issues
module.exports.data = function (context, callback) {
  // Missing semicolon
  const name = context.params.name;

  // Incorrect callback usage
  callback({ name: name }); // Missing null as first parameter
};

// ✅ Correct syntax
module.exports.data = function (context, callback) {
  const name = context.params.name;
  callback(null, { name: name });
};
```

### Debugging Tips

1. **Enable debug mode**: Set `debug: true` in your registry configuration
2. **Use console.log**: Add logging to understand data flow
3. **Check browser network tab**: Verify component requests and responses
4. **Validate JSON**: Ensure your callback data is valid JSON
5. **Test parameters**: Use `oc preview` to test different parameter combinations

## Next Steps

- **[Learn package.json structure](package.json-structure)** - Configure your component properly
- **[Master the CLI](cli)** - Efficient development workflow
- **[Publishing guide](publishing-to-a-registry)** - Deploy your components
- **[Client-side operations](../consumers/rendering-lifecycle)** - Browser integration patterns
