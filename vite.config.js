import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,           // dev hot reload
      // If you want the production build manifest in public/build:
      buildDirectory: 'public/build', // (optional older plugin options)
    }),
    react(),
  ],
  build: {
    outDir: 'public/build',   // ensure manifest and files are placed here
    manifest: true,
    rollupOptions: {
      input: 'resources/js/app.jsx',
    },
  },
});
