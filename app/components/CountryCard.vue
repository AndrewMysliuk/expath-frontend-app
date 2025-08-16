<template>
  <div
    class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-200 cursor-pointer"
    @click="$router.push(`/country/${country.code}`)"
  >
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ country.flag }} {{ country.name }}</h3>
        <span class="text-xs text-gray-500 font-medium">
          {{ country.region }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="px-3 py-1 rounded-full"
          :class="{
            'bg-green-100': country.score >= 70,
            'bg-yellow-100': country.score >= 50 && country.score < 70,
            'bg-red-100': country.score < 50,
          }"
        >
          <span
            class="text-sm font-bold"
            :class="{
              'text-green-800': country.score >= 70,
              'text-yellow-800': country.score >= 50 && country.score < 70,
              'text-red-800': country.score < 50,
            }"
          >
            {{ country.score }}
          </span>
        </div>
        <span
          class="text-lg inline-block"
          :class="{
            'text-green-600 rotate-45': country.trend === 'up',
            'text-red-500 rotate-[135deg]': country.trend === 'down',
            'text-gray-500': country.trend !== 'up' && country.trend !== 'down',
          }"
        >
          ↑
        </span>
      </div>
    </div>
    <p class="text-gray-600 text-sm leading-relaxed">
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
