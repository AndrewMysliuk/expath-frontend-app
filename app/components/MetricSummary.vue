<template>
  <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
    <div v-for="(value, key) in readableMetrics" :key="key" class="bg-white rounded-lg shadow p-4 border border-gray-100">
      <p class="text-sm text-gray-500">{{ key }}</p>
      <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import type { PropType } from "vue"

const METRIC_LABELS: Record<string, string> = {
  inflation: "Inflation (%)",
  unemployment: "Unemployment (%)",
  interestRate: "Interest Rate (%)",
  pmi: "PMI",
}

export default defineComponent({
  props: {
    metrics: {
      type: Object as PropType<Record<string, number>>,
      required: true,
    },
  },

  setup(props) {
    const readableMetrics = computed(() =>
      Object.entries(props.metrics).reduce((acc, [key, val]) => {
        const label = METRIC_LABELS[key] || key
        acc[label] = val.toFixed(1)
        return acc
      }, {} as Record<string, string>)
    )

    return { readableMetrics }
  },
})
</script>
