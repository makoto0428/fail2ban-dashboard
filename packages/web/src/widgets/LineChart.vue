<script setup>
  import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { LineChart } from 'vue-chart-3';
  import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';

  // i18n
  const { t } = useI18n();

  // Chart.js に必要なコントローラ等を登録
  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
  );

  // ✅ JSランタイムの props 宣言（型パラメータは使わない）
  const props = defineProps({
    /** @type {string[]} X軸ラベル */
    labels: { type: Array, default: () => [] },
    /** @type {number[]} データ値 */
    values: { type: Array, default: () => [] },
  });

  // ======= レスポンシブな tick 本数制御 =======
  const containerRef = ref(null);
  const containerWidth = ref(0);

  function updateNow() {
    const el = containerRef.value;
    if (!el) return;
    const w = el.getBoundingClientRect().width || el.offsetWidth || 0;
    if (w > 0) containerWidth.value = w;
  }

  let ro;
  function observeWidth() {
    ro = new ResizeObserver((entries) => {
      for (const e of entries) containerWidth.value = e.contentRect.width || 0;
    });
    if (containerRef.value) ro.observe(containerRef.value);
  }

  function onWinResize() {
    updateNow();
  }

  function targetTickCount(width) {
    if (width >= 1400) return 24;
    if (width >= 1024) return 12;
    if (width >= 768) return 8;
    if (width >= 500) return 6;
    return 4;
  }

  onMounted(async () => {
    await nextTick();
    updateNow();
    observeWidth();
    window.addEventListener('resize', onWinResize);
  });

  onBeforeUnmount(() => {
    if (ro) ro.disconnect();
    window.removeEventListener('resize', onWinResize);
  });

  /** Chart.js に渡すデータ */
  function buildChartData() {
    return {
      labels: props.labels,
      datasets: [
        {
          // ← ここを i18n に
          label: t('dashboard.chart.attacksPerHour'),
          data: props.values,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 3,
          pointHoverRadius: 6,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,0.15)',
          pointBackgroundColor: '#38bdf8',
          fill: true,
        },
      ],
    };
  }

  /** オプション */
  function buildOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      plugins: {
        legend: {
          position: 'top',
          labels: { usePointStyle: true, pointStyle: 'line', padding: 16, color: '#e2e8f0' },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          padding: 10,
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(148,163,184,0.3)',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#cbd5e1',
          displayColors: false,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.formattedValue}`,
          },
        },
      },
      hover: { mode: 'nearest', intersect: false },
      interaction: { mode: 'nearest', intersect: false },
      layout: { padding: { top: 0, right: 8, bottom: 10, left: 8 } },
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.15)' },
          ticks: {
            color: '#94a3b8',
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            padding: 4,
            callback: (val, idx) => {
              const labels = props.labels;
              const total = labels.length || 0;
              if (!total) return '';
              const want = targetTickCount(containerWidth.value);
              const step = Math.max(1, Math.ceil(total / want));
              return idx % step === 0 ? labels[idx] : '';
            },
          },
          offset: true,
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0, color: '#94a3b8' },
          grid: { color: 'rgba(148,163,184,0.3)' },
        },
      },
      normalized: true,
      spanGaps: true,
    };
  }

  const chartData = computed(() => buildChartData());
  const options = computed(() => buildOptions());
</script>

<template>
  <div ref="containerRef" class="h-[340px] w-full">
    <LineChart :chart-data="chartData" :options="options" />
  </div>
</template>
