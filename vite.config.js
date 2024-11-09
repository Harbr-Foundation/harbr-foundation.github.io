// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib')
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [
        // Add docs directory to allowed list
        'docs',
        // If you have images or other assets in docs
        'docs/images',
        // Add package root for node_modules
        '.'
      ]
    }
  }
});