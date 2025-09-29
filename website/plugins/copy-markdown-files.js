const fs = require("fs-extra");
const path = require("path");

/**
 * Custom Docusaurus plugin that copies original markdown files
 * to the build directory alongside the generated HTML files
 */
async function copyMarkdownFilesPlugin(context, options) {
  return {
    name: "copy-markdown-files",
    async postBuild({ siteDir, outDir }) {
      console.log("📄 Copying original markdown files to build directory...");

      try {
        // Define source directories to copy from
        const sourceDirs = [
          path.join(siteDir, "docs"),
          path.join(siteDir, "blog"),
        ];

        // Define corresponding target directories
        const targetDirs = [
          path.join(outDir, "docs"),
          path.join(outDir, "blog"),
        ];

        // Copy each source directory to its target
        for (let i = 0; i < sourceDirs.length; i++) {
          const sourceDir = sourceDirs[i];
          const targetDir = targetDirs[i];

          // Check if source directory exists
          if (await fs.pathExists(sourceDir)) {
            console.log(
              `  📁 Copying ${path.basename(sourceDir)} directory...`
            );

            // Ensure target directory exists
            await fs.ensureDir(targetDir);

            // Copy all markdown files recursively
            await copyMarkdownFilesRecursive(sourceDir, targetDir);

            console.log(
              `  ✅ Successfully copied ${path.basename(sourceDir)} files`
            );
          } else {
            console.log(
              `  ⚠️  Source directory ${sourceDir} does not exist, skipping...`
            );
          }
        }

        // Copy static markdown files from src/pages if they exist
        const srcPagesDir = path.join(siteDir, "src", "pages");
        if (await fs.pathExists(srcPagesDir)) {
          console.log("  📄 Checking for markdown files in src/pages...");
          await copyMarkdownFilesRecursive(srcPagesDir, outDir);
        }

        console.log("🎉 All markdown files copied successfully!");
      } catch (error) {
        console.error("❌ Error copying markdown files:", error);
        throw error;
      }
    },
  };
}

/**
 * Recursively copy markdown files from source to target directory
 * @param {string} sourceDir - Source directory path
 * @param {string} targetDir - Target directory path
 */
async function copyMarkdownFilesRecursive(sourceDir, targetDir) {
  const items = await fs.readdir(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    const stat = await fs.stat(sourcePath);

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      await fs.ensureDir(targetPath);
      await copyMarkdownFilesRecursive(sourcePath, targetPath);
    } else if (
      stat.isFile() &&
      (item.endsWith(".md") || item.endsWith(".mdx"))
    ) {
      // Copy markdown files
      await fs.copy(sourcePath, targetPath);
      console.log(
        `    📄 Copied: ${path.relative(
          process.cwd(),
          sourcePath
        )} → ${path.relative(process.cwd(), targetPath)}`
      );
    }
  }
}

module.exports = copyMarkdownFilesPlugin;
