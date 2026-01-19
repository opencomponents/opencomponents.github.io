---
sidebar_position: 3
---

# Debugging

## General Debugging Principles

Before diving into specific tools, here are key debugging strategies for OpenComponents:

### 1. Start Simple
- Test components in isolation using `oc dev`
- Use `oc preview` to verify basic functionality
- Check component info with `http://localhost:3030/component-name/~info`

### 2. Check the Basics
- Verify Node.js and npm versions
- Ensure all dependencies are installed
- Check that your registry is accessible
- Validate component syntax and structure

### 3. Use Systematic Debugging
- Check browser console for JavaScript errors
- Examine network requests in browser dev tools
- Use verbose logging: `oc dev . 3030 --verbose`
- Test with minimal examples first

## Common Debugging Scenarios

### Component Won't Load

**Symptoms**: Component shows "Loading..." forever or displays fallback content

**Debugging steps**:
1. Check browser console for errors
2. Verify registry URL is accessible: `curl https://your-registry.com/your-component`
3. Test component locally: `oc dev . 3030 && oc preview http://localhost:3030/your-component`
4. Check network tab for failed requests

### Template Compilation Errors

**Symptoms**: Component fails to render or shows compilation errors

**Debugging steps**:
1. Validate template syntax (ES6, React, etc.)
2. Check server.js for runtime errors
3. Ensure all variables are properly defined
4. Test with minimal template first

### Publishing Issues

**Symptoms**: `oc publish` fails with various errors

**Debugging steps**:
1. Use dry run first: `oc publish . --dryRun`
2. Check authentication credentials
3. Verify registry permissions
4. Test package creation: `oc package .`

### Performance Issues

**Symptoms**: Slow component loading or rendering

**Debugging steps**:
1. Check component bundle size
2. Analyze network requests timing
3. Review server.js logic complexity
4. Test with caching disabled

## IDE-Specific Debugging

### Visual Studio Code

# Debugging server.js with Visual Studio Code

When developing with OpenComponents, it is possible to use Visual Studio Code's debugger to step into code and perform advance debugging within the server.js of your components.
In this tutorial, we'll see how.

1.  Open a folder of components with your editor. In this example, oc is installed as dev dependency and there are 4 OC components:

    ![1](/img/docs/debugging-1.png)

2.  Click the Debug Button, and setup a new Configuration file for the launch tasks

    ![2](/img/docs/debugging-2.png)

3.  Setup the config file to locate the oc cli, the compiled server.js locations as shown here:

```js
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug OC",
      "program": "${workspaceFolder}/node_modules/.bin/oc",
      "outFiles": ["${workspaceRoot}/**/_package/*.js"],
      "cwd": "${workspaceRoot}/",
      "args": ["dev", ".", "3030"],
      "stopOnEntry": false,
      "sourceMaps": true
    }
  ]
}
```

4.  Now hit the play button to start the OC cli:

    ![aefaef](/img/docs/debugging-3.png)

5.  Now setup a stop in a server.js, make a request to your component via browser or curl, and get ready to step into your code:

    ![4](/img/docs/debugging-4.png)

### WebStorm/IntelliJ IDEA

1. **Create Run Configuration**:
   - Go to Run → Edit Configurations
   - Add new Node.js configuration
   - Set JavaScript file to `node_modules/.bin/oc`
   - Set Application parameters to `dev . 3030`
   - Set Working directory to your components folder

2. **Set Breakpoints**:
   - Open your component's server.js
   - Click in the gutter to set breakpoints
   - Start debugging with the green bug icon

3. **Debug Console**:
   - Use the debug console to inspect variables
   - Evaluate expressions in the current context

### Chrome DevTools (Client-side)

1. **Component Inspection**:
   ```js
   // In browser console, inspect loaded components
   console.log(window.oc.components);
   
   // Check component cache
   console.log(window.oc.cache);
   
   // Monitor component events
   document.addEventListener('oc:rendered', (e) => {
     console.log('Component rendered:', e.detail);
   });
   ```

2. **Network Analysis**:
   - Open Network tab before loading components
   - Filter by XHR to see component requests
   - Check response headers and timing

## Command Line Debugging

### Verbose Logging

```bash
# Start dev server with verbose output
oc dev . 3030 --verbose

# Check component info
curl http://localhost:3030/your-component/~info

# Test component with parameters
curl "http://localhost:3030/your-component?param1=value1"
```

### Component Validation

```bash
# Validate component structure
oc package your-component

# Test publishing without actually publishing
oc publish your-component --dryRun

# Clean and rebuild
oc clean . && oc dev . 3030
```

### Registry Debugging

```bash
# Test registry connectivity
curl https://your-registry.com/

# Check component availability
curl https://your-registry.com/your-component

# Test with different headers
curl -H "Accept: application/vnd.oc.unrendered+json" https://your-registry.com/your-component
```

## Debugging Different Template Types

### ES6 Templates (Default)

**Common issues**:
- Template function not returning a string
- Missing variables in server.js data
- Incorrect template literal syntax: `${variable}` not `{variable}`

### Legacy Templates (Handlebars)

**Common issues** (for legacy components):
- Unescaped special characters: `{{variable}}` vs `{{{variable}}}`
- Missing variables in server.js data
- Incorrect helper usage

**Debugging**:
```js
// In server.js, log the data being passed to template
export const data = (context, callback) => {
  const result = {
    // your data
  };
  console.log('Template data:', result);
  callback(null, result);
};
```

### React Templates

**Common issues**:
- JSX syntax errors
- Missing imports
- Incorrect prop types

**Debugging**:
```js
// Add console logs in your React component
const MyComponent = (props) => {
  console.log('Component props:', props);
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return <div>...</div>;
};
```

## Performance Debugging

### Bundle Analysis

```bash
# Check component bundle size
oc package your-component --compress
ls -la _package/

# Analyze what's included
tar -tzf _package/package.tar.gz
```

### Memory Debugging

```js
// Monitor memory usage in browser
console.log('Memory usage:', performance.memory);

// Check for memory leaks in components
setInterval(() => {
  console.log('Components in memory:', Object.keys(window.oc.components).length);
}, 5000);
```

### Network Performance

```bash
# Test component load times
time curl -s http://localhost:3030/your-component > /dev/null

# Test with different network conditions using browser dev tools
# Network tab → Throttling → Slow 3G
```

## Error Handling and Logging

### Client-side Error Handling

```js
// Global error handler for components
window.addEventListener('error', (event) => {
  if (event.target.tagName === 'OC-COMPONENT') {
    console.error('Component error:', event);
  }
});

// Component-specific error handling
document.addEventListener('oc:error', (event) => {
  console.error('OC Error:', event.detail);
  // Implement fallback logic
});
```

### Server-side Error Handling

```js
// In server.js, always handle errors gracefully
export const data = (context, callback) => {
  try {
    // Your logic here
    callback(null, result);
  } catch (error) {
    console.error('Component error:', error);
    callback(error);
  }
};
```

## Troubleshooting Checklist

### Before Debugging
- [ ] Verify Node.js and npm versions
- [ ] Check that all dependencies are installed
- [ ] Ensure registry is accessible
- [ ] Confirm component structure is correct

### During Development
- [ ] Test component in isolation
- [ ] Check browser console for errors
- [ ] Verify network requests are successful
- [ ] Test with minimal examples

### Before Publishing
- [ ] Run `oc package` successfully
- [ ] Test with `--dryRun` flag
- [ ] Verify all dependencies are listed
- [ ] Check component works in production-like environment

### Production Issues
- [ ] Check registry logs
- [ ] Verify CDN accessibility
- [ ] Test component endpoints directly
- [ ] Monitor error rates and performance metrics

## Getting Help

When debugging fails and you need help:

1. **Gather Information**:
   - Component code and configuration
   - Error messages and stack traces
   - Steps to reproduce the issue
   - Environment details (Node.js version, OS, etc.)

2. **Community Resources**:
   - [GitHub Issues](https://github.com/opencomponents/oc/issues)
   - [Documentation](../intro)
   - [Example repositories](https://github.com/opencomponents/vite-templates)

3. **Create Minimal Reproduction**:
   - Strip down to the simplest failing case
   - Remove unnecessary dependencies
   - Provide complete, runnable example
