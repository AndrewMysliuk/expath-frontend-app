<template>
  <NuxtPage />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useIncomingDataStore } from "@/store"

export default defineComponent({
  setup() {
    const incomingDataStore = useIncomingDataStore()

    onMounted(() => {
      incomingDataStore.fetchAllData().catch(() => {})
    })

    onBeforeUnmount(() => {
      incomingDataStore.cancel()
    })

    return {}
  },
})
</script>
