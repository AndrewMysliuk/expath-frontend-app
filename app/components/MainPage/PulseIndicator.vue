<template>
  <section class="px-6 pb-16">
    <div class="max-w-6xl mx-auto">
      <div class="text-center">
        <div
          class="bg-white border-2 rounded-xl p-8 max-w-2xl mx-auto shadow-sm"
          :style="{ borderColor: stroke, boxShadow: `0 0 0 1px ${stroke}10` }"
        >
          <div class="mb-6">
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Current Global Status</div>

            <div class="flex items-center justify-center gap-3">
              <span class="text-2xl font-semibold text-gray-700">{{ statusLabel }}</span>
            </div>
          </div>

          <div class="w-full rounded-xl border overflow-hidden" :style="{ borderColor: stroke + '26' }">
            <canvas ref="canvasEl" class="block w-full" :style="{ height: '220px' }" />
          </div>
        </div>
      </div>
    </div>
  </section>
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

    return {
      canvasEl,
      statusLabel,
      stroke,
      getGlobalStatus,
    }
  },
})
</script>
