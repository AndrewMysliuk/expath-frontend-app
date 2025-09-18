<template>
  <div
    class="bg-white border rounded-xl p-6 transition-all duration-200 cursor-pointer hover:shadow-lg"
    @click="$router.push(`/country/${country.slug}`)"
    :class="{
      'border-gray-200 hover:border-red-300': country.score < 20,
      'border-gray-200 hover:border-orange-300': country.score >= 20 && country.score < 40,
      'border-gray-200 hover:border-yellow-300': country.score >= 40 && country.score < 60,
      'border-gray-200 hover:border-green-300': country.score >= 60 && country.score < 80,
      'border-gray-200 hover:border-emerald-300': country.score >= 80,
    }"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <span :class="['country-flag', country.code]" />
          {{ country.name }}
        </h3>
        <span class="text-xs text-gray-500 font-medium">
          {{ country.region }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="px-3 py-1 rounded-full"
          :class="{
            'bg-red-100': country.score < 20,
            'bg-orange-100': country.score >= 20 && country.score < 40,
            'bg-yellow-100': country.score >= 40 && country.score < 60,
            'bg-green-100': country.score >= 60 && country.score < 80,
            'bg-emerald-100': country.score >= 80,
          }"
        >
          <span
            class="text-sm font-bold"
            :class="{
              'text-red-700': country.score < 20,
              'text-orange-700': country.score >= 20 && country.score < 40,
              'text-yellow-700': country.score >= 40 && country.score < 60,
              'text-green-700': country.score >= 60 && country.score < 80,
              'text-emerald-700': country.score >= 80,
            }"
          >
            {{ country.score }}
          </span>
        </div>

        <span
          class="text-lg inline-block"
          :class="{
            'text-emerald-600 rotate-45': country.trend === 'up',
            'text-red-500 rotate-[135deg]': country.trend === 'down',
            'text-gray-500': !['up', 'down'].includes(country.trend),
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

export default defineComponent({
  setup() {
    const country = {
      code: "de",
      slug: "germany",
      name: "Germany",
      region: "Europe",
      trend: "up",
      score: 85,
      summary: "Inflation is stable, but business activity remains weak.",
    }

    return {
      country,
    }
  },
})
</script>
