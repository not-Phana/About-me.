import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configured with relative base './' so the static build works seamlessly
// on both https://phanaach4889.github.io/ (root) and any repository subpath
// such as https://phanaach4889.github.io/about-me/ without broken asset links.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
