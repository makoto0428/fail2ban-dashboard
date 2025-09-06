import { createRouter, createWebHistory } from 'vue-router';

// 画面（Heatboard は既存、他はプレースホルダ）
import Heatboard from '@/views/Heatboard.vue';
const Logs = () => import('@/views/_stub/Logs.vue');
const Bans = () => import('@/views/_stub/Bans.vue');
const Reports = () => import('@/views/_stub/Reports.vue');
const Settings = () => import('@/views/_stub/Settings.vue');

/**
 * @function createAppRouter
 * @returns {import('vue-router').Router}
 * ルーターを生成。メニューとURLのひも付けだけ先に用意。
 */
export function createAppRouter() {
  // ここではヒストリーのみ。将来、ベースURLやガードを追加して拡張可。
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/heatboard' },
      { path: '/heatboard', name: 'heatboard', component: Heatboard, meta: { title: 'Heatboard' } },
      { path: '/logs', name: 'logs', component: Logs, meta: { title: 'Logs / Events' } },
      { path: '/bans', name: 'bans', component: Bans, meta: { title: 'Bans / Unbans' } },
      { path: '/reports', name: 'reports', component: Reports, meta: { title: 'Reports' } },
      { path: '/settings', name: 'settings', component: Settings, meta: { title: 'Settings' } },
    ],
  });
}
