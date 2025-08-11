<template>
  <div class="flex flex-col justify-center items-center h-full w-full bg-orange-100 px-4 py-8">
    <h1 class="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-6">Economic Pulse</h1>
    <PulseIndicator status="EXCELLENT" />
    <!-- <MetricSummary :metrics="metrics" /> -->

    <br />
    <br />

    <!-- <InflationChart :labels="['Jan', 'Feb', 'Mar', 'Apr']" :data-points="[3.4, 3.7, 4.1, 4.2]" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import PulseIndicator from "~/components/PulseIndicator.vue"
// import MetricSummary from "~/components/MetricSummary.vue"
// import InflationChart from "~/components/InflationChart.vue"
import { useIndexHead } from "~/composables/useIndexHead"

export default defineComponent({
  components: {
    PulseIndicator,
    // MetricSummary,
    // InflationChart,
  },
  setup() {
    useIndexHead()

    const metrics = ref<Record<string, any>>({})

    onMounted(async () => {
      const res = await fetch("/2025-08-10.json")
      const json = await res.json()
      metrics.value = json
    })

    return {
      metrics,
    }
  },
})
</script>
