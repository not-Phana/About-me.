import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Supports both `npm run dev` (live HMR from /src/main.jsx) and direct opening
// of index.html (`file:///`) or GitHub Pages root/subpath deployment.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'pk-dev-hmr-injector',
      apply: 'serve',
      transformIndexHtml(html) {
        return html
          .replace('<link rel="stylesheet" href="./assets/app.bundle.css" />', '')
          .replace(
            '<script defer src="./assets/app.bundle.js"></script>',
            '<script type="module" src="/src/main.jsx"></script>'
          );
      },
    },
  ],
  base: './',
});
