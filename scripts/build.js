import { build } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

async function runBuild() {
  // 1. Build single IIFE bundle into ./assets for root index.html (file:/// & root GitHub Pages)
  await build({
    configFile: false,
    root: process.cwd(),
    base: './',
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    build: {
      outDir: 'dist-bundle',
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: path.resolve(process.cwd(), 'src/main.jsx'),
        output: {
          format: 'iife',
          name: 'PKPlatformApp',
          entryFileNames: 'app.bundle.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'app.bundle.css';
            }
            return '[name][extname]';
          },
        },
      },
    },
  });

  // 2. Ensure ./assets exists in project root and copy compiled app.bundle.js & app.bundle.css
  const rootAssetsDir = path.resolve(process.cwd(), 'assets');
  fs.mkdirSync(rootAssetsDir, { recursive: true });

  const publicAssetsDir = path.resolve(process.cwd(), 'public/assets');
  if (fs.existsSync(publicAssetsDir)) {
    for (const file of fs.readdirSync(publicAssetsDir)) {
      fs.copyFileSync(
        path.join(publicAssetsDir, file),
        path.join(rootAssetsDir, file)
      );
    }
  }

  fs.copyFileSync(
    path.resolve(process.cwd(), 'dist-bundle/app.bundle.js'),
    path.join(rootAssetsDir, 'app.bundle.js')
  );
  if (fs.existsSync(path.resolve(process.cwd(), 'dist-bundle/app.bundle.css'))) {
    fs.copyFileSync(
      path.resolve(process.cwd(), 'dist-bundle/app.bundle.css'),
      path.join(rootAssetsDir, 'app.bundle.css')
    );
  } else if (fs.existsSync(path.resolve(process.cwd(), 'dist-bundle/style.css'))) {
    fs.copyFileSync(
      path.resolve(process.cwd(), 'dist-bundle/style.css'),
      path.join(rootAssetsDir, 'app.bundle.css')
    );
  }

  // 3. Populate ./dist for GitHub Actions Pages artifact deployment
  const distDir = path.resolve(process.cwd(), 'dist');
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(distDir, 'assets'), { recursive: true });

  // Copy public root files (favicon.svg, og-image.svg, robots.txt, sitemap.xml) to root & dist
  const publicDir = path.resolve(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
      if (entry.isFile()) {
        fs.copyFileSync(
          path.join(publicDir, entry.name),
          path.join(distDir, entry.name)
        );
        fs.copyFileSync(
          path.join(publicDir, entry.name),
          path.resolve(process.cwd(), entry.name)
        );
      }
    }
  }

  // Copy all root ./assets into ./dist/assets
  for (const file of fs.readdirSync(rootAssetsDir)) {
    fs.copyFileSync(
      path.join(rootAssetsDir, file),
      path.join(distDir, 'assets', file)
    );
  }

  // Stamp index.html with cache-busting build version so browsers and GitHub Pages CDN never serve stale bundles
  const versionTag = Date.now().toString(36);
  const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  indexHtml = indexHtml
    .replace(
      /href="\.\/assets\/app\.bundle\.css(\?v=[^"]*)?"/,
      `href="./assets/app.bundle.css?v=${versionTag}"`
    )
    .replace(
      /src="\.\/assets\/app\.bundle\.js(\?v=[^"]*)?"/,
      `src="./assets/app.bundle.js?v=${versionTag}"`
    );
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml, 'utf8');

  fs.writeFileSync(path.resolve(process.cwd(), '.nojekyll'), '');
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

  // Clean up temporary dist-bundle folder
  fs.rmSync(path.resolve(process.cwd(), 'dist-bundle'), {
    recursive: true,
    force: true,
  });

  console.log(`Successfully built ./assets/app.bundle.{js,css}?v=${versionTag} and ./dist/ for direct index.html & GitHub Pages.`);
}

runBuild().catch((err) => {
  console.error(err);
  process.exit(1);
});
