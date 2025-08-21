<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-chart-line text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Macroeconomic Indicators</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in MOCK_DATA.macroeconomic"
          :key="index"
          class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.title }}</h3>
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ item.value }}</p>

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
  macroeconomic: [
    {
      title: "Interest Rate (ECB Main Refinancing)",
      value: "2.15%",
      desc: "European Central Bank main refinancing rate applied to Germany",
    },
    {
      title: "Inflation (CPI, Germany)",
      value: "2.0%",
      desc: "Year-on-year consumer price growth",
    },
    {
      title: "Unemployment Rate",
      value: "3.7%",
      desc: "OECD estimate for May 2025",
    },
    {
      title: "Manufacturing PMI",
      value: "49.1",
      desc: "July 2025; below 50 signals contraction",
    },
    {
      title: "10‑Year Bond Yield",
      value: "2.72%",
      desc: "Germany 10-year government bund yield",
    },
    {
      title: "GDP Growth (2025 forecast)",
      value: "0.4%",
      desc: "Expected real GDP growth for 2025",
    },
    {
      title: "GDP per Capita (Nominal)",
      value: "$55,900",
      desc: "Annual income per person (US$)",
    },
    {
      title: "Nominal GDP",
      value: "$4.66T",
      desc: "Total economic output in USD",
    },
    {
      title: "GDP by PPP",
      value: "$6.16T",
      desc: "GDP adjusted by purchasing power parity",
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
