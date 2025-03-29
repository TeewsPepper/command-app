import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Opcional: define el host
    port: 5173,        // Puerto por defecto
    open: true         // Abre el navegador automáticamente
  }
});
