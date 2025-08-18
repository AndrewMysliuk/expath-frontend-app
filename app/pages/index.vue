<template>
  <div class="min-h-screen bg-white">
    <header class="px-6 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white text-center">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Global Economic Overview – Key Indicators by Country</h1>
      <p class="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Live snapshot of macroeconomic indicators across countries
      </p>
      <router-link to="/library" class="inline-block mt-6 text-sm text-orange-600 hover:underline transition">
        View economic terms glossary
      </router-link>
      <div class="mt-8 text-sm text-gray-500">Data as of {{ formattedDate }}</div>
    </header>

    <section class="px-6 py-12 bg-gray-50 text-center">
      <p class="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
        This site provides a quick, readable overview of key economic conditions across multiple countries, helping you understand global
        economic trends at a glance.
      </p>
    </section>

    <PulseIndicator class="mx-auto" />

    <section class="px-6 pb-16">
      <div class="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search country..."
          v-model="search"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <CountryCard v-for="country in filteredCountries" :key="country.slug" :country="country" />
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { PulseIndicator, CountryCard, TheFooter } from "~/components"
import { useIndexHead } from "~/composables/useIndexHead"

export default defineComponent({
  components: {
    PulseIndicator,
    CountryCard,
    TheFooter,
  },

  setup() {
    useIndexHead()

    const search = ref<string>("")
    const countries = [
      {
        code: "us",
        slug: "united-states",
        name: "United States",
        region: "North America",
        flag: "🇺🇸",
        trend: "up",
        score: 78,
        summary: "The economy is resilient, with steady consumer demand.",
      },
      {
        code: "de",
        slug: "germany",
        name: "Germany",
        region: "Europe",
        flag: "🇩🇪",
        trend: "down",
        score: 62,
        summary: "Inflation is stable, but business activity remains weak.",
      },
      {
        code: "jp",
        slug: "japan",
        name: "Japan",
        region: "Asia",
        flag: "🇯🇵",
        trend: "up",
        score: 54,
        summary: "Low inflation, but export weakness is dragging down growth.",
      },
      {
        code: "br",
        slug: "brazil",
        name: "Brazil",
        region: "South America",
        flag: "🇧🇷",
        trend: "",
        score: 44,
        summary: "Currency pressure and fiscal risks remain elevated.",
      },
      {
        code: "cn",
        slug: "china",
        name: "China",
        region: "Asia",
        flag: "🇨🇳",
        trend: "down",
        score: 59,
        summary: "Recovery remains uneven, with weakness in the real estate sector.",
      },
      {
        code: "gb",
        slug: "united-kingdom",
        name: "United Kingdom",
        region: "Europe",
        flag: "🇬🇧",
        trend: "up",
        score: 58,
        summary: "High inflation persists, and consumer confidence is low.",
      },
      {
        code: "fr",
        slug: "france",
        name: "France",
        region: "Europe",
        flag: "🇫🇷",
        trend: "",
        score: 63,
        summary: "Moderate growth, but structural issues in labor market remain.",
      },
      {
        code: "in",
        slug: "india",
        name: "India",
        region: "Asia",
        trend: "up",
        flag: "🇮🇳",
        score: 69,
        summary: "Strong domestic demand and services growth support the economy.",
      },
    ]

    const filteredCountries = computed(() => {
      if (!search.value) return countries
      return countries.filter((c) => c.name.toLowerCase().includes(search.value.toLowerCase()))
    })

    const formattedDate = computed(() => {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    })

    return {
      search,
      countries,
      filteredCountries,
      formattedDate,
    }
  },
})
</script>
