<template>
  <div class="rounded-xl border border-slate-700 bg-slate-800 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm opacity-70">{{ title }}</p>
        <p class="text-2xl font-semibold mt-1 tracking-tight">{{ value }}</p>
      </div>
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br" :class="accentClass"></div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  /**
   * @typedef Props
   * @property {string} title
   * @property {number|string} value
   * @property {string} [accent='from-sky-500 to-indigo-500']
   */

  /** @type {import('vue').DefineProps<Props>} */
  const props = defineProps({
    title: { type: String, required: true },
    value: { type: [Number, String], required: true },
    accent: { type: String, default: 'from-sky-500 to-indigo-500' },
  });

  /** @returns {import('vue').ComputedRef<string>} */
  const accentClass = computed(() => `bg-gradient-to-br ${props.accent}`);
</script>
