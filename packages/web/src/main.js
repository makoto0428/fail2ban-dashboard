// 開発時にだけ MSW を起動（VITE_USE_MOCK=true のとき）
if (import.meta.env.DEV) {
  console.log('[mock] MSW starting...');
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass', // 未ハンドルは素通し
    serviceWorker: { url: '/mockServiceWorker.js' }, // 既定値だが明示してもOK
  });
}

import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import { createAppRouter } from './router/index.js';
import { i18n } from './i18n/index.js';

/**
 * @function bootstrap
 * アプリのブート処理。将来ストア等が増えてもここで集約。
 */
function bootstrap() {
  const app = createApp(App);

  const router = createAppRouter();
  app.use(router);
  app.use(i18n);
  app.mount('#app');
}

bootstrap();
