---
sidebar_position: 2
---

# Quick Start Tutorial

This comprehensive tutorial will guide you through creating your first OpenComponents component from scratch. Perfect for complete beginners who want to get started with micro frontends using OpenComponents.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 20 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Basic familiarity with npm commands
- **Basic JavaScript knowledge** - Understanding of functions, objects, and modules
- **Command line familiarity** - Ability to navigate directories and run commands
- **A cloud storage solution** such as:
  - [AWS S3](https://aws.amazon.com/s3)
  - [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)
  - [Google Cloud Storage](https://cloud.google.com/storage)

## What You'll Learn

By the end of this tutorial, you'll know how to:

- Install and configure the OpenComponents CLI
- Create your first component
- Develop and test components locally
- Publish components to a registry
- Consume components in web applications

## Step 1: Install the OpenComponents CLI

First, install the OpenComponents command-line interface globally:

```bash
npm install -g oc
```

Verify the installation:

```bash
oc --version
```

You should see the version number displayed.

### Troubleshooting Installation

**Problem**: Permission errors on macOS/Linux

```bash
sudo npm install -g oc
```

**Problem**: `oc` command not found

- Make sure your npm global bin directory is in your PATH
- Try: `npm config get prefix` and add `{prefix}/bin` to your PATH

## Step 2: Create Your First Component

Let's create a simple "hello-world" component:

```bash
oc init hello-world
```

This creates a new directory with the following structure:

```
hello-world/
├── package.json          # Component configuration
├── template.js           # ES6 template (the view)
├── server.js             # Server-side logic (optional)
└── img/
    └── logo.png          # Static assets
```

### Understanding the Files

**package.json**: Contains component metadata, dependencies, and OpenComponents-specific configuration.

**template.js**: The ES6 template that defines how your component looks using modern JavaScript.

**server.js**: Optional file for server-side logic, data fetching, or API calls.

### Template Options

OpenComponents supports multiple template types:

- **ES6** (default): Modern JavaScript with template literals - recommended for new components
- **React**: For React-based components with JSX
- **Vue**: For Vue.js single-file components
- **Svelte**: For Svelte components

You can specify the template type when creating a component:

```bash
oc init my-component --template-type=react
oc init my-component --template-type=vue
oc init my-component --template-type=svelte
```

## Step 3: Explore Your Component

Navigate to your component directory:

```bash
cd hello-world
```

Look at the generated template:

```bash
cat template.js
```

You'll see something like:

```javascript
export default function (model) {
  return `
    <div>
      <h1>Hello ${model.name}!</h1>
      <img src="${model.staticPath}/img/logo.png" alt="Logo" />
    </div>
  `;
}
```

## Step 4: Start Local Development

Start a local development registry:

```bash
oc dev . 3030
```

This command:

- Starts a local registry on port 3030
- Watches for file changes
- Automatically recompiles your component

You should see output like:

```
Registry started at http://localhost:3030
Watching for changes...
```

### Test Your Component

Open your browser and visit:

- **Component endpoint**: http://localhost:3030/hello-world
- **Component info**: http://localhost:3030/hello-world/~info
- **Component preview**: http://localhost:3030/hello-world/~preview

Or use the CLI preview:

```bash
oc preview http://localhost:3030/hello-world
```

## Step 5: Customize Your Component

Let's modify the component to make it more interesting. Edit the `server.js` file:

```javascript
export const data = (context, callback) => {
  const { name = "World" } = context.params;
  const { staticPath } = context;

  // You can add logic here, like API calls
  const greeting = getTimeBasedGreeting();

  callback(null, {
    name,
    greeting,
    staticPath,
    timestamp: new Date().toISOString(),
  });
};

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
```

Update the template (`template.js`):

```javascript
export default function (model) {
  return `
    <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1>${model.greeting}, ${model.name}!</h1>
      <p>This component was rendered at: ${model.timestamp}</p>
      <img src="${model.staticPath}/img/logo.png" alt="OpenComponents Logo" style="max-width: 100px;" />
    </div>
  `;
}
```

Save the files and refresh your browser - you should see the changes immediately!

## Step 6: Test with Parameters

Try your component with different parameters:

```
http://localhost:3030/hello-world?name=Alice
```

## Step 7: Create a Test HTML Page

Create a simple HTML file to test client-side rendering:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Testing My Component</title>
  </head>
  <body>
    <h1>My Website</h1>

    <!-- Your component will be rendered here -->
    <oc-component href="http://localhost:3030/hello-world?name=Developer">
      Loading component...
    </oc-component>

    <!-- OpenComponents client script -->
    <script src="http://localhost:3030/oc-client/client.js"></script>
  </body>
</html>
```

Open this HTML file in your browser to see client-side rendering in action.

## Step 8: Set Up a Registry (Production)

For production use, you'll need a registry connected to cloud storage. Here's a basic setup:

### Create Registry Directory

```bash
mkdir my-oc-registry
cd my-oc-registry
npm init -y
npm install oc --save
```

### Create Registry Configuration

Create an `index.js` file:

```javascript
const oc = require("oc");

const configuration = {
  verbosity: 0,
  baseUrl: "https://your-registry-domain.com/",
  port: 3000,
  tempDir: "./temp/",
  refreshInterval: 600,
  pollingInterval: 5,

  // For AWS S3
  s3: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    region: process.env.AWS_REGION,
    path: `//s3.amazonaws.com/${process.env.S3_BUCKET}/`,
    componentsDir: "components",
  },

  env: { name: "production" },
};

const registry = oc.Registry(configuration);

registry.start((err, app) => {
  if (err) {
    console.log("Registry not started: ", err);
    process.exit(1);
  }
  console.log("Registry started successfully");
});
```

## Step 9: Publish Your Component

### Configure Registry

Add your registry to the CLI:

```bash
oc registry add https://your-registry-domain.com/
```

### Publish

Navigate back to your component directory and publish:

```bash
cd ../hello-world
oc publish . --username=your-username --password=your-password
```

### Verify Publication

Your component should now be available at:

```
https://your-registry-domain.com/hello-world
```

## Step 10: Consume in Production

Update your HTML to use the production registry:

```html
<oc-component
  href="https://your-registry-domain.com/hello-world/1.X.X?name=Production"
>
  Loading component...
</oc-component>
<script src="https://your-registry-domain.com/oc-client/client.js"></script>
```

## Common Troubleshooting

### Component Won't Start

**Problem**: `Error: Cannot find module`
**Solution**: Run `npm install` in your component directory

**Problem**: Port already in use
**Solution**: Use a different port: `oc dev . 3031`

### Publishing Issues

**Problem**: Authentication failed
**Solution**: Check your username/password and registry URL

**Problem**: Component already exists
**Solution**: Update the version in `package.json` or use `--force` flag

### Runtime Errors

**Problem**: Component shows "Loading..." forever
**Solution**:

- Check browser console for errors
- Verify registry is accessible
- Check component syntax

**Problem**: Template compilation errors
**Solution**:

- Validate your ES6 template syntax
- Check for missing variables in server.js
- Ensure template function returns valid HTML string

### Performance Issues

**Problem**: Slow component loading
**Solution**:

- Optimize images and static assets
- Minimize server.js logic
- Use CDN for static resources

## Next Steps

Now that you've created your first component, explore these advanced topics:

1. **[Component Structure](components/getting-started)** - Learn about advanced component patterns
2. **[Server-side Logic](components/the-server.js)** - Add complex data processing
3. **[Client-side Operations](components/client-side-operations)** - Advanced browser integration
4. **[Registry Configuration](registry/registry-configuration)** - Production registry setup
5. **[Template System](miscellaneous/template-system)** - Use React, Vue, or other frameworks

## Best Practices

- **Keep components small and focused** - Each component should have a single responsibility
- **Use semantic versioning** - Follow semver for component versions
- **Test thoroughly** - Test both server-side and client-side rendering
- **Optimize for performance** - Minimize bundle size and dependencies
- **Document your components** - Include clear parameter descriptions
- **Handle errors gracefully** - Provide fallback content and error handling

## Getting Help

- **Documentation**: Continue reading the [full documentation](intro)
- **GitHub Issues**: Report bugs or request features
- **Community**: Join discussions and get help from other developers

Congratulations! You've successfully created, developed, and published your first OpenComponents component. You're now ready to build scalable micro frontends with OpenComponents.
