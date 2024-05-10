import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/translate': {
        target: 'https://api.funtranslations.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/translate/, '/translate')
      }
    }
  }
});
