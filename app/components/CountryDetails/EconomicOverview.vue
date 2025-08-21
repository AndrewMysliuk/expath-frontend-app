<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-6">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-globe text-blue-900 text-lg" />
        </div>

        <h2 class="text-2xl font-bold text-gray-900">Economic Overview</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <p class="text-gray-600 leading-relaxed text-lg mb-4" v-for="(value, index) in MOCK_DATA.overview.summary" :key="index">
            {{ value }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(item, index) in MOCK_DATA.overview.highlights"
            :key="index"
            class="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200"
          >
            <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">Economic Signal</div>
            <div class="text-xl font-semibold text-blue-900 mb-1 leading-snug">
              {{ item.title }}
            </div>
            <div class="text-sm text-blue-900 leading-relaxed">
              {{ item.subtitle }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 mt-8">
        <div>
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Likely Causes:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li v-for="(value, index) in MOCK_DATA.overview.causes" :key="index">{{ value }}</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Implications:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Investors:</strong> {{ MOCK_DATA.overview.implications.investors }}</li>
            <li><strong>Businesses:</strong> {{ MOCK_DATA.overview.implications.businesses }}</li>
            <li><strong>Relocation:</strong> {{ MOCK_DATA.overview.implications.relocation }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const MOCK_DATA = {
  overview: {
    summary: [
      "Prices are still rising faster than they should. The cost of living is going up, and loans remain expensive because the central bank is trying to control inflation.",
      "Factories and businesses are slowing down. Companies are making and selling less than before, and investors are feeling cautious about the future.",
      "Unemployment is not very high, but job growth has stopped. Especially in industrial areas, it's getting harder to find new work.",
      "Housing is still expensive, but prices are no longer rising quickly. Many experts think the real estate market could cool down or even drop a bit.",
    ],
    highlights: [
      {
        title: "Prices are still high",
        subtitle: "The cost of living remains elevated, and loans are expensive",
      },
      {
        title: "Housing stays expensive",
        subtitle: "Property prices are high, and affordability is falling",
      },
    ],
    causes: [
      "Energy costs are still high after the shocks of 2022, making it harder for factories to stay competitive.",
      "The European Central Bank raised interest rates to fight inflation, which made borrowing more expensive.",
      "Exports to other countries have slowed down, especially to China and the U.S.",
      "Consumers are spending less because prices are high and they’re unsure about the future.",
    ],
    implications: {
      investors: "This is not the best time for short-term profits, but stable companies may still offer long-term value.",
      businesses: "Small and mid-sized businesses may struggle with high costs and slow demand. Export-oriented firms are hit hardest.",
      relocation: "Germany remains a solid choice for relocation, but expect higher living costs and slower job markets in some regions.",
    },
  },
}

export default defineComponent({
  setup() {
    return {
      MOCK_DATA,
    }
  },
})
</script>
