<script setup>
  import { useI18n } from 'vue-i18n';

  /**
   * @typedef {'ban'|'unban'|'restore'} Action
   * @typedef {{time:string,jail:string,ip:string,country:string,action:Action,reason:string,asn?:string}} LogRow
   */

  /** @type {import('vue').PropType<LogRow[]>} */
  const props = defineProps({
    items: { type: Array, default: () => [] },
  });

  const { t } = useI18n();

  /**
   * アクション種別ごとに色分け
   * @param {Action} a
   * @returns {string}
   */
  function actionClass(a) {
    switch (a) {
      case 'ban':
        return 'bg-rose-500/20 text-rose-300 border border-rose-600/40';
      case 'unban':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-600/40';
      case 'restore':
        return 'bg-amber-500/20 text-amber-300 border border-amber-600/40';
      default:
        return 'bg-slate-700 text-slate-200';
    }
  }

  /** Action表示文言（i18n） */
  function displayAction(a) {
    return t(`logs.action.${a}`);
  }

  /**
   * ISO日時→ローカル短縮表示
   * @param {string} iso
   * @returns {string}
   */
  function fmtTime(iso) {
    try {
      const d = new Date(iso);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      return `${mm}/${dd} ${hh}:${mi}`;
    } catch {
      return iso;
    }
  }
</script>

<template>
  <div class="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
    <table class="w-full text-sm">
      <!-- 画面読み上げ向けの見出し -->
      <caption class="sr-only">{{ t('logs.caption') }}</caption>

      <thead class="bg-slate-800/60 text-slate-200">
        <tr>
          <th class="px-3 py-2 text-left w-28">{{ t('logs.headers.time') }}</th>
          <th class="px-3 py-2 text-left w-28">{{ t('logs.headers.jail') }}</th>
          <th class="px-3 py-2 text-left w-24">{{ t('logs.headers.action') }}</th>
          <th class="px-3 py-2 text-left">{{ t('logs.headers.ip') }}</th>
          <th class="px-3 py-2 text-left w-24">{{ t('logs.headers.country') }}</th>
          <th class="px-3 py-2 text-left">{{ t('logs.headers.reason') }}</th>
        </tr>
      </thead>

      <tbody v-if="props.items.length > 0">
        <tr
          v-for="row in props.items"
          :key="`${row.time}-${row.ip}-${row.jail}`"
          class="border-t border-slate-800"
        >
          <td class="px-3 py-2 text-slate-300 tabular-nums">{{ fmtTime(row.time) }}</td>
          <td class="px-3 py-2">
            <span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
              {{ row.jail }}
            </span>
          </td>
          <td class="px-3 py-2">
            <span class="px-2 py-0.5 rounded" :class="actionClass(row.action)">
              {{ displayAction(row.action) }}
            </span>
          </td>
          <td class="px-3 py-2">
            <a
              class="text-sky-300 hover:underline"
              :href="`https://ipinfo.io/${row.ip}`"
              target="_blank"
              rel="noreferrer"
            >
              {{ row.ip }}
            </a>
          </td>
          <td class="px-3 py-2 text-slate-300">{{ row.country }}</td>
          <td class="px-3 py-2 text-slate-300">{{ row.reason }}</td>
        </tr>
      </tbody>

      <!-- 空データ時 -->
      <tbody v-else>
        <tr class="border-t border-slate-800">
          <td class="px-3 py-6 text-center text-slate-400" colspan="6">
            {{ t('logs.empty') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
