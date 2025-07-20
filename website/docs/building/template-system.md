---
sidebar_position: 2
---

# Template system

## Introduction

The template system enables building components with modern JavaScript frameworks and libraries. **ES6 templates are the default** for new components, providing a clean, modern development experience without external dependencies.

## Using templates

Within the component's `package.json` a template type need to be specified together with its related compiler declared within devDependencies.

> By convention the compiler need to follow the naming structure: **`<template-type>-compiler`**.

For example a component of type: `oc-template-handlebars` will need a compiler named `oc-template-handlebars-compiler` in order to be correctly packaged and published:

```json
...
"oc": {
  "files": {
    "template": {
      "src": "src/view.ts",
      "type": "oc-template-es6"
    }
  }
},
"devDependencies": {
  "oc-template-es6-compiler": "6.0.0"
},
...
```

### With the CLI

The CLI allow to bootstrap a new component with the `init` command. By default if no `templateType` is passed to the command a component of type `oc-template-es6` is created. Optionally you can pass any valid template as long as it follow the conventions mentioned above.

Usage:

```
$ oc init myComponent oc-template-jade  # Legacy template - ES6 recommended for new components
```

Check the [CLI documentation](/docs/components/cli) for more details.

### On the Registry

The registry need to be configured with the templates you want to allow:

```js
const configuration = {
...
templates: [require('oc-template-extra'), require('oc-template-plus')]
...
}
```

Check the [registry configuration guide](/docs/registry/registry-configuration#registry-configuration) for more details.

### Client-side rendering

Client-side rendering is done via the `oc-client.js` library. The library can now be dynamically updated to support client-side rendering of different templates:

via configuration API:

```js
<script> var oc = {
  conf: {
    templates: [
      {
        "type": "oc-template-jade","externals": [  // Legacy template - consider ES6 for new components
          {"global": "jade","url": "https://unpkg.com/jade-legacy@1.11.1/runtime.js"}
        ]
      }
    ]
  }
};
<script src="//registry.components.com/oc-client/client.js"></script>
```

via `registerTemplates()` API:

```js
cons templates = oc.registerTemplates([{
  "type": "custom-react-template",
  "externals": [{
    "global": "React",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"
  }]
}]);
```

Check the [browser client documentation](/docs/consumers/rendering-lifecycle) for more details.

#### templates exposed in context

As a note, supported templates on the registry are now exposed via `context.templates` on the dataProvider, this allow for example, for components to be able to dynamically configure the browser client. See the [oc-client code](https://github.com/opentable/oc/blob/master/src/components/oc-client/server.js#L4-L5) as an example.

### Server-side rendering

At the moment `oc-template-es6`, `oc-template-react`, and other modern templates support server-side rendering (SSR). Legacy templates (`oc-template-handlebars`, `oc-template-jade`) also support SSR for backwards compatibility.

## Building templates

At the moment OC comes with `oc-template-es6` as the default modern template, with `oc-template-react`, `oc-template-vue`, and `oc-template-svelte` available for framework-specific components. Legacy templates (`oc-template-jade` and `oc-template-handlebars`) are still supported for backwards compatibility. You can fork any of those templates, or simply build your own from scratch in case you need a customtemplate. Please check the following templates as a reference:

### Modern Templates (Recommended)

- **[oc-template-es6](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-es6)** - Default modern template
- **[oc-template-react](https://github.com/opencomponents/oc-template-react)** - React components
- **[oc-template-vue](https://github.com/opencomponents/oc-template-vue)** - Vue.js components
- **[oc-template-svelte](https://github.com/opencomponents/oc-template-svelte)** - Svelte components

### Legacy Templates (Backward Compatibility)

- **[oc-template-handlebars](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-handlebars)** - Legacy template
- **[oc-template-jade](https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-jade)** - Legacy template

## Practical Implementation Examples

### ES6 Template Example

```javascript
// template.js - Modern ES6 template
export default function (model) {
  return `
    <div class="user-card ${model.theme}">
      <img src="${model.avatar}" alt="${model.name}" />
      <h3>${model.name}</h3>
      <p>${model.email}</p>
      ${
        model.isOnline
          ? '<span class="status online">Online</span>'
          : '<span class="status offline">Offline</span>'
      }
    </div>
  `;
}
```

### React Template Example

```jsx
// template.jsx - React component
import React from "react";

export default function UserCard({ name, email, avatar, isOnline, theme }) {
  return (
    <div className={`user-card ${theme}`}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      <span className={`status ${isOnline ? "online" : "offline"}`}>
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}
```

### Vue Template Example

```vue
<!-- template.vue - Vue component -->
<template>
  <div :class="`user-card ${theme}`">
    <img :src="avatar" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
    <span :class="`status ${isOnline ? 'online' : 'offline'}`">
      {{ isOnline ? "Online" : "Offline" }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["name", "email", "avatar", "isOnline", "theme"],
};
</script>
```

### Svelte Template Example

```svelte
<!-- template.svelte - Svelte component -->
<script>
  export let name, email, avatar, isOnline, theme;
</script>

<div class="user-card {theme}">
  <img src={avatar} alt={name} />
  <h3>{name}</h3>
  <p>{email}</p>
  <span class="status {isOnline ? 'online' : 'offline'}">
    {isOnline ? 'Online' : 'Offline'}
  </span>
</div>
```

## Troubleshooting Common Issues

### Template Compilation Errors

**Issue**: "Template compilation failed"

```bash
# Check template syntax
oc dev . 3030 --verbose

# Common ES6 template issues:
# ❌ Missing return statement
export default function(model) {
  `<div>${model.name}</div>`; // Missing return
}

# ✅ Correct syntax
export default function(model) {
  return `<div>${model.name}</div>`;
}
```

**Issue**: "Template type not supported"

```bash
# Register template in registry configuration
const configuration = {
  templates: [
    {
      type: 'oc-template-vue',
      externals: [
        {
          global: 'Vue',
          url: 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js'
        }
      ]
    }
  ]
};
```

### Runtime Template Errors

**Issue**: "Component renders but shows blank"

```javascript
// ❌ Problem - undefined variables
export default function(model) {
  return `<div>${model.user.name}</div>`; // Error if user is undefined
}

// ✅ Solution - defensive programming
export default function(model) {
  const user = model.user || {};
  return `<div>${user.name || 'Anonymous'}</div>`;
}
```

**Issue**: "Template externals not loading"

```javascript
// Check external dependencies are accessible
const templates = [
  {
    type: "oc-template-react",
    externals: [
      {
        global: "React",
        url: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/react.min.js", // Verify URL works
      },
    ],
  },
];
```

### Performance Issues

**Issue**: "Slow template rendering"

```javascript
// ❌ Avoid complex logic in templates
export default function(model) {
  // Don't do heavy processing here
  const processedData = model.items.map(item => {
    return expensiveCalculation(item); // Move to server.js
  });
  return `<div>${processedData.join('')}</div>`;
}

// ✅ Keep templates simple
export default function(model) {
  // Data should be pre-processed in server.js
  return `<div>${model.processedItems.join('')}</div>`;
}
```

### Template Migration Issues

**Issue**: "Migrating from Handlebars to ES6"

```javascript
// Before (Handlebars)
// {{#if user.isActive}}
//   <span class="active">{{user.name}}</span>
// {{else}}
//   <span class="inactive">{{user.name}}</span>
// {{/if}}

// After (ES6)
export default function (model) {
  const user = model.user || {};
  return user.isActive
    ? `<span class="active">${user.name}</span>`
    : `<span class="inactive">${user.name}</span>`;
}
```

## Custom Template Development

### Template Structure

```
my-custom-template/
├── package.json              # Template package configuration
├── lib/
│   ├── compiler.js          # Compile-time logic
│   ├── renderer.js          # Runtime rendering logic
│   └── validator.js         # Template validation
├── scaffold/                # Template scaffolding files
│   ├── template.ext         # Default template file
│   ├── package.json         # Component package.json template
│   └── server.js           # Default server.js template
└── test/                    # Template tests
    ├── compiler.test.js
    └── renderer.test.js
```

### Template API Requirements

```javascript
// compiler.js - Required methods
module.exports = {
  compile: (options, callback) => {
    // Compile template source to executable code
    // options: { componentPath, template, externals }
    // callback: (error, { template: compiledCode, map: sourceMap })
  },

  getInfo: () => {
    // Return template information
    return {
      type: "my-custom-template",
      version: "1.0.0",
      externals: [], // Required external dependencies
    };
  },
};
```

### Template Registration

```javascript
// Registry configuration
const configuration = {
  templates: [
    {
      type: "my-custom-template",
      externals: [
        {
          global: "MyFramework",
          url: "https://cdn.example.com/my-framework.js",
        },
      ],
    },
  ],
};
```

## Best Practices

### Template Selection Guidelines

**Choose ES6 when**:

- Building simple to moderate complexity components
- Want minimal external dependencies
- Need fast rendering performance
- Team prefers vanilla JavaScript

**Choose React when**:

- Building complex interactive components
- Need advanced state management
- Team has React expertise
- Want to leverage React ecosystem

**Choose Vue when**:

- Need progressive enhancement
- Prefer template-driven development
- Building form-heavy components
- Want two-way data binding

**Choose Svelte when**:

- Performance is critical
- Want minimal bundle sizes
- Need built-in animations
- Prefer compiled components

### Development Best Practices

**🎯 Keep Templates Simple**

- Move complex logic to `server.js`
- Use templates only for presentation
- Avoid heavy computations in render functions

**🔒 Handle Data Safely**

- Always check for undefined values
- Provide fallback content for missing data
- Sanitize user input to prevent XSS

**⚡ Optimize Performance**

- Minimize external dependencies
- Use efficient rendering patterns
- Cache expensive operations in server.js

**🧪 Test Thoroughly**

- Test with various data scenarios
- Verify cross-browser compatibility
- Test error conditions and edge cases

## Migration Strategies

### From Legacy to Modern Templates

**Phase 1: Assessment**

- Inventory existing Handlebars/Jade components
- Identify complexity levels and dependencies
- Plan migration priority based on usage

**Phase 2: Gradual Migration**

- Start with simple, low-risk components
- Migrate to ES6 for straightforward cases
- Use React/Vue for complex interactive components

**Phase 3: Validation**

- Test migrated components thoroughly
- Monitor performance improvements
- Gather team feedback on new development experience

**Migration Tools**

```bash
# Automated migration helpers (if available)
oc migrate handlebars-to-es6 my-component/
oc migrate jade-to-es6 my-component/
```
