<template>
  <div
    class="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    @click="$router.push(`/country/${country.code}`)"
  >
    <div class="flex items-center justify-between mb-2">
      <span class="text-lg font-semibold"> {{ country.flag }} {{ country.name }} </span>
      <span
        class="text-sm font-medium px-2 py-0.5 rounded-full"
        :class="{
          'bg-green-100 text-green-800': country.score >= 70,
          'bg-yellow-100 text-yellow-800': country.score >= 50 && country.score < 70,
          'bg-red-100 text-red-800': country.score < 50,
        }"
      >
        {{ country.score }}/100
      </span>
    </div>
    <p class="text-sm text-gray-600">
      {{ country.summary }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ICountryCard } from "~/types"

export default defineComponent({
  props: {
    country: {
      type: Object as PropType<ICountryCard>,
      required: true,
    },
  },
})
</script>
