<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-user text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Society & Politics</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in Object.values(MOCK_DATA.society_and_politics)"
          :key="index"
          class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {{ item.title }}
            </h3>
          </div>

          <p class="text-3xl font-bold mb-1" :class="getStatusClasses(item.title, item.value).text">
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
  society_and_politics: {
    population: {
      title: "Population",
      value: "84 million",
      desc: "Total number of residents in Germany",
    },
    population_growth: {
      title: "Population Growth",
      value: "0.2% YoY",
      desc: "Annual change in total population",
    },
    birth_rate: {
      title: "Birth Rate",
      value: "1.4 per woman",
      desc: "Average number of children per woman",
    },
    corruption_index: {
      title: "Corruption Perception Index",
      value: "79 / 100",
      desc: "Transparency International score (higher = cleaner)",
    },
    political_stability: {
      title: "Political Stability & Democracy",
      value: "High",
      desc: "Stable government, strong democratic institutions, low risk of unrest",
    },
    urbanization: {
      title: "Urbanization Level",
      value: "78%",
      desc: "Percentage of population living in cities",
    },
  },
}

export default defineComponent({
  setup() {
    const getStatus = (title: string, value: string): string => {
      if (title === "Population Growth") {
        const num = parseFloat(value)
        if (num < 0.1) return "CRITICAT_RISK"
        if (num < 0.3) return "MODERATE_TENSION"
        return "STRONG_GROWTH"
      }

      if (title === "Birth Rate") {
        const num = parseFloat(value)
        if (num < 1.3) return "CRITICAT_RISK"
        if (num < 1.5) return "HIGH_TENSION"
        return "STABLE"
      }

      if (title === "Corruption Perception Index") {
        const num = parseInt(value)
        if (num < 40) return "CRITICAT_RISK"
        if (num < 60) return "MODERATE_TENSION"
        return "STABLE"
      }

      if (title === "Political Stability & Democracy") {
        if (value === "High") return "STRONG_GROWTH"
        return "MODERATE_TENSION"
      }

      if (title === "Urbanization Level") {
        const num = parseInt(value)
        if (num < 60) return "MODERATE_TENSION"
        return "STABLE"
      }

      return "STABLE"
    }

    const statusColorMap = {
      CRITICAT_RISK: { text: "text-red-700" },
      HIGH_TENSION: { text: "text-orange-700" },
      MODERATE_TENSION: { text: "text-yellow-700" },
      STABLE: { text: "text-green-700" },
      STRONG_GROWTH: { text: "text-emerald-700" },
    }

    const getStatusClasses = (title: string, value: string) => {
      const status = getStatus(title, value)
      return statusColorMap[status as keyof typeof statusColorMap]
    }

    return {
      MOCK_DATA,
      getStatusClasses,
    }
  },
})
</script>
