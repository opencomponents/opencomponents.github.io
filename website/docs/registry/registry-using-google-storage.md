---
sidebar_position: 2
---

# Registry using Google Storage

To use Google Storage make sure you have an account and credentials. When running on a server don't forget to set your `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your authentication json.

[Setting Up Authentication for Server to Server Production Applications](https://cloud.google.com/docs/authentication/production)

Install the oc-gs-storage-adapter

```
npm install oc-gs-storage-adapter --save
```

Then on the entry point, what you need on an `index.js` file is:

```js
var oc = require("oc");
var gs = require("oc-gs-storage-adapter");

var configuration = {
  verbosity: 0,
  baseUrl: "https://my-components-registry.mydomain.com/",
  port: 3000,
  tempDir: "./temp/",
  refreshInterval: 600,
  pollingInterval: 5,
  storage: {
    adapter: gs,
    options: {
      projectId: "myproject-12345",
      bucket: "my_bucket",
      path: "//storage.googleapis.com/my_bucket/",
      componentsDir: "components",
      maxAge: 3600,
    },
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
