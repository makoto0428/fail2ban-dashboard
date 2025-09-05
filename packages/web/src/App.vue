<template>
  <main style="max-width:900px;margin:0 auto;padding:16px">
    <h1>Fail2ban Dashboard (Dev)</h1>
    <p>API /health: <b>{{ health?.ok ? 'OK' : '...' }}</b></p>
    <div>
      <label>日数: <input type="number" min="1" v-model.number="days" /></label>
      <button @click="load">読み込み</button>
    </div>
    <ul v-if="summary">
      <li>範囲: {{ summary.rangeDays }} 日</li>
      <li>Bans: {{ summary.bans }}</li>
      <li>Unbans: {{ summary.unbans }}</li>
      <li>Restores: {{ summary.restores }}</li>
      <li>Total: {{ summary.total }}</li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/**
 * @function fetchHealth
 * API /health を叩いて疎通確認。
 */
async function fetchHealth() {
  try {
    const r = await fetch('/health')
    return await r.json()
  } catch {
    return { ok: false }
  }
}

const days = ref(14)
const summary = ref(null)
const health = ref({ ok: false })

/**
 * @function load
 * 集計のダミーAPIを叩いてUIデモ。
 */
async function load() {
  const { getSummary } = await import('./services/api.js')
  summary.value = await getSummary(days.value)
}

onMounted(async () => {
  health.value = await fetchHealth()
  await load()
})
</script>
