import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env.CHROMATIC': false,
  },
  plugins: [react()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    pool: "vmThreads",
    coverage: {
        reporter: ['text'], // Optional: Add coverage reports
    },
  },
});