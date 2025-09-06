import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // デフォルトは "api" というサービス名を使う
  const apiHost = env.VITE_API_HOST || 'api';
  const apiPort = Number(env.VITE_API_PORT || env.API_PORT || 3000);
  const webPort = Number(env.WEB_PORT || 5173);

  return {
    plugins: [vue()],
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: {
      port: webPort,
      proxy: {
        '/api': { target: `http://${apiHost}:${apiPort}`, changeOrigin: true },
        '/health': {
          target: `http://${apiHost}:${apiPort}`,
          changeOrigin: true,
        },
      },
    },
  };
});
