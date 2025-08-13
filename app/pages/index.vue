<template>
  <div class="flex flex-col justify-center items-center h-full w-full bg-orange-100 px-4 py-8">
    <h1 class="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-6">Economic Pulse</h1>

    <PulseIndicator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { PulseIndicator } from "~/components"
import { useIndexHead } from "~/composables/useIndexHead"

export default defineComponent({
  components: { PulseIndicator },

  setup() {
    useIndexHead()

    return {}
  },
})
</script>
