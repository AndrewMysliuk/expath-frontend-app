<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-house text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Real Estate</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in Object.values(MOCK_DATA.real_estate)"
          :key="index"
          class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {{ item.title }}
            </h3>
          </div>

          <div class="flex items-baseline space-x-1 mb-1">
            <span class="text-3xl font-bold text-gray-900"> {{ formattedValue(item.value) }} {{ item.unit }} </span>
          </div>

          <div
            class="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 max-w-xs -top-2 left-1/2 -translate-x-1/2 -translate-y-full shadow-lg whitespace-normal text-left"
          >
            {{ item.desc }}
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const MOCK_DATA = {
  real_estate: {
    capital_price: {
      title: "Average Price (Capital)",
      desc: "Housing price per square meter in the capital city (e.g. Berlin)",
      value: 5800,
      unit: "$/m²",
    },
    regional_price: {
      title: "Average Price (Regional)",
      desc: "Average housing cost per m² outside major cities",
      value: 3100,
      unit: "$/m²",
    },
    price_change_yoy: {
      title: "Price Change YoY",
      desc: "Annual change in housing prices. Positive = growth, negative = decline",
      value: -1.5,
      unit: "%",
    },
    rental_yield: {
      title: "Rental Yield",
      desc: "Gross return on residential property before taxes and expenses",
      value: 3.6,
      unit: "%",
    },
  },
}

export default defineComponent({
  setup() {
    const formattedValue = (val: number): string => {
      if (Math.abs(val) >= 1000) {
        return `$${val.toLocaleString()}`
      } else if (typeof val === "number") {
        return `${val % 1 === 0 ? val : val.toFixed(1)}`
      }
      return String(val)
    }

    return {
      MOCK_DATA,
      formattedValue,
    }
  },
})
</script>
