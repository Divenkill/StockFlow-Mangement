import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The React dev server runs on 5173 and the Express API on 5000.
// This "proxy" forwards anything starting with /api to Express,
// so in React we can simply call fetch('/api/health') and never
// hard-code a port. It also avoids CORS problems during development.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
