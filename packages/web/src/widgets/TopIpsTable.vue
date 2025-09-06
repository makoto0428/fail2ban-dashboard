<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  /**
   * @typedef {{ip:string,count:number,asn:string,country:string,lastSeen?:string,jails?:string[]}} TopIpRow
   */

  /** @type {import('vue').PropType<TopIpRow[]>} */
  const props = defineProps({
    items: { type: Array, default: () => [] },
  });

  // i18n フック
  const { t } = useI18n();

  /**
   * @function flagEmoji
   * @param {string} iso2 ISO 3166-1 alpha-2 (e.g. "US")
   * @returns {string} 国旗絵文字（なければ "🏳️"）
   */
  function flagEmoji(iso2) {
    if (!iso2 || iso2.length !== 2) return '🏳️';
    const A = 0x1f1e6;
    return String.fromCodePoint(
      ...iso2
        .toUpperCase()
        .split('')
        .map((c) => A + (c.charCodeAt(0) - 65)),
    );
  }

  const rows = computed(() =>
    props.items
      .slice()
      .sort((a, b) => b.count - a.count)
      .map((r, i) => ({ rank: i + 1, ...r })),
  );
</script>

<template>
  <div class="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-slate-800/60 text-slate-200">
        <tr>
          <th class="px-3 py-2 text-left w-14">#</th>
          <th class="px-3 py-2 text-left">{{ t('topIps.ip') }}</th>
          <th class="px-3 py-2 text-right w-24">{{ t('topIps.count') }}</th>
          <th class="px-3 py-2 text-left w-24">{{ t('topIps.country') }}</th>
          <th class="px-3 py-2 text-left">{{ t('topIps.asn') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.rank" class="border-t border-slate-800">
          <td class="px-3 py-2 text-slate-400">{{ r.rank }}</td>
          <td class="px-3 py-2">
            <a
              class="text-sky-300 hover:underline"
              :href="`https://ipinfo.io/${r.ip}`"
              target="_blank"
              rel="noreferrer"
            >
              {{ r.ip }}
            </a>
          </td>
          <td class="px-3 py-2 text-right tabular-nums">{{ r.count }}</td>
          <td class="px-3 py-2 flex items-center gap-2">
            <span class="text-lg leading-none">{{ flagEmoji(r.country) }}</span>
            <span class="text-slate-300">{{ r.country }}</span>
          </td>
          <td class="px-3 py-2 text-slate-300">
            <span class="font-mono">{{ r.asn }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
