<template>
  <div class="w-full rounded-2xl border bg-white p-3 sm:p-4 shadow-sm" :style="{ borderColor: stroke, boxShadow: `0 0 0 1px ${stroke}10` }">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-2.5 w-2.5 rounded-full animate-pulse" :style="{ backgroundColor: stroke }" aria-hidden="true" />
        <span class="text-sm sm:text-base font-medium text-gray-900"> Economic Pulse </span>
      </div>

      <!-- Status badge -->
      <span
        class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
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

    <!-- KPI strip -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3">
      <div class="rounded-lg border px-3 py-2" :style="{ borderColor: stroke + '33', backgroundColor: '#fff' }">
        <div class="text-[11px] uppercase tracking-wide text-gray-500">BPM</div>
        <div class="text-lg font-semibold text-gray-900">
          {{ bpm }}
          <span class="text-xs text-gray-500 ml-1">beats/min</span>
        </div>
      </div>

      <div class="rounded-lg border px-3 py-2" :style="{ borderColor: stroke + '33', backgroundColor: '#fff' }">
        <div class="text-[11px] uppercase tracking-wide text-gray-500">Variability</div>
        <div class="text-lg font-semibold text-gray-900">
          {{ hrvPctDisplay }}
          <span class="text-xs text-gray-500 ml-1">HRV</span>
        </div>
      </div>

      <div class="rounded-lg border px-3 py-2 col-span-2 sm:col-span-1" :style="{ borderColor: stroke + '33', backgroundColor: '#fff' }">
        <div class="text-[11px] uppercase tracking-wide text-gray-500">Noise</div>
        <div class="text-lg font-semibold text-gray-900">
          {{ noiseAmpDisplay }}
        </div>
      </div>
    </div>

    <!-- Canvas -->
    <canvas ref="canvasEl" class="block w-full rounded-xl border" :style="{ height: '220px', borderColor: stroke + '26' }" />
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
    const bpm = computed(() => Math.round(getWaveParams.value?.BPM ?? 0))
    const hrvPctDisplay = computed(() => {
      const v = getWaveParams.value?.HRV_PCT ?? 0
      return `${Math.round(v * 100)}%`
    })
    const noiseAmpDisplay = computed(() => {
      const v = getWaveParams.value?.NOISE_AMP ?? 0

      return `${Math.round(v * 100)}%`
    })

    return {
      canvasEl,
      statusLabel,
      stroke,
      bpm,
      hrvPctDisplay,
      noiseAmpDisplay,
      getGlobalStatus,
    }
  },
})
</script>
