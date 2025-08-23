<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-sack-dollar text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Income & Standard of Living</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(item, index) in MOCK_DATA.income_and_standard_of_living"
          :key="index"
          class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.title }}</h3>
          </div>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold text-gray-900">
              <template v-if="item.from && item.to"> {{ item.unit }}{{ item.from }} – {{ item.unit }}{{ item.to }} </template>
              <template v-else> {{ item.unit }}{{ item.to }} </template>
            </span>
            <span v-if="item.period" class="text-sm text-gray-500">/ {{ item.period }}</span>
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
  income_and_standard_of_living: [
    {
      title: "Average Net Salary",
      from: "2,800",
      to: "3,300",
      unit: "€",
      period: "month",
      desc: "Estimated take‑home pay after deductions",
    },
    {
      title: "Living Wage (estimated)",
      from: "1,600",
      to: "1,800",
      unit: "€",
      period: "month",
      desc: "Approximate monthly expenses for basic living",
    },
  ],
}

export default defineComponent({
  setup() {
    return {
      MOCK_DATA,
    }
  },
})
</script>
