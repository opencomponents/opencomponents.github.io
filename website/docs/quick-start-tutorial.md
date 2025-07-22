---
sidebar_position: 2
---

# Quick Start Tutorial

<div className="tutorial-hero">

## Build Your First OpenComponents Component

This comprehensive tutorial guides you through creating, developing, and deploying your first micro frontend component. **Perfect for complete beginners** who want hands-on experience with OpenComponents.

</div>

<div className="tutorial-overview">

### 🎯 **What You'll Learn**

<div className="learning-objectives">

- ✅ **Install and configure** the OpenComponents CLI
- ✅ **Create your first component** with modern TypeScript and CSS
- ✅ **Develop and test locally** with hot reloading
- ✅ **Understand component structure** and best practices
- ✅ **Publish to a registry** for production use
- ✅ **Consume components** in web applications

</div>

### ⏱️ **Time Required:** ~15 minutes

### 📋 **Prerequisites**

- [Node.js](https://nodejs.org/) 20+ installed
- Basic familiarity with command line
- Text editor of your choice

</div>

<div className="tutorial-setup">

## 🚀 **Step 0: Install the CLI**

If you haven't installed the OpenComponents CLI yet:

```bash
npm install -g oc
```

**Verify installation:**
```bash
oc --version
```

You should see the version number. If not, check the [CLI installation guide](components/cli#install-the-cli) for troubleshooting.

</div>

## 🏗️ **Step 1: Create Your First Component**

<div className="step-section">

### Create Project Directory

```bash
mkdir oc-tutorial && cd oc-tutorial
```

### Generate Component

```bash
oc init hello-world
```

<div className="success-indicator">
✅ **Success!** You should see output confirming the component was created.
</div>

### 📁 **Understanding the Generated Structure**

```
hello-world/
├── 📄 package.json          # Component configuration & metadata
├── 📁 src/
│   ├── 🎨 view.ts           # TypeScript template (the UI)
│   └── ⚙️ server.ts         # Server-side logic & data
├── 📁 public/
│   └── 🖼️ logo.png          # Static assets (images, CSS, etc.)
├── ⚙️ tsconfig.json         # TypeScript configuration
└── 📦 node_modules/         # Dependencies
```

### 🔍 **Key Files Explained**

<div className="file-explanations">

<div className="file-explanation">

#### **📄 package.json**
Component metadata, dependencies, and OpenComponents-specific configuration including parameters, version, and build settings.

</div>

<div className="file-explanation">

#### **🎨 src/view.ts**
The TypeScript template defining your component's appearance. Uses modern JavaScript with CSS imports and client-side event handling.

</div>

<div className="file-explanation">

#### **⚙️ src/server.ts**
Server-side logic for data fetching, parameter validation, and API actions. Runs when the component is rendered.

</div>

<div className="file-explanation">

#### **🖼️ public/**
Static assets like images, CSS files, and other resources that will be served via CDN.

</div>

</div>

<div className="pro-tip">
💡 **Pro Tip:** The generated component includes TypeScript, CSS modules, client-side interactivity, and server actions - much more sophisticated than basic examples you might see elsewhere!
</div>

</div>

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

## Step 2: Explore Your Component

### Understanding Component Parameters

The generated component includes parameters that you need to know about. Let's check what parameters are required:

```bash
cd hello-world
cat package.json
```

Look for the `oc.parameters` section in the package.json. You'll notice that some parameters may be marked as `"mandatory": true`. This is crucial for testing your component.

### Examine the Generated Files

Navigate to your component directory:

```bash
cd hello-world
```

Look at the generated template:

```bash
cat src/view.ts
```

You'll see something like:

```typescript
export default function (model) {
  return `
    <div>
      <h1>Hello ${model.name}!</h1>
      <img src="${model.staticPath}/img/logo.png" alt="Logo" />
    </div>
  `;
}
```

## Step 3: Start Local Development

**Important**: Run the development server from the parent directory (not inside the component directory):

```bash
cd ..  # Go back to oc-tutorial directory
```

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

- **Component endpoint**: http://localhost:3030/hello-world?userId=1
- **Component info**: http://localhost:3030/hello-world/1.0.0/~info

**Important**: The generated component requires parameters. If you get an error about "missing mandatory parameters", check the component info page to see what parameters are required.

### Check Component Information

Visit http://localhost:3030/hello-world/1.0.0/~info to see detailed information about your component, including all available parameters and which ones are mandatory.

### Understanding Different Component URLs

OpenComponents provides several ways to access your component:

1. **JSON API** (for programmatic access):

   ```
   http://localhost:3030/hello-world?userId=1
   ```

   Returns the component data as JSON

2. **Component Info Page** (for development/testing):

   ```
   http://localhost:3030/hello-world/1.0.0/~info
   ```

   Shows component details with live preview

3. **Direct Preview** (for embedding):
   ```
   http://localhost:3030/hello-world/1.0.0/~preview
   ```
   Shows just the rendered component

Or use the CLI preview:

```bash
oc preview http://localhost:3030/hello-world
```

**Note**: If the preview command doesn't work, don't worry - you can test your component directly in the browser using the URLs above.

## Step 4: Test Interactive Features

1. Visit http://localhost:3030/hello-world?userId=1
2. Click the "Fun year fact" button
3. You should see a fact about the birth year appear

## Step 4: Customize Your Component

Let's modify the component to make it more interesting. Edit the `server.ts` file:

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

Update the template (`view.ts`):

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

## Step 5: Test with Parameters

Try your component with different parameters:

```
http://localhost:3030/hello-world?userId=0
```

## Step 6: Create a Test HTML Page

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
    <oc-component href="http://localhost:3030/hello-world?userId=1">
      Loading component...
    </oc-component>

    <!-- OpenComponents client script -->
    <script src="http://localhost:3030/oc-client/client.js"></script>
  </body>
</html>
```

Open this HTML file in your browser to see client-side rendering in action.

## Step 7: Set Up a Registry (Production)

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

## Step 8: Publish Your Component

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

## Step 9: Consume in Production

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

### Directory Issues

**Problem**: "no components found in specified path"
**Solution**: Make sure you're running `oc dev . 3030` from the parent directory containing your components, not from inside the component directory.

### Parameter Issues

**Problem**: "Expected mandatory parameters are missing"
**Solution**: Check the component info page at `/~info` to see what parameters are required, then include them in your URL.

### General Issues

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

- Check if you're including required parameters in the component URL
- Visit the component info page (`/~info`) to see parameter requirements
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

### Understanding Your Component

The generated component demonstrates several OpenComponents features:

- **Parameter Handling**: Shows how to define and use mandatory/optional parameters
- **Server Actions**: The "funFact" button demonstrates client-server communication
- **CSS Modules**: Scoped styling that won't conflict with other components
- **TypeScript**: Type safety for better development experience
- **Client-side Interactivity**: Event handling within components

Now that you've created your first component, explore these advanced topics:

1. **[Component Structure](components/getting-started)** - Learn about advanced component patterns
2. **[Server-side Logic](components/the-server.js)** - Add complex data processing
3. **[Client-side Operations](consumers/rendering-lifecycle)** - Advanced browser integration
4. **[Registry Configuration](registry/registry-configuration)** - Production registry setup
5. **[Template System](building/template-system)** - Use React, Vue, or other frameworks

## Best Practices

### For Beginners

- **Always run `oc dev` from the directory containing your components**, not from inside a component
- **Check component info** at `/~info` to see required parameters
- **Use the browser console** to debug client-side issues
- **Test both client-side and server-side rendering** to ensure compatibility

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
