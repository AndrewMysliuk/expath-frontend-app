<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-building text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Infrastructure</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in Object.values(MOCK_DATA.infrastructure)"
          :key="index"
          class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {{ item.title }}
            </h3>
          </div>

          <p class="text-2xl font-bold text-gray-900 mb-1">
            {{ item.value }}
          </p>

          <!-- Tooltip -->
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
  infrastructure: {
    internet: {
      title: "Internet (Speed & Cost)",
      value: "100–250 Mb / €35",
      desc: "Fast and widely available fixed broadband. 5G in major cities. Average cost around €35/month.",
    },
    electricity: {
      title: "Electricity Reliability",
      value: "Very High",
      desc: "Stable and uninterrupted power supply, outages are rare.",
    },
    healthcare: {
      title: "Access to Healthcare",
      value: "Universal",
      desc: "Germany offers a universal healthcare system. Private insurance available. Quality is high.",
    },
    banking_access: {
      title: "Banking Access",
      value: "High",
      desc: "Widespread ATM and branch access. Digital banks also available. Some bureaucracy for foreigners.",
    },
  },
}

export default defineComponent({
  setup() {
    return { MOCK_DATA }
  },
})
</script>
