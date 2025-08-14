<template>
  <div class="w-full rounded-2xl border bg-white p-3 sm:p-4 shadow-sm" :style="{ borderColor: stroke, boxShadow: `0 0 0 1px ${stroke}10` }">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-2.5 w-2.5 rounded-full animate-pulse" :style="{ backgroundColor: stroke }" aria-hidden="true" />
        <span class="text-sm sm:text-base font-medium text-gray-900">Economic Pulse</span>
      </div>

      <!-- Status badge -->
      <span
        class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border"
        :style="{
          color: stroke,
          backgroundColor: stroke + '15',
          borderColor: stroke + '33',
        }"
      >
        <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: stroke }" />
        {{ statusLabel }}
      </span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvasEl" class="block w-full rounded-xl border" :style="{ height: '220px', borderColor: stroke + '26' }" />

    <div class="mt-4">
      <!-- Summary -->
      <div
        class="rounded-lg border px-3 py-3 mb-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
        :style="{
          borderColor: '#e5e7eb',
          backgroundColor: '#fff',
          boxShadow: `0 1px 0 0 ${stroke}10 inset`,
          borderLeft: `3px solid ${stroke}`,
        }"
      >
        <div class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Summary</div>
        <div class="text-sm text-gray-900 leading-relaxed">
          {{ getDailyData?.summary.summary }}
        </div>
      </div>

      <!-- Tip -->
      <div
        class="rounded-lg border px-3 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
        :style="{
          borderColor: '#e5e7eb',
          backgroundColor: '#fff',
          boxShadow: `0 1px 0 0 ${stroke}10 inset`,
          borderLeft: `3px solid ${stroke}`,
        }"
      >
        <div class="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Tip</div>
        <div class="text-sm text-gray-900 leading-relaxed">
          {{ getDailyData?.summary.tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useIncomingDataStore } from "@/store"
import { usePulseRenderer } from "@/composables/usePulseRenderer"
import { MetricStatusEnum } from "@/types"

export default defineComponent({
  setup() {
    const incomingDataStore = useIncomingDataStore()

    const getGlobalStatus = computed(() => incomingDataStore.getGlobalStatus)
    const getWaveParams = computed(() => incomingDataStore.getWaveParams)
    const getDailyData = computed(() => incomingDataStore.getDailyData)

    const { canvasEl } = usePulseRenderer(getWaveParams, getGlobalStatus)

    const statusLabel = computed(() => {
      switch (getGlobalStatus.value) {
        case MetricStatusEnum.EXCELLENT:
          return "Excellent"
        case MetricStatusEnum.GOOD:
          return "Good"
        case MetricStatusEnum.MODERATE:
          return "Moderate"
        case MetricStatusEnum.WARNING:
          return "Warning"
        case MetricStatusEnum.DANGER:
          return "Danger"
        case MetricStatusEnum.CRITICAL:
          return "Critical"
        default:
          return "Unknown"
      }
    })

    const stroke = computed(() => getWaveParams.value?.STROKE ?? "#9ca3af")

    return {
      canvasEl,
      statusLabel,
      stroke,
      getDailyData,
      getGlobalStatus,
    }
  },
})
</script>
