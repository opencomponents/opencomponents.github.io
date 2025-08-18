---
sidebar_position: 3
---

# Structure of package.json

## Overview

The `package.json` file is the heart of your OpenComponents component configuration. It defines not only standard npm package information but also OpenComponents-specific settings that control how your component is built, rendered, and consumed.

## Essential vs Optional Parameters

### ✅ Essential Parameters (Required)

These parameters are required for every OpenComponents component:

```js
{
  "name": "hello-world",                    // Required: Component name
  "version": "1.0.0",                       // Required: Semantic version
  "oc": {                                   // Required: OpenComponents config
    "files": {                              // Required: File definitions
      "template": {                         // Required: Template config
        "src": "template.js",               // Required: Template file
        "type": "oc-template-es6"           // Required: Template type
      }
    }
  },
  "devDependencies": {                      // Required: Template compiler
    "oc-template-es6-compiler": "6.0.8"
  }
}
```

### 🔧 Optional Parameters (Recommended)

These parameters enhance your component's functionality and documentation:

```js
{
  "description": "A reusable header component",  // Recommended: Clear description
  "author": "John Doe <john@doe.com>",          // Recommended: Author info
  "repository": "https://github.com/...",       // Recommended: Source repo
  "oc": {
    "files": {
      "data": "server.js",                      // Optional: Server-side logic
      "static": ["public", "assets"]            // Optional: Static assets
    },
    "parameters": {                             // Recommended: API documentation
      "title": {
        "type": "string",
        "mandatory": true,
        "description": "The header title to display"
      }
    }
  }
}
```

## Complete Example Templates

### Basic Static Component

For simple components without server-side logic:

```js
{
  "name": "simple-banner",
  "description": "A static promotional banner component",
  "version": "1.0.0",
  "author": "Your Team <team@company.com>",
  "repository": "https://github.com/company/components",
  "oc": {
    "files": {
      "template": {
        "src": "template.js",
        "type": "oc-template-es6"
      },
      "static": ["public"]
    },
    "parameters": {
      "message": {
        "type": "string",
        "mandatory": true,
        "description": "Banner message to display",
        "example": "Special offer - 20% off!"
      },
      "variant": {
        "type": "string",
        "mandatory": false,
        "default": "primary",
        "description": "Banner style variant",
        "example": "primary"
      }
    },
    "state": "active"
  },
  "devDependencies": {
    "oc-template-es6-compiler": "6.0.8"
  }
}
```

### Dynamic Component with Server Logic

For components that fetch data or perform server-side processing:

```js
{
  "name": "user-profile",
  "description": "Dynamic user profile component with API integration",
  "version": "2.1.0",
  "author": "Frontend Team <frontend@company.com>",
  "repository": "https://github.com/company/user-components",
  "dependencies": {
    "axios": "^1.0.0",
    "lodash": "^4.17.21"
  },
  "oc": {
    "files": {
      "data": "server.js",
      "template": {
        "src": "template.js",
        "type": "oc-template-es6"
      },
      "static": ["public", "assets"]
    },
    "parameters": {
      "userId": {
        "type": "string",
        "mandatory": true,
        "description": "User ID to fetch profile for",
        "example": "user123"
      },
      "showAvatar": {
        "type": "boolean",
        "mandatory": false,
        "default": true,
        "description": "Whether to display user avatar"
      },
      "theme": {
        "type": "string",
        "mandatory": false,
        "default": "light",
        "description": "Component theme",
        "example": "dark"
      }
    },
    "plugins": ["oc-plugin-hash"],
    "state": "active",
    "renderInfo": true
  },
  "devDependencies": {
    "oc-template-es6-compiler": "6.0.8"
  }
}
```

## Complete Parameter Reference

### Standard npm Parameters

| Parameter         | Type     | Required           | Description                                                            |
| ----------------- | -------- | ------------------ | ---------------------------------------------------------------------- |
| `name`            | `string` | ✅ **Required**    | Component name (must be unique in registry). Use kebab-case format     |
| `version`         | `string` | ✅ **Required**    | Semantic version (e.g., "1.0.0"). Follow [semver](https://semver.org/) |
| `description`     | `string` | 🔧 **Recommended** | Clear, concise component description for documentation                 |
| `author`          | `string` | 🔧 **Recommended** | Author info: `"John Doe <john@doe.com>"`                               |
| `repository`      | `string` | 🔧 **Recommended** | Git repository URL for source code                                     |
| `dependencies`    | `object` | ⚪ **Optional**    | npm modules required at runtime                                        |
| `devDependencies` | `object` | ✅ **Required**    | Development dependencies (always include template compiler)            |

### OpenComponents Configuration (`oc`)

| Parameter | Type     | Required        | Description                              |
| --------- | -------- | --------------- | ---------------------------------------- |
| `oc`      | `object` | ✅ **Required** | Main OpenComponents configuration object |

#### File Configuration (`oc.files`)

| Parameter                | Type     | Required        | Description                                                               |
| ------------------------ | -------- | --------------- | ------------------------------------------------------------------------- |
| `oc.files`               | `object` | ✅ **Required** | Defines component file structure                                          |
| `oc.files.template`      | `object` | ✅ **Required** | Template configuration                                                    |
| `oc.files.template.src`  | `string` | ✅ **Required** | Template filename (e.g., "template.js")                                   |
| `oc.files.template.type` | `string` | ✅ **Required** | Template type: `"oc-template-es6"` (default), `"oc-template-react"`, etc. |
| `oc.files.data`          | `string` | ⚪ **Optional** | Server-side logic filename (default: "server.js")                         |
| `oc.files.static`        | `array`  | ⚪ **Optional** | Static asset directories (e.g., `["public", "assets"]`)                   |
| `oc.files.env`           | `string` | ⚪ **Optional** | Environment variables file path                                           |

#### Component Behavior

| Parameter       | Type      | Required           | Description                                                            |
| --------------- | --------- | ------------------ | ---------------------------------------------------------------------- |
| `oc.container`  | `boolean` | ⚪ **Optional**    | If `true`, renders without `<oc-component>` wrapper (default: `false`) |
| `oc.minify`     | `boolean` | ⚪ **Optional**    | Minify CSS/JS during publishing (default: `true`)                      |
| `oc.renderInfo` | `boolean` | ⚪ **Optional**    | Include component info in rendered output (default: `true`)            |
| `oc.state`      | `string`  | 🔧 **Recommended** | Component lifecycle: `"active"`, `"experimental"`, `"deprecated"`      |

#### API Documentation (`oc.parameters`)

| Parameter                        | Type      | Required           | Description                                                              |
| -------------------------------- | --------- | ------------------ | ------------------------------------------------------------------------ |
| `oc.parameters`                  | `object`  | 🔧 **Recommended** | Component API definition for validation and docs                         |
| `oc.parameters[key].type`        | `string`  | ✅ **Required**    | Parameter type: `"string"`, `"boolean"`, `"number"`                      |
| `oc.parameters[key].mandatory`   | `boolean` | ⚪ **Optional**    | If `true`, parameter is required (default: `false`)                      |
| `oc.parameters[key].description` | `string`  | 🔧 **Recommended** | Parameter description for documentation                                  |
| `oc.parameters[key].example`     | `string`  | 🔧 **Recommended** | Example value for documentation                                          |
| `oc.parameters[key].default`     | `any`     | ⚪ **Optional**    | Default value when parameter not provided                                |
| `oc.parameters[key].enum`        | `array`   | ⚪ **Optional**    | Restrict parameter to specific values (e.g., `["red", "green", "blue"]`) |

**Enum Parameter Example:**

The `enum` property is particularly useful when you want to restrict parameter values to a predefined set of options. This provides better validation, documentation, and prevents invalid values from being passed to your component.

```json
{
  "oc": {
    "parameters": {
      "theme": {
        "type": "string",
        "mandatory": false,
        "description": "Visual theme for the component",
        "example": "dark",
        "enum": ["light", "dark", "auto"]
      },
      "size": {
        "type": "string",
        "mandatory": true,
        "description": "Component size variant",
        "enum": ["small", "medium", "large"]
      },
      "status": {
        "type": "string",
        "mandatory": false,
        "description": "Current status",
        "enum": ["pending", "success", "error", "warning"]
      }
    }
  }
}
```

When a parameter with an `enum` is provided with a value not in the allowed list, the registry will return a validation error with the allowed values listed.

#### Advanced Configuration

| Parameter    | Type    | Required        | Description                                                                                    |
| ------------ | ------- | --------------- | ---------------------------------------------------------------------------------------------- |
| `oc.plugins` | `array` | ⚪ **Optional** | Required [plugins](/docs/registry/registry-configuration#plugins) (e.g., `["oc-plugin-hash"]`) |

## Validation and Best Practices

### Package.json Validation

Before publishing, validate your `package.json`:

```bash
# Check for required fields
oc package ./my-component --dry-run

# Validate parameter definitions
oc preview http://localhost:3030/my-component?param=value
```

### Common Validation Errors

| Error                       | Cause                                  | Solution                                        |
| --------------------------- | -------------------------------------- | ----------------------------------------------- |
| "Missing template compiler" | No `devDependencies` for template type | Add `"oc-template-{type}-compiler": "version"`  |
| "Invalid parameter type"    | Unsupported parameter type             | Use `"string"`, `"boolean"`, or `"number"` only |
| "Template file not found"   | Wrong `template.src` path              | Verify file exists and path is correct          |
| "Invalid component name"    | Name contains invalid characters       | Use kebab-case, lowercase, no spaces            |

### Naming Conventions

- **Component names**: Use kebab-case (`user-profile`, not `UserProfile`)
- **Parameter names**: Use camelCase (`showAvatar`, not `show_avatar`)
- **File names**: Use kebab-case for consistency
- **Versions**: Follow semantic versioning (major.minor.patch)

### Performance Considerations

- **Dependencies**: Only include runtime dependencies, keep bundle size minimal
- **Static assets**: Organize in logical directories, use compression
- **Parameters**: Define clear types for better validation and performance
- **Minification**: Keep `oc.minify: true` for production components

## Troubleshooting

### Common Issues

**Problem**: Component won't build

```bash
# Check package.json syntax
npm run build
# Verify all required fields are present
```

**Problem**: Parameters not working

```bash
# Validate parameter definitions
oc preview http://localhost:3030/component?debug=true
```

**Problem**: Static assets not loading

```bash
# Verify static directories exist and are listed in oc.files.static
ls -la public/
```

## Next Steps

- **[Learn server.js structure](the-server.js)** - Add dynamic data to your components
- **[Understand CLI commands](cli)** - Master component development workflow
- **[Publishing guide](publishing-to-a-registry)** - Deploy your components
- **[Template system](../building/template-system)** - Choose the right template type
