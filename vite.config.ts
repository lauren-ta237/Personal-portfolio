import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const isHmrDisabled = process.env.DISABLE_HMR === 'true';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Change this to point directly to your frontend source folder (e.g., './src' or './client')
        // so Vite stops evaluating server files as frontend modules!
        '@': path.resolve(__dirname, './src'), 
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: !isHmrDisabled,
      // Configure the file watcher safely
      watch: isHmrDisabled 
        ? null 
        : {
            // Explicitly ignore the server folder so backend updates don't trigger browser reloads
            ignored: ['**/server/**'],
          },
    },
  };
});