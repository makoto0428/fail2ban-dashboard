<template>
  <AdminShell>
    <!-- ステータスカード -->
    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <CardStat :title="t('dashboard.stats.todayTotal')" :value="summary?.total ?? 0" />
      <CardStat
        :title="t('dashboard.stats.bans')"
        :value="summary?.bans ?? 0"
        accent="from-rose-500 to-pink-500"
      />
      <CardStat
        :title="t('dashboard.stats.unbans')"
        :value="summary?.unbans ?? 0"
        accent="from-emerald-500 to-teal-500"
      />
      <CardStat
        :title="t('dashboard.stats.restores')"
        :value="summary?.restores ?? 0"
        accent="from-amber-500 to-orange-500"
      />
    </section>

    <!-- 時系列チャート -->
    <section class="bg-slate-800 border border-slate-700 rounded-xl p-4 overflow-hidden mb-6">
      <h2 class="text-lg font-semibold mb-3">{{ t('dashboard.charts.seriesTitle') }}</h2>
      <div class="relative h-[320px] md:h-[360px] mb-8">
        <LineChart :labels="series.map((d) => d.time)" :values="series.map((d) => d.attacks)" />
      </div>
    </section>

    <!-- ランキング + ログ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 class="text-slate-200 mb-2">{{ t('dashboard.tables.topIpsTitle', { days: 7 }) }}</h3>
        <TopIpsTable :items="topIps" />
      </div>
      <div>
        <h3 class="text-slate-200 mb-2">{{ t('dashboard.tables.latestLogsTitle') }}</h3>
        <LogsTable :items="logs" />
      </div>
    </div>
  </AdminShell>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import AdminShell from '@/layouts/AdminShell.vue';
  import CardStat from '@/widgets/CardStat.vue';
  import LineChart from '@/widgets/LineChart.vue';
  import TopIpsTable from '@/widgets/TopIpsTable.vue';
  import LogsTable from '@/widgets/LogsTable.vue';

  import { getSummary, getTimeseriesToday, getTopIps, getLogs } from '@/services/api.js';

  const { t } = useI18n();

  // 期間（getSummary用）：あとでUI化する想定
  const days = ref(14);

  // データ
  const summary = ref(null);
  const series = ref([]);
  const topIps = ref([]);
  const logs = ref([]);

  // ローダー群
  async function loadSummary() {
    summary.value = await getSummary(days.value);
  }
  async function loadTimeseries() {
    series.value = await getTimeseriesToday();
  }
  async function loadTopIps() {
    topIps.value = await getTopIps(7);
  }
  async function loadLogs() {
    logs.value = await getLogs(50);
  }

  // 一括読み込み
  async function reloadAll() {
    await Promise.all([loadSummary(), loadTimeseries(), loadTopIps(), loadLogs()]);
  }

  onMounted(reloadAll);
</script>
