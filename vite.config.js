import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow JSX inside .js files (Create React App convention) so components
// don't have to be renamed during the migration off react-scripts.
export default defineConfig({
  plugins: [react({ include: '**/*.{js,jsx}', jsxRuntime: 'classic' })],
  server: { port: 3000, open: true },
  build: { outDir: 'build' },
  esbuild: { loader: 'jsx', include: /src\/.*\.js$/, exclude: [] },
  optimizeDeps: {
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
