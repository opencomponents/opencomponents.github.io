---
sidebar_position: 4
---

# Frequently Asked Questions (FAQ)

## Beginner Questions

### What exactly is OpenComponents?

OpenComponents is a framework for building micro frontends - small, independent UI components that can be developed by different teams and composed into larger applications. Think of it as a way to break down your frontend into manageable, reusable pieces.

### When should I use OpenComponents?

OpenComponents is ideal when you have:

- Multiple teams working on different parts of the UI
- Need to share components across different applications
- Want to deploy parts of your frontend independently
- Large applications that would benefit from being broken down

### How is this different from regular React/Vue components?

Unlike framework-specific components, OpenComponents:

- Work across different frameworks (React, Vue, Angular, etc.)
- Can be deployed and updated independently
- Have their own server-side logic and data fetching
- Are framework-agnostic and can be consumed by any web application

### Do I need to know Node.js to use OpenComponents?

For **consuming** components: No, you can use components in any web application.
For **creating** components: Basic Node.js knowledge is helpful, but our [Quick Start Tutorial](../quick-start-tutorial) will guide you through everything.

## Technical Questions

### What's the difference between rendered and un-rendered components?

Un-rendered components delegate the rendering to the clients. This is useful for performance and cacheability.

**Rendered components**: The registry executes the server logic and renders the HTML, returning ready-to-use markup. This is simpler for consumers but requires the registry to do the work.

**Un-rendered components**: The registry returns the compiled template and data separately. The client then performs the rendering. This approach offers better caching (templates can be cached independently of data) and reduced registry load.

## What happens when a publish is made?

When you publish a component, the following occurs:

1. **CLI packages the component** - Bundles server.js, compiles templates, and processes static assets
2. **Package is uploaded** - The compressed package is sent to the registry
3. **Registry validates** - Checks version conflicts, authentication, and custom validation rules
4. **Assets are distributed** - Files are uploaded to storage (S3, Google Cloud, etc.)
5. **Registry index updates** - The component becomes available for consumption

See the [Architecture Overview](../concepts/architecture-overview#publishing-workflow) for more details.

## How does distribution work?

OpenComponents supports multi-registry deployment where:

1. **Shared storage** - All registries connect to the same storage backend (S3, GCS, etc.)
2. **Polling mechanism** - Registries poll the storage for changes every few seconds
3. **Automatic sync** - New components propagate to all registries automatically
4. **CDN caching** - Static assets are cached at the edge for global performance

See the [Architecture Overview](../concepts/architecture-overview#distribution--replication) for the complete distribution flow.

## Can I link a CDN on top of the S3 bucket?

Yes! Either you use Cloudfront or any other vendor's on top of the S3, you will get a url, for instance `https://123456789.cloudfront.org/...` or `https://my-cdn.my-company.com`. Then set the `s3.path` property in the [registry configuration](/docs/registry/registry-configuration#registry-configuration).

## Can I avoid using S3?

Yes! There is support for [Google Storage](../registry/registry-using-google-storage), Microsoft Azure and more. For more storage adapters and creating new ones, please join the conversation in this repo: https://github.com/opencomponents/storage-adapters

## I already use S3 to save my assets via a consolidated build pipeline. Can I reference this files from my OC components?

Yes. OC allows you to bundle all the resources a component needs inside itself (and takes care of putting all the stuff in place during the publishing), but you are free to link (absolutely) any other static asset inside your components' markup. OC will still need S3 for saving its stuff though: if you decide to share the same S3 bucket (probably because you already got a configured CDN on top of it) be careful! In particular,

- OC heavily relies on S3 for its operations. Dedicating its own bucket is a good measure for limiting it to interfere with any other application.
- OC saves some files with different ACL policies when a component is published. If your bucket is already configured to be completely public (it may be the case if you use it for hosting a static site), this may not be good for OC as you may not want to expose some private stuff. In this case, you may need to get a separate bucket so that you can apply the appropriate configuration.

## I've successfully published a component on the registry, what if I want to remove it?

Removing a component manually in s3 is tricky because oc relies on immutability for keeping infinite caches on many layers (clients, registry, and cdn - if there's any). That's why publishing a new version is always the recommended approach to easily invalidate all the caches. If you are doing it in an experimental phase is fine, but we ultimately wouldn't recommend it in production.

## Where can i find the logs for oc registry?

logs are not automatically saved as text files anywhere as the registry is supposed to be stateless and distributed. When instantiating the registry app, the registry [exposes a set of events](../registry/registry-configuration#registryoneventname-callback) that you can use to connect to your logging infrastructure

For example, at OpenTable we do logging with the ELK stack for business metrics, and Graphite/Graphana for system metrics - so in real time we can profile resources, performance, and behaviour when we have millions of requests/hour(and connect those metrics to monitoring and alerting)

## Can I setup a debugger with Visual Studio Code?

Yes, [look at this page](../building/debugging).

## Performance Questions

### How does OpenComponents affect page load performance?

OpenComponents can improve performance through:

- **Caching**: Components are cached at multiple levels
- **CDN delivery**: Static assets served from CDN
- **Lazy loading**: Components can be loaded on-demand
- **Parallel loading**: Multiple components load simultaneously

However, there is some overhead from the client library and HTTP requests.

### Can I use OpenComponents with a CDN?

Yes! OpenComponents works excellently with CDNs. Set the `s3.path` property in your [registry configuration](../registry/registry-configuration) to your CDN URL.

### How do I optimize component bundle sizes?

- Keep components focused and small
- Minimize dependencies in package.json
- Use tree-shaking compatible libraries
- Optimize images and static assets
- Consider code splitting for larger components

## Troubleshooting

### My component shows "Loading..." forever

**Common causes:**

1. **Registry not accessible** - Check if the registry URL is reachable
2. **JavaScript errors** - Check browser console for errors
3. **Template compilation errors** - Verify your template syntax
4. **Network issues** - Check network connectivity

**Solutions:**

```bash
# Test registry accessibility
curl https://your-registry.com/your-component

# Check component locally
oc dev . 3030
oc preview http://localhost:3030/your-component
```

### Publishing fails with authentication errors

**Solutions:**

1. Verify your username and password
2. Check if the registry URL is correct
3. Ensure you have publishing permissions
4. Try the `--dryRun` flag first to test

### Component works locally but fails in production

**Common issues:**

1. **Environment variables** - Ensure all required env vars are set
2. **Dependencies** - Check if all dependencies are installed
3. **CORS issues** - Verify cross-origin settings
4. **SSL/HTTPS** - Ensure proper SSL configuration

### Template compilation errors

**For ES6 templates (default):**

- Check for proper template literal syntax: `${variable}` not `{variable}`
- Ensure template function returns valid HTML string
- Verify all variables are defined in server.js

**For React templates:**

- Verify JSX syntax
- Check for missing imports
- Ensure proper export statements

**For legacy Handlebars templates:**

- Check for unescaped special characters
- Verify all variables are defined in server.js
- Ensure proper syntax: `{{variable}}` not `{variable}`

## Development Workflow

### How do I test components before publishing?

1. **Local development:**

   ```bash
   oc dev . 3030
   oc preview http://localhost:3030/your-component
   ```

2. **Dry run publishing:**

   ```bash
   oc publish your-component --dryRun
   ```

3. **Integration testing:**
   Create test HTML pages with your components

### Can I use TypeScript with OpenComponents?

Yes! Many templates support TypeScript:

- Use React templates with TypeScript
- Configure your build process accordingly
- Ensure proper type definitions

### How do I handle secrets and environment variables?

- Use environment variables in your registry configuration
- Never commit secrets to your component code
- Use the registry's plugin system for secure data access

## Community and Support

### Where can I get help?

- **Documentation**: Start with our [Quick Start Tutorial](../quick-start-tutorial)
- **GitHub Issues**: Report bugs or ask questions
- **Community**: Join discussions with other developers
- **Examples**: Check out the [template repositories](https://github.com/opencomponents/vite-templates)

### How do I contribute to OpenComponents?

1. Check the main [OpenComponents repository](https://github.com/opencomponents/oc)
2. Look for "good first issue" labels
3. Read the contributing guidelines
4. Submit pull requests with improvements

### Is OpenComponents production-ready?

Yes! OpenComponents is used in production by many companies. However:

- Ensure proper monitoring and alerting
- Have fallback strategies for component failures
- Test thoroughly in your specific environment
- Consider the learning curve for your team
