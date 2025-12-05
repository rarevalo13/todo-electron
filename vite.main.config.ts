import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { builtinModules } from 'module';

const packageJsonPath = resolve(__dirname, 'package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

export default defineConfig(({ mode }) => {
  const config = {
    build: {
      outDir: '.vite/build',
      minify: false, 
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        fileName: () => 'main.js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external: ['electron', 'electron-squirrel-startup', ...builtinModules, ...Object.keys(pkg.dependencies || {}), ],
      },
      emptyOutDir: false,
    },
    define: {},
  };

  // Only define these if we are running the manual build for electron-builder
  // Electron Forge sets these automatically during its process.
  if (process.env.MANUAL_BUILD === 'true') {
    config.define = {
      MAIN_WINDOW_VITE_NAME: JSON.stringify('main_window'),
      MAIN_WINDOW_VITE_DEV_SERVER_URL: 'undefined',
    };
  }

  return config;
});
