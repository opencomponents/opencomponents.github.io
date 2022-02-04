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
    "type": "oc-template-handlebars",
    "key": "cad2a9671257d5033d2abfd739b1660993021d02"
  },
  "type": "oc-component",
  "renderMode": "unrendered"
}
```

In this case you get the compiled view + the data, and you can do the rendering, eventually, interpolating the view-model data and rendering the compiled view with it.

When retrieving multiple components, a [batch POST endpoint](/docs/consumers/batch-endpoint) allows to make a single request to the API.

- [Javascript browser client](https://github.com/opencomponents/oc-client-browser)
- [Javascript Node.js client](https://github.com/opencomponents/oc-client-node)
- [PHP client](https://github.com/opencomponents/oc-client-php)
- [Ruby client](https://github.com/opencomponents/ruby-oc)
- [Rails client](https://github.com/opencomponents/opencomponents-rails)
- [Sinatra client](https://github.com/opencomponents/sinatra-opencomponents)
