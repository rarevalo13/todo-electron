import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: './',
  build: {
    outDir: '.vite/renderer/main_window',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
    emptyOutDir: true,
  },
});
