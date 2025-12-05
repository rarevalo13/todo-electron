import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: '.vite/build',
    lib: {
      entry: resolve(__dirname, 'src/preload.ts'),
      fileName: () => 'preload.js',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron'],
    },
    emptyOutDir: false,
  },
});
