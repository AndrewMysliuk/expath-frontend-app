<template>
  <div class="min-h-screen bg-white">
    <header class="px-6 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Global Economic Overview</h1>
      <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        A live snapshot of key economic indicators across countries
      </p>

      <div class="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
        <router-link to="/library" class="text-blue-600 hover:underline transition"> View Economic Glossary </router-link>
        <span class="text-gray-400">|</span>
        <div class="text-gray-500">Updated {{ formattedDate }}</div>
      </div>
    </header>

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
        code: "de",
        slug: "germany",
        name: "Germany",
        region: "Europe",
        trend: "up",
        score: 85,
        summary: "Inflation is stable, but business activity remains weak.",
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
