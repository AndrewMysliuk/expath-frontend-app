<template>
  <div class="min-h-screen bg-white">
    <header class="px-6 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Explore Countries for Relocation</h1>
      <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        A structured view of visas, taxes, cost of living, and quality of life across the world
      </p>

      <div class="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
        <div class="text-gray-500">Data updated {{ formattedDate }}</div>
      </div>
    </header>

    <section class="px-6 pb-16">
      <div class="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search country..."
          value=""
          class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <CountryCard />
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { CountryCard } from "~/components"

export default defineComponent({
  components: {
    CountryCard,
    TheFooter: defineAsyncComponent(() => import("~/components/TheFooter.vue")),
  },

  setup() {
    useSeoHead()

    const formattedDate = computed(() => {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    })

    return {
      formattedDate,
    }
  },
})
</script>
