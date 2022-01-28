---
sidebar_position: 3
---

# Structure of package.json

The basic package file `package.json` looks as follows:

```js
{
  "name": "hello-world",
  "description": "description of my hello-world component",
  "version": "1.0.0",
  "oc": {
    "files": {
      "data": "server.js",
      "template": {
        "src": "template.hbs",
        "type": "oc-template-handlebars"
      }
    }
  },
  "devDependencies": {
    "oc-template-handlebars-compiler": "6.0.8"
  }
}
```

| Parameter                        | Type               | Description                                                                                                                                                                    |
| -------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                           | `string`           | the component's name, by default the name of initialised component                                                                                                             |
| `description`                    | `string`           | the component's description, by default an empty string                                                                                                                        |
| `version`                        | `string`           | the component's version, by default `1.0.0`                                                                                                                                    |
| `author`                         | `string`           | the component's author - suggested format is `John Doe <john@doe.com>`                                                                                                         |
| `repository`                     | `string`           | the component's repository                                                                                                                                                     |
| `dependencies`                   | `object`           | the npm modules the component requires                                                                                                                                         |
| `devDependencies`                | `object`           | the npm modules the component requires in order to be developed. By convention a component of templateTypeX will require a devDependency called templateTypeX-compiler to work |
| `oc`                             | `object`           | the data involved with the component                                                                                                                                           |
| `oc.container`                   | `boolean`          | forces the component to be server-side rendered without being wrapped inside the `<oc-component />` tag.                                                                       |
| `oc.files`                       | `object`           | non-static component files                                                                                                                                                     |
| `oc.files.data`                  | `string`           | the model provider's filename, by default `server.js`                                                                                                                          |
| `oc.files.template`              | `object`           | represents the data involved with template - view, template engine                                                                                                             |
| `oc.files.template.src`          | `string`           | the view's filename, by default template.html                                                                                                                                  |
| `oc.files.template.type`         | `string`           | the template engine's type, by default `handlebars`                                                                                                                            |
| `oc.files.static`                | `array of strings` | An array of directories that contain static resources referenced from the component's markup                                                                                   |
| `oc.minify`                      | `boolean`          | Default `true`, will minify static css and js files during publishing                                                                                                          |
| `oc.parameters`                  | `object`           | Describes the component's api. Used to auto-generate documentation and get requests validation. Each `key` is the parameter name                                               |
| `oc.parameters[key].mandatory`   | `boolean`          | Default `false`, if `true`, any request that does not include a valid value will be rejected with a `400` code.                                                                |
| `oc.parameters[key].type`        | `string`           | Type of parameter, used for a basic validation check Allowed types are `string`, `boolean`, `number`. When parameter is not valid, request will be rejected with a `400` code  |
| `oc.parameters[key].description` | `string`           | Used for auto-generated documentation                                                                                                                                          |
| `oc.parameters[key].example`     | `string`           | Used for auto-generated documentation                                                                                                                                          |
| oc.parameters[key].default       | \*                 | Default value of optional parameter - applied when value is not specified in the request                                                                                       |
| `oc.plugins`                     | `array of strings` | the [plugins](/docs/registry/registry-configuration#plugins) the component requires                                                                                            |
| `oc.renderInfo`                  | `boolean`          | Default `true`, appends script, which adds rendered component information (name and version) to the `oc.renderedComponents` object                                             |
| `oc.state`                       | `string`           | Describes the state of the component with a keyword. Suggested values are `active`, `experimental`, `deprecated`                                                               |
