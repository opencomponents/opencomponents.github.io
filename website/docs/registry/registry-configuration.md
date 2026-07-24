# Registry Configuration

## Introduction

The registry is a REST api that serves the components. You can have multiple registries connected to a library, but you can't have multiple libraries connected to a registry.

## Setup

First, create a dir and install oc:

```bash
mkdir oc-registry && cd oc-registry
npm init
npm install oc --save
touch index.js
```

For Google Storage registry configuration's documentation, [look at this page](/docs/registry/registry-using-google-storage).

This is the `index.js` content:

```js
var oc = require("oc");

var configuration = {
  verbosity: 0,
  baseUrl: "https://my-components-registry.mydomain.com/",
  port: 3000,
  tempDir: "./temp/",
  refreshInterval: 600,
  pollingInterval: 5,
  s3: {
    key: "your-s3-key",
    secret: "your-s3-secret",
    bucket: "your-s3-bucket",
    region: "your-s3-region",
    path: "//s3.amazonaws.com/your-s3-bucket/",
    componentsDir: "components",
  },
  env: { name: "production" },
};

var registry = new oc.Registry(configuration);

registry.start(function (err, app) {
  if (err) {
    console.log("Registry not started: ", err);
    process.exit(1);
  }
});
```

## API

### var registry = new oc.Registry(configuration);

Creates an instance of the registry. [Configuration](#configuration-reference) is an object that contains the registry configuration parameters.

### registry.start(callback)

Starts the registry.

### registry.off(eventName, callback);

For unsubscribing to an [event](#registry-events).

### registry.on(eventName, callback);

For subscribing to an [event](#registry-events).

### registry.register(plugin [, callback]);

Register a [plugin](#plugins).
The plugin parameter has to be a [valid plugin](#plugins).

```js
registry.register({
  name: "doSomething",
  register: require("my-oc-plugin"),
  options: {
    configuration: "value",
  },
});
```

### registry.reset(eventName);

For unsuscribing to all [events](#registry-events).

## Configuration reference

### Core Configuration Options

| Parameter                   | Type                  | Mandatory | Default  | Description                                                                                                                                                                                                                               |
| --------------------------- | --------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <sub>baseUrl</sub>          | string                | yes       | -        | Public base URL where the registry is reachable by consumers. Must include the configured `prefix` at the end (e.g. `https://components.mycompany.com/` if `prefix` is `/`). When it doesn't, the sanitiser will automatically append it. |
| <sub>baseUrlFunc</sub>      | function              | no        | -        | Dynamically compute the `baseUrl` for the incoming request. If provided, it overrides the static `baseUrl`. Function signature: `(opts: { host?: string; secure: boolean }) => string`                                                    |
| <sub>port</sub>             | number                | no        | `3000`   | Port the HTTP server listens on. Can also be set via `process.env.PORT`                                                                                                                                                                   |
| <sub>prefix</sub>           | string                | no        | `"/"`    | URL path prefix appended to every registry endpoint. Must start and end with a slash (e.g. `/`, `/components/`)                                                                                                                           |
| <sub>verbosity</sub>        | number                | no        | `0`      | Verbosity level of the console logger (0 = silent)                                                                                                                                                                                        |
| <sub>timeout</sub>          | number (milliseconds) | no        | `120000` | HTTP request timeout in milliseconds                                                                                                                                                                                                      |
| <sub>keepAliveTimeout</sub> | number (milliseconds) | no        | `5000`   | Milliseconds the HTTP server keeps idle connections alive                                                                                                                                                                                 |
| <sub>server</sub>           | object                | no        | Express adapter | Opt-in [HTTP server adapter](/docs/registry/registry-server-adapters) configuration. Lets you swap the registry's underlying HTTP server (e.g. Fastify) instead of the default Express. Absent → Express (default)               |

### Storage and Caching Options

| Parameter                   | Type                   | Mandatory | Default     | Description                                                                                                                                                                              |
| --------------------------- | ---------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <sub>s3</sub>               | object                 | no        | -           | Convenience S3 configuration – if present the registry will create a storage adapter automatically                                                                                       |
| <sub>s3.bucket</sub>        | string                 | yes\*     | -           | S3 bucket name (\*required if using s3)                                                                                                                                                  |
| <sub>s3.region</sub>        | string                 | yes\*     | -           | S3 region (\*required if using s3)                                                                                                                                                       |
| <sub>s3.key</sub>           | string                 | no        | -           | S3 access key. Either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2                                                                             |
| <sub>s3.secret</sub>        | string                 | no        | -           | S3 secret. Either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2                                                                                 |
| <sub>s3.componentsDir</sub> | string                 | yes\*     | -           | Path where the data will be saved inside the bucket (\*required if using s3)                                                                                                             |
| <sub>s3.path</sub>          | string                 | yes\*     | -           | Path used for composing static resources' URLs. Can be the S3 URL, or when using CloudFront: `//cloudfront-id.cloudfront.net/`. Should not include the protocol (\*required if using s3) |
| <sub>s3.timeout</sub>       | number (milliseconds)  | no        | `10000`     | Timeout for S3 requests                                                                                                                                                                  |
| <sub>s3.agentProxy</sub>    | instance of http agent | no        | -           | Custom agent for interacting with AWS API via proxy. Usage: `agentProxy = require('proxy-agent')('https://yourproxy.com');`                                                              |
| <sub>storage</sub>          | object                 | no        | -           | Low-level storage adapter configuration. Use this for non-S3 storage adapters                                                                                                            |
| <sub>storage.adapter</sub>  | function               | yes\*     | -           | Storage adapter function that returns a StorageAdapter instance (\*required if using storage)                                                                                            |
| <sub>storage.options</sub>  | object                 | yes\*     | -           | Options passed to the storage adapter, must include `componentsDir` (\*required if using storage)                                                                                        |
| <sub>metadata</sub>         | object                 | no        | -           | Opt-in [metadata store](/docs/registry/registry-metadata-stores) configuration. When present, the registry uses a pluggable database as the source of truth for the component index instead of scanning storage. Absent → storage-only mode (default) |
| <sub>refreshInterval</sub>  | number (seconds)       | no        | -           | Seconds between each refresh of the internal component list cache. Given the data is immutable, this should be high and just for robustness                                              |
| <sub>pollingInterval</sub>  | number (seconds)       | no        | `5`         | Seconds between each poll of the storage adapter for changes. Should be low (5-10 seconds) for efficient distribution                                                                    |
| <sub>tempDir</sub>          | string                 | no        | `"./temp/"` | Directory where components' packages are temporarily stored during publishing                                                                                                            |

### Development and Discovery Options

| Parameter                 | Type              | Mandatory | Default   | Description                                                                                                                                                 |
| ------------------------- | ----------------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <sub>discovery</sub>      | boolean           | no        | `true`    | Enables the HTML discovery page and `/components` endpoint                                                                                                  |
| <sub>discoveryFunc</sub>  | function          | no        | -         | Function to decide whether discovery should be enabled for the current request. Function signature: `(opts: { host?: string; secure: boolean }) => boolean` |
| <sub>local</sub>          | boolean           | no        | -         | Enables **local development mode** (what `oc dev` sets). Not a storage selector — see [Local development mode](#local-development-mode)                     |
| <sub>path</sub>           | string            | no        | -         | Absolute path where local components are stored (required when `local` is `true`)                                                                            |
| <sub>hotReloading</sub>   | boolean           | no        | `!!local` | Enables hot-reloading of component code. Defaults to `true` when `local` is `true`                                                                            |
| <sub>liveReloadPort</sub> | number            | no        | -         | TCP port of the LiveReload server used by the preview page                                                                                                  |
| <sub>compileClient</sub>  | boolean or object | no        | `true`    | Set options for the oc-client-browser compilation. Set to `false` to disable client compilation, or provide options object for custom compilation settings  |

### Authentication and Security Options

| Parameter                                | Type                  | Mandatory | Default   | Description                                                                                                                                                                                                                       |
| ---------------------------------------- | --------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <sub>publishAuth</sub>                   | object                | no        | -         | Authentication strategy for component publishing. When `undefined`, no authorization is required                                                                                                                                  |
| <sub>publishAuth.type</sub>              | string                | no        | -         | Authentication type. Supports `"basic"` or custom authentication objects                                                                                                                                                          |
| <sub>publishAuth.username</sub>          | string                | no        | -         | Username for basic authentication (when type is `"basic"`)                                                                                                                                                                        |
| <sub>publishAuth.password</sub>          | string                | no        | -         | Password for basic authentication (when type is `"basic"`)                                                                                                                                                                        |
| <sub>publishAuth.logins</sub>            | array                 | no        | -         | Array of login objects for multiple users: `[{ username: "user1", password: "pass1" }, ...]` (when type is `"basic"`)                                                                                                             |
| <sub>publishValidation</sub>             | function              | no        | -         | Custom validation logic executed during component publishing. Function signature: `(pkgJson: unknown, context: { user?: string }) => { isValid: boolean; error?: string } \| boolean`. [See example](#publish-validation-example) |
| <sub>publishRateLimit</sub>              | object                | no        | -         | Rate-limiting configuration for component publishing. When `undefined`, no throttling is applied                                                                                                                                  |
| <sub>publishRateLimit.windowMs</sub>     | number (milliseconds) | no        | `900000`  | Size of the sliding window used for rate limiting. Defaults to 15 minutes                                                                                                                                                         |
| <sub>publishRateLimit.max</sub>          | number                | no        | `100`     | Maximum number of publish requests allowed within `windowMs`                                                                                                                                                                      |
| <sub>publishRateLimit.keyGenerator</sub> | function              | no        | -         | Function that returns the identifier used for counting hits (defaults to `${req.ip}:${req.user ?? 'anon'}`). Signature: `(req: Request) => string`                                                                                |
| <sub>publishRateLimit.skip</sub>         | function              | no        | -         | Predicate to bypass throttling for specific requests/users. Signature: `(req: Request) => boolean`                                                                                                                                |
| <sub>publishRateLimit.store</sub>        | object                | no        | In-memory | Custom storage backend implementing the `RateLimitStore` interface                                                                                                                                                                |
| <sub>publishRateLimit.maxCacheSize</sub> | number                | no        | `1000`    | Maximum number of rate-limit entries the default in-memory store keeps                                                                                                                                                            |

### Component and Template Options

| Parameter                   | Type             | Mandatory | Default | Description                                                                                                                      |
| --------------------------- | ---------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <sub>components</sub>       | array            | no        | -       | Restricts the registry to serve only the specified component names. Useful for component-specific registries                     |
| <sub>dependencies</sub>     | array            | no        | `[]`    | Names of npm packages that components can `require` at runtime. Example: `["lodash", "moment"]`                                  |
| <sub>templates</sub>        | array            | no        | `[]`    | List of template engines available for rendering components. Extends the default base templates                                  |
| <sub>executionTimeout</sub> | number (seconds) | no        | -       | Maximum execution time of a component's server-side logic in seconds. When the timeout elapses, the registry returns a 500 error |
| <sub>tarExtractMode</sub>   | number (octal)   | no        | `0o766` | File and directory mode (octal) applied when extracting tarballs during publishing                                               |

### Advanced Options

| Parameter                                   | Type             | Mandatory | Default | Description                                                                                                                                                                                           |
| ------------------------------------------- | ---------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <sub>env</sub>                              | object           | no        | `{}`    | Environment variables passed to components in `context.env`                                                                                                                                           |
| <sub>fallbackRegistryUrl</sub>              | string (url)     | no        | -       | URL of a secondary registry that will be queried if a component cannot be found on this instance. A trailing slash is appended automatically                                                          |
| <sub>customHeadersToSkipOnWeakVersion</sub> | array            | no        | `[]`    | List of header names (lower-case) to omit from the response when a fallback/weak component version is served (e.g. 1.x.x rather than 1.2.3). Useful for cache headers on components with static logic |
| <sub>postRequestPayloadSize</sub>           | string           | no        | -       | Maximum allowed `Content-Length` for publish requests. Accepts any value supported by the `bytes` module (e.g. "10mb", "50mb"). When unset, the limit is 100KB                                        |
| <sub>routes</sub>                           | array of objects | no        | -       | Additional Express routes to mount on the registry application. [See example](#routes-example)                                                                                                        |
| <sub>routes[].route</sub>                   | string           | yes\*     | -       | URL pattern for the route. Should be outside of the components' namespace (\*required for each route)                                                                                                 |
| <sub>routes[].method</sub>                  | string           | yes\*     | -       | HTTP method for the route (e.g. "get", "post") (\*required for each route)                                                                                                                            |
| <sub>routes[].handler</sub>                 | function         | yes\*     | -       | Express-compatible handler function for the route (\*required for each route)                                                                                                                         |
| <sub>plugins</sub>                          | object           | no        | `{}`    | Collection of plugins initialized for this registry instance. Populated via `registry.register(...)`                                                                                                  |

## Configuration Examples

### Basic Registry Configuration

```js
var oc = require("oc");

var configuration = {
  baseUrl: "https://components.mycompany.com/",
  port: 3000,
  verbosity: 1,
  discovery: true,
  s3: {
    bucket: "my-components-bucket",
    region: "us-east-1",
    componentsDir: "components",
    path: "//s3.amazonaws.com/my-components-bucket/",
  },
};

var registry = new oc.Registry(configuration);
registry.start();
```

### Advanced Configuration with Authentication

```js
var oc = require("oc");

var configuration = {
  baseUrl: "https://components.mycompany.com/",
  port: 3000,
  verbosity: 1,

  // Authentication for publishing
  publishAuth: {
    type: "basic",
    logins: [
      { username: "developer1", password: "secure-password-1" },
      { username: "developer2", password: "secure-password-2" },
    ],
  },

  // Custom validation
  publishValidation: function (packageJson, context) {
    if (!packageJson.author || !packageJson.description) {
      return {
        isValid: false,
        error: "Package must have author and description",
      };
    }
    return { isValid: true };
  },

  // Storage configuration
  s3: {
    bucket: "my-components-bucket",
    region: "us-east-1",
    componentsDir: "components",
    path: "//cloudfront-id.cloudfront.net/",
  },

  // Runtime dependencies
  dependencies: ["lodash", "moment", "axios"],

  // Environment variables
  env: {
    NODE_ENV: "production",
    API_BASE_URL: "https://api.mycompany.com",
  },
};

var registry = new oc.Registry(configuration);
registry.start();
```

### Local Development Configuration

Prefer `oc dev` over hand-rolling this. The CLI starts a registry with `local: true` and the right defaults for day-to-day component work.

```js
var oc = require("oc");

var configuration = {
  baseUrl: "http://localhost:3000/",
  port: 3000,
  verbosity: 2,
  local: true,
  path: "./components",
  hotReloading: true,
  discovery: true,
  liveReloadPort: 35729,
  compileClient: true,
};

var registry = new oc.Registry(configuration);
registry.start();
```

#### Local development mode

`local: true` turns on **local development mode**. It is **not** a toggle between "filesystem storage" and "remote storage" that you would flip in staging or production.

When `local` is `true`, the registry:

- Serves components from a local directory (`path`) instead of a storage adapter
- **Disables publishing** — components cannot be published to a local registry
- Enables hot-reloading of component code (unless you override `hotReloading`)
- Forwards component `console.*` calls to the process console (so `console.log` in `server.js` is visible while developing)
- Sets `NODE_ENV` to `development` inside the component sandbox
- Surfaces richer server-side error details (including processed stack frames) in responses and logs
- Skips storage/metadata validation that production registries require

Do **not** set `local: true` on a deployed registry to get component logs or filesystem-like behaviour. You will lose publishing and change other production semantics. For intentional logging outside `oc dev`, use a [logging plugin](#logging-from-components).

### Custom Storage Adapter Configuration

```js
var oc = require("oc");
var customStorageAdapter = require("my-custom-storage-adapter");

var configuration = {
  baseUrl: "https://components.mycompany.com/",
  port: 3000,
  storage: {
    adapter: customStorageAdapter,
    options: {
      componentsDir: "components",
      connectionString: "mongodb://localhost:27017/components",
      // other adapter-specific options
    },
  },
  refreshInterval: 300,
  pollingInterval: 10,
};

var registry = new oc.Registry(configuration);
registry.start();
```

### Publish Rate Limit Configuration

```js
var oc = require("oc");

var configuration = {
  baseUrl: "https://components.mycompany.com/",
  port: 3000,

  // Throttle component publishing to max 50 requests per 10-minute window
  publishRateLimit: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50,
    // Optional fine-tuning examples:
    // keyGenerator: (req) => `${req.ip}:${req.user ?? 'anon'}`,
    // skip: (req) => req.user === "ci-bot",            // allow automated CI
    // store: new RedisRateLimitStore(),                  // pluggable backend
    // maxCacheSize: 5000,
  },
};

var registry = new oc.Registry(configuration);
registry.start();
```

### Publish validation example

```js
options.publishValidation = function (packageJson, context) {
  var isValid =
    !!packageJson.author &&
    !!packageJson.repository &&
    !!packageJson.description;

  if (isValid) {
    // Can return boolean
    return true;
  } else {
    // Can return object with error so that it will be propagated to the user
    return {
      isValid: false,
      error:
        "Package.json is missing mandatory params: author, repository, description",
    };
  }
};

// Advanced validation example with context
options.publishValidation = function (packageJson, context) {
  // Access the authenticated user
  var user = context.user;

  // Validate based on user permissions
  if (user === "admin") {
    return { isValid: true };
  }

  // Regular users have restrictions
  if (!packageJson.name.startsWith("user-components/")) {
    return {
      isValid: false,
      error:
        "Regular users can only publish components with 'user-components/' prefix",
    };
  }

  return { isValid: true };
};
```

### Routes example

```js
options.routes = [
  {
    route: "/example-route",
    method: "get",
    handler: function (req, res) {
      // Handling function content
    },
  },
];
```

## Registry events

| Event name          | Callback Data Type | Description                                                                                                                                                                                                                                                  |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cache-poll          | object             | Fired when the components list is refreshed. The callback data contains the last edit unix utc timestamp.                                                                                                                                                    |
| component-retrieved | object             | Fired when the component is retrieved. This includes the component's validation, data gathering and execution, view retrieving, and (when requested) rendering. The callback data contains the duration, component details, and, in case, the error details. |
| error               | object             | Fired when an internal operation errors.                                                                                                                                                                                                                     |
| request             | object             | Fired every time the registry receives a request. The callback data contains some request and response details.                                                                                                                                              |
| start               | undefined          | Fired when the registry starts                                                                                                                                                                                                                               |

## Plugins

Plugins are a way to extend registry's context allowing components to inherit custom functionalities. They can be configured to receive component context information (name and version) when needed for enhanced security and decision-making capabilities.

### Plugin Structure

A plugin consists of two main parts:

- **register**: Function called during plugin initialization
- **execute**: Function that provides the actual plugin functionality
- **context** (optional): Boolean flag to enable component context awareness

### Basic Plugin Example

This is a basic plugin example without context awareness:

```js
// ./registry/oc-plugins/hobknob.js
var connection,
  client = require("./hobknob-client");

module.exports.register = function (options, dependencies, next) {
  client.connect(options.connectionString, function (err, conn) {
    connection = conn;
    next();
  });
};

module.exports.execute = function (featureName) {
  return connection.get(featureName);
};
```

### Context-Aware Plugin Example

When you need to make decisions based on which component is calling the plugin, you can enable context awareness:

```js
// ./registry/oc-plugins/feature-flags.js
var connection,
  client = require("./feature-flags-client");

module.exports.register = function (options, dependencies, next) {
  client.connect(options.connectionString, function (err, conn) {
    connection = conn;
    next();
  });
};

// With context: true, execute receives component context and returns a function
module.exports.execute = function (context) {
  // context contains: { name: "component-name", version: "1.2.3" }
  return function (featureName) {
    // Validate if this component is allowed to access this feature
    if (
      context.name.startsWith("internal/") &&
      featureName.startsWith("public/")
    ) {
      throw new Error("Internal components cannot access public features");
    }

    // Log feature access for audit purposes
    console.log(
      `Component ${context.name}@${context.version} accessing feature: ${featureName}`
    );

    return connection.get(featureName);
  };
};
```

### Plugin Registration

This is how to register plugins in a registry. Context awareness is enabled with `context: true` on the **registration** object (not on the plugin module):

```js
// ./registry/init.js
var oc = require("oc");
var registry = new oc.Registry(configuration);

// Register a basic plugin
registry.register({
  name: "getFeatureSwitch",
  register: require("./oc-plugins/hobknob"),
  options: {
    connectionString: connectionString,
  },
});

// Register a context-aware plugin
registry.register({
  name: "getSecureFeature",
  context: true,
  register: require("./oc-plugins/feature-flags"),
  options: {
    connectionString: connectionString,
  },
});
```

### Using Plugins from Components

Components use plugins the same way regardless of whether they have context awareness:

```js
// ./my-component/server.js
module.exports.data = function (context, callback) {
  callback(null, {
    // Basic plugin usage
    basicFeature: context.plugins.getFeatureSwitch("AbTestHomePage"),

    // Context-aware plugin usage (same interface)
    secureFeature: context.plugins.getSecureFeature("AdminPanel"),
  });
};
```

### Logging from components

Outside `oc dev`, component `console.log` / `console.error` / etc. are discarded. That is intentional: the registry sandbox does not ship every component's unstructured console output into production process logs.

`local: true` is not a production logging switch (see [Local development mode](#local-development-mode)). For logging in staging or production, register a plugin and call it from `server.js`.

A minimal context-aware logger:

```js
// ./registry/oc-plugins/log.js
var logger;

module.exports.register = function (options, dependencies, next) {
  // options.logger is your real logger (pino, winston, Datadog client, ...)
  logger = options.logger;
  next();
};

// With context: true on registry.register(...), execute receives component
// context and returns the function exposed as context.plugins.log(...)
module.exports.execute = function (context) {
  return function (level, message, meta) {
    logger[level]({
      component: context.name,
      version: context.version,
      message: message,
      ...(meta || {}),
    });
  };
};
```

Register it on the registry (note `context: true` on the registration object):

```js
registry.register({
  name: "log",
  context: true,
  register: require("./oc-plugins/log"),
  options: {
    logger: myLogger, // your structured logger
  },
});
```

Declare and use it from the component:

```js
// package.json (component)
// "oc": { "plugins": ["log"] }

// server.js
module.exports.data = function (context, callback) {
  context.plugins.log("info", "fetching user", { id: context.params.userId });

  // ...

  callback(null, {
    /* view model */
  });
};
```

Why a plugin instead of turning on `console` in production:

- **Opt-in** — only components that call the plugin pay the cost
- **Structured** — level, message, and metadata can go to your monitoring stack
- **Scoped** — with `context: true`, every line can include component name and version
- **Controlled** — the registry owns sampling, redaction, and destinations

`verbosity` only controls the registry's own access/process logging. It does not enable component sandbox `console` output.

### When to Use Context Awareness

Context awareness is useful when you need to:

1. **Security Validation**: Restrict certain components from accessing specific features
2. **Audit Logging**: Track which components are using which features
3. **Component-Specific Logic**: Provide different behavior based on component name/version
4. **Rate Limiting**: Apply different limits per component
5. **Feature Rollouts**: Enable features only for specific components or versions

### Advanced Context-Aware Plugin Example

Here's a more sophisticated example that demonstrates multiple use cases:

```js
// ./registry/oc-plugins/advanced-feature-manager.js
var connection,
  client = require("./feature-manager-client");

module.exports.register = function (options, dependencies, next) {
  client.connect(options.connectionString, function (err, conn) {
    connection = conn;
    next();
  });
};

module.exports.execute = function (context) {
  return function (featureName, options = {}) {
    // Security: Check component permissions
    const componentPermissions = getComponentPermissions(context.name);
    if (!componentPermissions.canAccess(featureName)) {
      throw new Error(
        `Component ${context.name} is not authorized to access ${featureName}`
      );
    }

    // Audit: Log all feature access
    logFeatureAccess({
      component: context.name,
      version: context.version,
      feature: featureName,
      timestamp: new Date().toISOString(),
    });

    // Rate limiting: Apply different limits per component
    const rateLimit = getRateLimit(context.name, featureName);
    if (isRateLimited(context.name, featureName, rateLimit)) {
      throw new Error(
        `Rate limit exceeded for ${context.name} accessing ${featureName}`
      );
    }

    // Version-specific logic
    if (context.version.startsWith("2.")) {
      // New API for v2+ components
      return connection.getV2(featureName, options);
    } else {
      // Legacy API for older components
      return connection.getV1(featureName);
    }
  };
};
```

Register with `context: true`:

```js
registry.register({
  name: "advancedFeatureManager",
  context: true,
  register: require("./oc-plugins/advanced-feature-manager"),
});
```

### Plugin Dependencies

Plugins can depend on other plugins, and context awareness works with dependencies:

```js
// ./registry/oc-plugins/secure-logger.js
var connection,
  client = require("./logger-client");

module.exports.dependencies = ["log", "otherplugin"];

module.exports.register = function (options, dependencies, next) {
  // This register function is only called after all dependencies are registered
  client.connect(options.connectionString, function (err, conn) {
    connection = conn;
    dependencies.log.handler("secure logger client initialized");
    next();
  });
};

module.exports.execute = function (context) {
  return function (message, level = "info") {
    // Add component context to all log messages
    const enrichedMessage = {
      component: context.name,
      version: context.version,
      message: message,
      level: level,
      timestamp: new Date().toISOString(),
    };

    return connection.log(enrichedMessage);
  };
};
```

```js
registry.register({
  name: "secureLogger",
  context: true,
  register: require("./oc-plugins/secure-logger"),
  options: {
    connectionString: connectionString,
  },
});
```

### Plugin Configuration Options

| Property   | Type    | Required | Default | Description                                       |
| ---------- | ------- | -------- | ------- | ------------------------------------------------- |
| `name`     | string  | yes      | -       | Unique identifier for the plugin                  |
| `register` | object  | yes      | -       | Plugin module with register and execute functions |
| `options`  | object  | no       | `{}`    | Configuration options passed to the plugin        |
| `context`  | boolean | no       | `false` | Enable component context awareness on `registry.register(...)` |

### Context Object Structure

When `context: true` is set on `registry.register(...)`, the context object passed to the execute function contains:

```js
{
  name: "component-name",      // The name of the component calling the plugin
  version: "1.2.3"            // The version of the component calling the plugin
}
```
