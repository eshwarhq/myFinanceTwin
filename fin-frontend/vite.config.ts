import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: {
      proxy: isDev
        ? {
          '/api': {
            target: 'https://luffy-backend-248534326141.asia-south1.run.app', // your backend port
            changeOrigin: true,
            secure: false
          },
        }
        : undefined,
    },
  };
});
