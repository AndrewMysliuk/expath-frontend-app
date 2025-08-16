<template>
  <div class="flex flex-col items-center w-full min-h-screen bg-orange-100 px-4 py-8">
    <!-- Page header -->
    <h1 class="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-4">Economic Pulse</h1>
    <p class="text-sm sm:text-base text-gray-600 text-center mb-2">Live snapshot of economic conditions across countries.</p>

    <router-link to="/library" class="mt-2 mb-8 text-sm text-orange-600 hover:underline transition">
      View economic terms glossary
    </router-link>

    <!-- Global pulse summary -->
    <PulseIndicator class="mb-10" />

    <!-- Search -->
    <div class="w-full max-w-3xl mb-6">
      <input
        type="text"
        placeholder="Search country..."
        v-model="search"
        class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
      />
    </div>

    <!-- Country cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      <CountryCard v-for="country in countries" :key="country.code" :country="country" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { PulseIndicator, CountryCard } from "~/components"
import { useIndexHead } from "~/composables/useIndexHead"

export default defineComponent({
  components: {
    PulseIndicator,
    CountryCard,
  },

  setup() {
    useIndexHead()

    const search = ref<string>("")
    const countries = [
      {
        code: "us",
        name: "United States",
        flag: "🇺🇸",
        score: 78,
        summary: "The economy is resilient, with steady consumer demand.",
      },
      {
        code: "de",
        name: "Germany",
        flag: "🇩🇪",
        score: 62,
        summary: "Inflation is stable, but business activity remains weak.",
      },
      {
        code: "jp",
        name: "Japan",
        flag: "🇯🇵",
        score: 54,
        summary: "Low inflation, but export weakness is dragging down growth.",
      },
      {
        code: "br",
        name: "Brazil",
        flag: "🇧🇷",
        score: 44,
        summary: "Currency pressure and fiscal risks remain elevated.",
      },
      {
        code: "cn",
        name: "China",
        flag: "🇨🇳",
        score: 59,
        summary: "Recovery remains uneven, with weakness in the real estate sector.",
      },
      {
        code: "gb",
        name: "United Kingdom",
        flag: "🇬🇧",
        score: 58,
        summary: "High inflation persists, and consumer confidence is low.",
      },
      {
        code: "fr",
        name: "France",
        flag: "🇫🇷",
        score: 63,
        summary: "Moderate growth, but structural issues in labor market remain.",
      },
      {
        code: "in",
        name: "India",
        flag: "🇮🇳",
        score: 69,
        summary: "Strong domestic demand and services growth support the economy.",
      },
    ]

    return {
      search,
      countries,
    }
  },
})
</script>
