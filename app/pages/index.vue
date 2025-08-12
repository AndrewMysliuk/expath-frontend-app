<template>
  <div class="flex flex-col justify-center items-center h-full w-full bg-orange-100 px-4 py-8">
    <h1 class="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-6">Economic Pulse</h1>
    <PulseIndicator status="EXCELLENT" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue"
import { PulseIndicator } from "~/components"
import { useIndexHead } from "~/composables/useIndexHead"
import type { IDailyData, IHistory } from "~/types"

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { accept: "application/json" } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export default defineComponent({
  components: { PulseIndicator },
  setup() {
    useIndexHead()

    const dailyData = ref<IDailyData | null>(null)
    const historyData = ref<IHistory | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const ac = new AbortController()

    const load = async () => {
      loading.value = true
      error.value = null

      try {
        const [daily, history] = await Promise.all([
          fetchJSON<IDailyData>("/2025-08-10.json", ac.signal),
          fetchJSON<IHistory>("/history_180.json", ac.signal),
        ])
        dailyData.value = daily
        historyData.value = history
      } catch (e: any) {
        error.value = e?.message ?? "Failed to load"
      } finally {
        loading.value = false
      }
    }

    onMounted(load)

    onBeforeUnmount(() => ac.abort())

    return { dailyData, historyData, loading, error, reload: load }
  },
})
</script>
