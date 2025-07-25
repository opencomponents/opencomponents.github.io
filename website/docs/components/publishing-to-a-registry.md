---
sidebar_position: 5
---

# Publishing to a registry

Publishing components to an OpenComponents registry makes them available for consumption across your applications. This guide covers the complete publishing workflow, from basic commands to advanced scenarios and troubleshooting.

## Overview

Publishing is the process of uploading your packaged component to a registry where it becomes available for consumption. When you publish a component:

1. **Packaging**: Your component is compiled and packaged with all dependencies
2. **Validation**: The registry validates the component structure, CLI version, and custom rules
3. **Storage**: The component is stored in the registry's storage backend
4. **Availability**: The component becomes accessible via HTTP endpoints

## Prerequisites

Publishing assumes:

1. A reachable registry (see [Registry Configuration](../registry/registry-configuration))
2. A component folder that passes `oc dev` validation
3. OC CLI installed (see [CLI install](cli.md#install-the-cli))

That's all you need—no extra global setup.

## Basic Publishing Workflow

### 1. Add Registry

First, configure your registry (only needed once):

```sh
oc registry add https://your-registry-domain.com
```

### 2. Publish Component

Navigate to your component directory and publish:

```sh
oc publish my-component/
```

This command will:

- Package your component automatically
- Compress it for upload
- Upload to all configured registries
- Make it available at `https://your-registry-domain.com/my-component`

## Authentication

### Interactive Authentication

If the registry requires authentication, you'll be prompted for credentials:

```sh
oc publish my-component/
# Registry requires authentication
# Username: your-username
# Password: [hidden input]
```

### Command-line Authentication

Provide credentials directly via command-line options:

```sh
oc publish my-component/ --username=your-username --password=your-password
```

### Custom Authentication

Registries can implement custom authentication strategies. Check with your registry administrator for specific requirements.

## CLI Options

The `oc publish` command supports several options:

| Option          | Type    | Description                                          | Example                                        |
| --------------- | ------- | ---------------------------------------------------- | ---------------------------------------------- |
| `--username`    | string  | Username for registry authentication                 | `--username=john`                              |
| `--password`    | string  | Password for registry authentication                 | `--password=secret`                            |
| `--registries`  | array   | Specific registries to publish to (overrides config) | `--registries=http://reg1.com,http://reg2.com` |
| `--skipPackage` | boolean | Skip packaging step (use existing `_package` folder) | `--skipPackage`                                |
| `--dryRun`      | boolean | Test publish without actually uploading              | `--dryRun`                                     |

### Examples

**Basic publish:**

```sh
oc publish my-component/
```

**Publish with credentials:**

```sh
oc publish my-component/ --username=developer --password=mypassword
```

**Dry run (test without publishing):**

```sh
oc publish my-component/ --dryRun
```

**Publish to specific registries:**

```sh
oc publish my-component/ --registries=https://staging-registry.com,https://prod-registry.com
```

**Skip packaging (use pre-built component):**

```sh
oc publish my-component/ --skipPackage
```

## Advanced Usage

### Multiple Registries

You can publish to multiple registries simultaneously:

```sh
# Configure multiple registries
oc registry add https://staging-registry.com
oc registry add https://production-registry.com

# Publish to all configured registries
oc publish my-component/

# Or specify registries for this publish only
oc publish my-component/ --registries=https://staging-registry.com
```

### Pre-built Components

If you have a pre-packaged component in the `_package` folder:

```sh
oc publish my-component/ --skipPackage
```

This skips the packaging step and directly publishes the existing package.

### Testing with Dry Run

Always test your publish with `--dryRun` first:

```sh
oc publish my-component/ --dryRun
```

This validates your component and simulates the publish process without actually uploading.

## Version Management

- Component versions are determined by the `version` field in `package.json`
- You cannot publish the same name and version twice to the same registry
- Update your component version before publishing updates:

```json
{
  "name": "my-component",
  "version": "1.0.1",
  "oc": {
    // component configuration
  }
}
```

## Troubleshooting

For error messages and advanced diagnostics, refer to the [CLI Troubleshooting Guide](cli.md#installation-troubleshooting). It covers authentication, versioning, validation failures, and more.

### Debugging Tips

1. **Use dry run first**: Always test with `--dryRun` before actual publishing
2. **Check component structure**: Ensure all required files are present
3. **Validate package.json**: Verify the `oc` configuration is correct
4. **Test locally**: Use `oc dev` to test your component locally before publishing
5. **Check registry logs**: Contact your registry administrator for server-side error details

### Getting Help

If you encounter issues not covered here:

1. Check the component structure with `oc dev`
2. Validate your `package.json` configuration
3. Test with `--dryRun` to identify issues before publishing
4. Contact your registry administrator for authentication or server issues
5. Check the [OpenComponents GitHub repository](https://github.com/opencomponents/oc) for known issues

## Best Practices

- **Always use dry run first**: Test your publish with `--dryRun`
- **Version management**: Follow semantic versioning for your components
- **Test locally**: Use `oc dev` to test components before publishing
- **Secure credentials**: Never commit passwords to version control
- **Registry selection**: Use staging registries for testing, production for releases
- **Component validation**: Ensure your component works in isolation before publishing
