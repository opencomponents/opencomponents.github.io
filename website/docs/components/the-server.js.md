---
sidebar_position: 4
---

# The server (entry.server.ts)

Note: The legacy CommonJS style `module.exports.data = (context, callback) => { ... }` still works, but is considered deprecated. New components should use `src/entry.server.ts` with the `Server` API.

## When do you need a server entry?

Understanding when to use `server.js` is crucial for building effective OpenComponents. Here's a simple decision guide:

### Static components (no server entry needed)

Use static components when your content doesn't change based on user input or external data:

```tsx
// src/entry.client.tsx - Static component
export default function Component() {
  return <div className="banner">Welcome to our site!</div>;
}
```

**Use cases:**

- Static banners or promotional content
- Fixed navigation menus
- Copyright footers
- Terms of service links

### Dynamic components (server entry required)

Use a server entry when you need to:

- **Fetch data from APIs or databases**
- **Process user parameters**
- **Implement business logic**
- **Handle authentication or personalization**
- **Format or transform data**

```tsx
// src/entry.client.tsx - Dynamic component
export default function Component(props: {
  name: string;
  messageCount: number;
}) {
  return (
    <div>
      Hello {props.name}, you have {props.messageCount} messages
    </div>
  );
}
```

```ts
// src/entry.server.ts - Provides dynamic data (modern API)
import { Server } from "oc-server";

export const server = new Server({ development: { console: true } })
  .withParameters({
    userId: {
      type: "number",
      description: "User id",
      example: 1,
      default: 1,
      mandatory: true,
    },
  })
  .handler(async (params, ctx) => {
    const { userId } = params;
    // Fetch user data and message count
    ctx.setHeader("Cache-Control", "max-age=300");
    return { name: "John", messageCount: 5 };
  })
  .action("markAsRead", async (params: { messageId: string }) => {
    return { ok: true };
  });
```

## Basic Example

Here's a simple dynamic component that demonstrates the core pattern:

```ts
// src/entry.server.ts - Parameter handling with conditional logic
import { Server } from "oc-server";

export const server = new Server()
  .withParameters({
    name: { type: "string", default: "Guest" },
    theme: { type: "string", default: "light" },
  })
  .handler(async (params) => {
    const now = new Date();
    return {
      name: params.name ?? "Guest",
      theme: params.theme ?? "light",
      currentTime: now.toLocaleTimeString(),
      cssClass: params.theme === "dark" ? "dark-theme" : "light-theme",
    };
  });
```

```tsx
// src/entry.client.tsx
export default function Component(props: {
  name: string;
  theme: string;
  currentTime: string;
  cssClass: string;
}) {
  return (
    <div className={props.cssClass}>
      <h3>Hello {props.name}!</h3>
      <p>Current time: {props.currentTime}</p>
    </div>
  );
}
```

**Usage**: `<oc-component href="http://localhost:3030/greeting?name=Alice&theme=dark"></oc-component>`

## Real-World Example: User Dashboard

Here's a more complex example that combines authentication, API data fetching, and error handling:

```ts
// src/entry.server.ts - User dashboard with auth and API integration
import { Server } from "oc-server";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
} | null;

async function getUserFromToken(token?: string): Promise<User> {
  if (!token) return null;
  // In real implementation: validate JWT token
  return {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  };
}

export const server = new Server()
  .withParameters({ userId: { type: "number", mandatory: true } })
  .middleware(async (_params, ctx) => {
    const token = ctx.requestHeaders.authorization?.replace("Bearer ", "");
    const user = await getUserFromToken(token);
    return { user };
  })
  .handler(async ({ userId }, ctx) => {
    const isAuthenticated = !!ctx.state.user;

    if (!isAuthenticated) {
      return {
        error: "Authentication required",
        showLoginButton: true,
      } as const;
    }

    try {
      // In real implementation: fetch from API
      // const res = await fetch(`https://api.example.com/users/${userId}`);
      // const userData = await res.json();

      const userData = {
        name: "John Doe",
        email: "john@example.com",
        lastLogin: "2025-01-15",
        profileComplete: true,
      };

      return {
        user: userData,
        isAuthenticated: true,
        userRole: ctx.state.user?.role ?? "guest",
        showLogoutButton: true,
      };
    } catch {
      return {
        error: "Failed to load user data",
        isAuthenticated: true,
      } as const;
    }
  });
```

## Advanced Features

### Error handling

```ts
import { Server, ServerError } from "oc-server";

function processData(param: string) {
  return { processed: param };
}

export const server = new Server()
  .withParameters({ required: { type: "string", mandatory: true } })
  .handler(async ({ required }) => {
    if (!required) throw new ServerError(400, "Required parameter missing");
    return processData(required);
  });
```

To prevent rendering entirely (e.g., invalid state), return nothing:

```ts
export const server = new Server().handler(async (params) => {
  if ((params as any).name === "Invalid") {
    return; // prevents rendering
  }
  return { name: (params as any).name };
});
```

### Using context

The context object (`ctx`) provides access to request data and helpers:

- acceptLanguage: parsed `Accept-Language` header
- baseUrl: registry base URL
- env: registry environment
- params: validated parameters
- plugins: registry plugins
- requestHeaders: original request headers
- requestIp: client IP
- setEmptyResponse(): set the response to empty
- setHeader(name, value): set a response header
- setCookie(name, value, options?): set a cookie
- staticPath: public path for static assets
- templates: template metadata
- state: middleware-provided state

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

Add `static` to `oc.files` and point to the modern entries:

```json
{
  "name": "hello-world",
  "version": "1.0.0",
  "oc": {
    "files": {
      "data": "src/entry.server.ts",
      "template": {
        "src": "src/entry.client.tsx",
        "type": "oc-template-esm"
      },
      "static": ["public"]
    }
  }
}
```

It is an array of names of directories. In the above example the `public` directory will be included inside the package.

### Add image in the view template

We can add image to the component view template using `img` tag in which `src` attribute is bound to `img` viewModel property.

```tsx
export default function Component(props: { path: string }) {
  return <img src={`${props.path}public/static_resource.png`} />;
}
```

### Update server file

To provide `img` parameter in our viewModel we need to update `server.js`. The important thing is we need to use `context.staticPath` to provide url to the static resources:

```ts
import { Server } from "oc-server";

export const server = new Server().handler(async (_params, ctx) => {
  return { path: ctx.staticPath };
});
```

## Performance Tips

Keep your server entry lightweight and efficient:

```ts
// ✅ Good: Cache results, use timeouts, return only needed data
export const server = new Server()
  .withParameters({ userId: { type: "number", mandatory: true } })
  .handler(async ({ userId }) => {
    // Use caching for expensive operations
    const cached = getFromCache(`user-${userId}`);
    if (cached) return cached;

    // Set timeout for external requests
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 5000);

    try {
      // const res = await fetch(`/api/users/${userId}`, { signal: ac.signal });
      // const userData = await res.json();

      // Return only what the view needs
      const result = { name: "John", email: "john@example.com" };
      setCache(`user-${userId}`, result, 300); // Cache for 5 minutes
      return result;
    } catch {
      return { error: "Request timeout" } as const;
    } finally {
      clearTimeout(timer);
    }
  });
```

## Node.js dependencies

### Local development

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

Then use them in `src/entry.server.ts` (ESM imports):

```ts
import _ from "lodash";
import dayjs from "dayjs";
import axios from "axios";
import { Server } from "oc-server";

export const server = new Server()
  .withParameters({ users: { type: "string" } })
  .handler(async (params) => {
    const users = _.uniqBy(JSON.parse(params.users || "[]"), "id");
    const currentDate = dayjs().format("YYYY-MM-DD");
    return { users, currentDate };
  });
```

### Publishing considerations

When publishing, the registry may restrict dependencies for security and performance:

- **Allowed**: Common utilities (lodash, moment, axios)
- **Restricted**: File system access, network libraries, native modules
- **Forbidden**: Packages with security vulnerabilities

Check with your registry administrator about approved dependencies.

## Common Issues

### Missing return statement

```ts
// ❌ Problem - not returning data
export const server = new Server().handler(async () => {
  const data = { message: "Hello" };
  // Forgot to return data
});

// ✅ Solution - always return data
export const server2 = new Server().handler(async () => {
  return { message: "Hello" };
});
```

### Undefined property access

```ts
// ❌ Problem - not checking optional fields
export const server = new Server().handler(async (params: any) => {
  const name = params.user.name; // Error if user is undefined
  return { name };
});

// ✅ Solution - defensive programming
export const server2 = new Server().handler(async (params: any) => {
  const user = params.user || {};
  const name = user.name || "Anonymous";
  return { name };
});
```

### Debugging tips

1. **Enable browser console relay**: `new Server({ development: { console: true } })`
2. **Use console.log**: Add logging to understand data flow
3. **Check browser network tab**: Verify component requests and responses
4. **Validate JSON**: Ensure your callback data is valid JSON
5. **Test parameters**: Use `oc preview` to test different parameter combinations

### Type inference (optional)

For automatic type inference between server and client, add this to `src/entry.server.ts`:

```ts
declare module "oc-server" {
  interface Register {
    server: typeof server;
  }
}
```

## Legacy (deprecated): server.js with callbacks

This older style is still supported for existing components, but new code should use `Server` as shown above.

```js
// server.js (legacy)
module.exports.data = function (context, callback) {
  const name = context.params.name || "Guest";
  callback(null, { name });
};
```

## Next Steps

- **[Learn package.json structure](package.json-structure)** - Configure your component properly
- **[Master the CLI](cli)** - Efficient development workflow
- **[Publishing guide](publishing-to-a-registry)** - Deploy your components
- **[Client-side operations](../consumers/rendering-lifecycle)** - Browser integration patterns
