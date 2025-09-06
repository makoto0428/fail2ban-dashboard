import { createI18n } from 'vue-i18n';
import ja from './ja.js';
import en from './en.js';

export const i18n = createI18n({
  legacy: false, // Composition API モード
  locale: localStorage.getItem('locale') || 'ja',
  fallbackLocale: 'en',
  messages: { ja, en },
});
