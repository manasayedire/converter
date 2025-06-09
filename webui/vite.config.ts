/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.CHROMATIC': env.VITE_CHROMATIC === 'true',
    },
    plugins: [react()],
    build: {
      outDir: 'build', // CRA's default build output
    },
    server: {
      host: env.VITE_HOST || 'localhost',
      port: Number(env.VITE_PORT) || 3000,
      open: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      pool: 'vmThreads',
      coverage: {
        reporter: ['text'], // Optional: Add coverage reports
      },
    },
  };
});
