---
sidebar_position: 1
---

# Registry configuration

## Introduction

The registry is a REST api that serves the components. You can have multiple registries connected to a library, but you can't have multiple libraries connected to a registry.

## Setup

First, create a dir and install oc:

```sh
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

Creates an instance of the registry. [Configuration](#registry-configuration) is an object that contains the registry configuration parameters.

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

## Registry configuration

| Parameter                                   | Type                   | Mandatory | Description                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <sub>baseUrl</sub>                          | string                 | yes       | sets the URL which will be used to compose the components' URLs. This needs to be the registry's public url                                                                                                                                                                                      |
| <sub>customHeadersToSkipOnWeakVersion</sub> | `array`                | no        | the custom headers to skip when serving a component requested by a weak version (eg. 1.x.x rather than 1.2.3). This is useful, for instance, in case of components that have quite static logic, setting cache headers - so that it makes sense in order to implement reactive consumers' caches |
| <sub>dependencies</sub>                     | array                  | no        | the npm modules available for components logic                                                                                                                                                                                                                                                   |
| <sub>discovery</sub>                        | boolean                | no        | Enable registry UI. Default: true                                                                                                                                                                                                                                                                |
| <sub>env</sub>                              | object                 | no        | sets the registry environment                                                                                                                                                                                                                                                                    |
| <sub>env.name</sub>                         | string                 | no        | sets the environment name                                                                                                                                                                                                                                                                        |
| <sub>executionTimeout</sub>                 | number (seconds)       | no        | timeout for component's server execution time                                                                                                                                                                                                                                                    |
| <sub>fallbackRegistryUrl</sub>              | string (url)           | no        | Url to another registry which will be used by current registry when component cannot be found in current registry                                                                                                                                                                                |
| <sub>keepAliveTimeout</sub>                 | number (milliseconds)  | no        | Keep Alive Timeout for HTTP server. Default: `5000`                                                                                                                                                                                                                                              |
| <sub>pollingInterval</sub>                  | number (seconds)       | no        | When the components' list cache will be refreshed. This is required for distributing the components on each registry instance. Given the polling mechanism is quite efficient, this number should be very low. Suggested is around 5-10 seconds.                                                 |
| <sub>port</sub>                             | number                 | no        | default `3000`, sets the port where to start the registry                                                                                                                                                                                                                                        |
| <sub>postRequestPayloadSize</sub>           | string                 | no        | Sets the limit for the post body size. Example: `50mb`. When unset, the limit is 100KB                                                                                                                                                                                                           |
| <sub>prefix</sub>                           | string                 | no        | sets the href prefix, for example: `/v2/`                                                                                                                                                                                                                                                        |
| <sub>publishAuth</sub>                      | object                 | no        | sets the authentication parameters for publishing a component to the registry. When `undefined`, no authorisation is required.                                                                                                                                                                   |
| <sub>publishAuth.type</sub>                 | string                 | no        | The authorisation type. Only `basic` is supported at the moment.                                                                                                                                                                                                                                 |
| <sub>publishAuth.username</sub>             | string                 | no        | sets the user name                                                                                                                                                                                                                                                                               |
| <sub>publishAuth.password</sub>             | string                 | no        | sets the user password                                                                                                                                                                                                                                                                           |
| <sub>publishValidation</sub>                | function               | no        | Used to validate package.json when components is published. [Look at the example](#publish-validation-example)                                                                                                                                                                                   |
| <sub>refreshInterval</sub>                  | number (seconds)       | no        | When the components' data cache will be refreshed. Given the data is immutable, this should be high and just for robustness.                                                                                                                                                                     |
| <sub>routes</sub>                           | array of objects       | no        | sets additional actions via URL mapping to specific action handlers                                                                                                                                                                                                                              |
| <sub>routes[index].route</sub>              | string                 | no        | sets URL pattern. Routes should be outside of the components' namespace (which you can set by using the `prefix` parameter.)                                                                                                                                                                     |
| <sub>routes[index].method</sub>             | string                 | no        | sets verb                                                                                                                                                                                                                                                                                        |
| <sub>routes[index].handler</sub>            | function               | no        | sets function handler for routed action [Look at the example](#routes-example)                                                                                                                                                                                                                   |
| <sub>s3</sub>                               | object                 | yes       | sets the Amazon S3 credentials                                                                                                                                                                                                                                                                   |
| <sub>s3.agentProxy</sub>                    | instance of http agent | no        | allows to interact with aws API via a custom agent and a proxy. Usage: `agentProxy = require('proxy-agent')('https://yourproxy.com');`                                                                                                                                                           |
| <sub>s3.bucket</sub>                        | string                 | yes       | sets S3 bucket                                                                                                                                                                                                                                                                                   |
| <sub>s3.componentsDir</sub>                 | string                 | yes       | the path where the data will be saved inside the bucket                                                                                                                                                                                                                                          |
| <sub>s3.key</sub>                           | string                 | no        | sets S3 access key. User should either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2                                                                                                                                                                    |
| <sub>s3.path</sub>                          | string                 | yes       | sets the path that will be used for composing static resources' urls. Can be the s3 url, or, when using cloudfront, it can be `//cloudfront-id.cloudfront.net/`. Signature should not include the protocol                                                                                       |
| <sub>s3.region</sub>                        | string                 | yes       | sets S3 region                                                                                                                                                                                                                                                                                   |
| <sub>s3.secret</sub>                        | string                 | no        | sets S3 secret. User should either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2                                                                                                                                                                        |
| <sub>s3.timeout</sub>                       | number (milliseconds)  | no        | default `10000`, optionally sets the timeout for s3 requests.                                                                                                                                                                                                                                    |
| <sub>tempDir</sub>                          | string                 | no        | default `./temp/`, sets the directory where the components' packages are temporarily stored during the publishing phase inside the registry box                                                                                                                                                  |
| <sub>templates</sub>                        | array                  | no        | the templates available allowed on the registry. Will extend the default base templates of [require('oc-template-jade'), require('oc-template-handlebars')]                                                                                                                                      |
| <sub>timeout</sub>                          | number (milliseconds)  | no        | Socket timeout for HTTP server. Default: `0`                                                                                                                                                                                                                                                     |
| <sub>verbosity</sub>                        | number                 | no        | default `0`, sets the `console.log` verbosity during the execution                                                                                                                                                                                                                               |

### Publish validation example

```js
options.publishValidation = function (package) {
  var isValid =
    !!package.author && !!package.repository && !!package.description;

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

Plugins are a way to extend registry's context allowing components to inherit custom functionalities.

This is a plugin example:

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

This is how to register it in a registry:

```js
// ./registry/init.js
...
var registry = new oc.Registry(configuration);

registry.register({
  name: 'getFeatureSwitch',
  register: require('./oc-plugins/hobknob'),
  options: {
      connectionString: connectionString
  }
});
...
```

This is how to use a plugin from a component:

```js
// ./my-component/server.js
module.exports.data = function (context, callback) {
  callback(null, {
    variable: context.plugins.getFeatureSwitch("AbTestHomePage"),
  });
};
```

This is how to depend on (and use) other plugins:

```js
// ./registry/oc-plugins/hobknob.js
var connection,
  client = require("./hobknob-client");

module.exports.dependencies = ["log", "otherplugin"];

module.exports.register = function (options, dependencies, next) {
  // this register function is only called after all dependencies are registered
  client.connect(options.connectionString, function (err, conn) {
    connection = conn;
    dependencies.log("hobknob client initialised");
    next();
  });
};

module.exports.execute = function (featureName) {
  return connection.get(featureName);
};
```
