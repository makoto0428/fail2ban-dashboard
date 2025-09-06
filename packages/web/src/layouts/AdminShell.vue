<template>
  <div class="flex h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-slate-800 border-r border-slate-700 transition-[width] duration-200 ease-in-out flex flex-col shrink-0',
        collapsed ? 'w-16' : 'w-64',
      ]"
    >
      <!-- Brand / Toggle -->
      <div
        class="flex items-center justify-between px-3 py-3"
        :class="collapsed ? 'justify-center' : 'justify-between'"
      >
        <!-- ロゴ -->
        <div
          class="text-xl font-bold select-none truncate"
          :class="collapsed ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'"
        >
          {{ t('app.name') }}
        </div>

        <!-- Toggle button -->
        <button
          class="p-2 rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          :aria-label="collapsed ? t('app.expandSidebar') : t('app.collapseSidebar')"
          :title="t('app.toggleSidebar')"
          @click="toggleSidebar"
        >
          <component :is="collapsed ? Bars3Icon : Bars3BottomLeftIcon" class="h-6 w-6" />
        </button>
      </div>

      <!-- Nav -->
      <nav class="mt-1 px-2 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="group flex items-center rounded transition-colors"
          :class="[
            collapsed ? 'justify-center h-10' : 'gap-3 px-3 py-2',
            isActive(item.to) ? 'bg-slate-700' : 'hover:bg-slate-700',
          ]"
          :title="collapsed ? item.label : undefined"
        >
          <component :is="item.icon" class="h-6 w-6 text-slate-200" />
          <span
            class="truncate transition-opacity duration-150"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'"
          >
            {{ item.label }}
          </span>
        </RouterLink>
      </nav>

      <div class="mt-auto p-2 text-center text-xs text-slate-400">
        {{ t('app.version', { v: '0.0.1' }) }}
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="sticky top-0 z-10 backdrop-blur bg-slate-900/70 border-b border-slate-800 px-4 py-3"
      >
        <div class="max-w-6xl mx-auto flex items-center justify-between">
          <h1 class="text-lg font-semibold">
            <slot name="title">Dashboard</slot>
          </h1>

          <!-- Locale Switch -->
          <div class="flex items-center gap-2">
            <button
              class="px-2 py-1 rounded text-xs border border-slate-700 hover:bg-slate-800"
              :aria-pressed="locale === 'ja'"
              @click="setLocale('ja')"
            >
              JA
            </button>
            <button
              class="px-2 py-1 rounded text-xs border border-slate-700 hover:bg-slate-800"
              :aria-pressed="locale === 'en'"
              @click="setLocale('en')"
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import {
    Bars3Icon,
    Bars3BottomLeftIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    Cog6ToothIcon,
    TableCellsIcon,
  } from '@heroicons/vue/24/outline';

  const { t, locale } = useI18n();

  const SIDEBAR_KEY = 'ui.sidebar.collapsed';

  /**
   * サイドバーの開閉状態を管理（ローカルストレージに永続化）
   */
  function useSidebar() {
    // 初期値は localStorage から復元（'1' を true として扱う）
    const initial =
      typeof localStorage !== 'undefined' && localStorage.getItem(SIDEBAR_KEY) === '1';
    const collapsed = ref(initial);

    function toggleSidebar() {
      collapsed.value = !collapsed.value;
    }

    // 開閉状態が変わる度に保存
    watch(
      collapsed,
      (v) => {
        try {
          localStorage.setItem(SIDEBAR_KEY, v ? '1' : '0');
        } catch {
          /* ignore storage errors */
        }
      },
      { immediate: true },
    );

    return { collapsed, toggleSidebar };
  }
  const { collapsed, toggleSidebar } = useSidebar();

  // メニュー
  const items = computed(() => [
    { to: '/heatboard', label: t('nav.heatboard'), icon: ChartBarIcon },
    { to: '/logs', label: t('nav.logs'), icon: TableCellsIcon },
    { to: '/bans', label: t('nav.bans'), icon: ShieldCheckIcon },
    { to: '/reports', label: t('nav.reports'), icon: DocumentTextIcon },
    { to: '/settings', label: t('nav.settings'), icon: Cog6ToothIcon },
  ]);

  // 現在ルート判定
  const route = useRoute();
  const isActive = (to) => route.path.startsWith(to);

  // ロケール切替（こちらは既に localStorage に保存済み）
  function setLocale(l) {
    locale.value = l;
    localStorage.setItem('locale', l);
  }
</script>
