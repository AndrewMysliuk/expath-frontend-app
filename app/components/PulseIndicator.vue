<template>
  <div
    class="text-xl font-semibold px-4 py-2 rounded-full"
    :class="{
      'bg-green-200 text-green-800': status === 'growth',
      'bg-yellow-200 text-yellow-800': status === 'warning',
      'bg-red-200 text-red-800': status === 'crisis',
    }"
  >
    <span>
      {{ status === "growth" ? "Economy is growing" : status === "warning" ? "Tension rising" : "Crisis is approaching" }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"

export default defineComponent({
  props: {
    status: {
      type: String as PropType<"growth" | "warning" | "crisis">,
      required: true,
    },
  },
})
</script>
