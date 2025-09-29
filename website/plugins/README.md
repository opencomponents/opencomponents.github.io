# Copy Markdown Files Plugin

This custom Docusaurus plugin automatically copies original markdown (`.md`) and MDX (`.mdx`) files to the build directory alongside the generated HTML files during the build process.

## What it does

When you run `npm run build`, this plugin will:

1. **Copy documentation files**: All `.md` and `.mdx` files from the `docs/` directory are copied to `build/docs/` maintaining the same directory structure
2. **Copy blog files**: All `.md` and `.mdx` files from the `blog/` directory are copied to `build/blog/` maintaining the same directory structure
3. **Copy page files**: Any `.md` or `.mdx` files from `src/pages/` are copied to the root of the build directory

## Example output

After building, you'll have both files for each route:

```
build/
├── docs/
│   ├── intro/
│   │   ├── index.html          # Generated HTML
│   │   └── index.md            # Original markdown (copied)
│   └── concepts/
│       ├── why-opencomponents/
│       │   ├── index.html      # Generated HTML
│       │   └── why-opencomponents.md  # Original markdown (copied)
└── blog/
    ├── first-blog-post/
    │   ├── index.html          # Generated HTML
    │   └── 2019-05-28-first-blog-post.md  # Original markdown (copied)
```

## Installation

The plugin is already configured in your `docusaurus.config.js`:

```javascript
plugins: [
  require.resolve("./plugins/copy-markdown-files.js"),
],
```

## Usage

Simply run your normal build command:

```bash
npm run build
```

The plugin will automatically run during the build process and copy all markdown files. You'll see output like:

```
📄 Copying original markdown files to build directory...
  📁 Copying docs directory...
    📄 Copied: docs/intro.md → build/docs/intro.md
    📄 Copied: docs/concepts/why-opencomponents.md → build/docs/concepts/why-opencomponents.md
  ✅ Successfully copied docs files
  📁 Copying blog directory...
    📄 Copied: blog/2019-05-28-first-blog-post.md → build/blog/2019-05-28-first-blog-post.md
  ✅ Successfully copied blog files
🎉 All markdown files copied successfully!
```

## Configuration

The plugin doesn't require any configuration, but you can modify the source directories in the plugin file if needed:

- `docs/` - Documentation files
- `blog/` - Blog post files
- `src/pages/` - Page files

## Benefits

- **Access to original content**: You can access the original markdown source alongside the rendered HTML
- **Version control**: Useful for diffing changes or accessing raw content programmatically
- **API integration**: Other tools can consume the original markdown files
- **Backup**: Original files are preserved in the build output

## Technical details

- The plugin uses the `postBuild` lifecycle hook to run after Docusaurus has generated all HTML files
- It recursively traverses directories and only copies `.md` and `.mdx` files
- The plugin uses `fs-extra` (already available through Docusaurus) for file operations
- Directory structure is preserved exactly as it exists in the source
