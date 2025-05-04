// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default ({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      proxy: {
        '/api': {
          target: "https://creator-dashboard-6bdp.onrender.com", // Ensure this is set in your .env files
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
