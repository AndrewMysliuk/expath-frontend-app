<template>
  <div class="min-h-screen bg-white">
    <div class="px-6 py-12">
      <div class="max-w-3xl mx-auto">
        <header class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">About Economic Pulse</h1>
          <p class="text-lg text-gray-600 max-w-xl mx-auto">
            A simple, clean, and live dashboard for monitoring key economic trends across the world.
          </p>
        </header>

        <section class="space-y-6 text-gray-700 text-base leading-relaxed">
          <p>
            <strong>Economic Pulse</strong> is a tool for quickly understanding how different countries live and grow. It collects the most
            important economic signals — like inflation, salaries, taxes, housing prices, and more — and puts them in one clear place.
          </p>

          <p>
            The goal is to keep things simple. No overloaded dashboards or buzzwords — just straight facts, with enough context to make
            sense even if you’re not an economist.
          </p>

          <p>
            All data comes from open sources. It’s cleaned, organized, and turned into a snapshot that shows the real picture of a country’s
            economy, living standards, and direction.
          </p>

          <p>The project is made and updated by a solo developer. It’s growing step by step, and open to feedback or ideas.</p>

          <p>
            If you have suggestions, ideas for collaboration, or you're interested in advertising — feel free to reach out via the
            <NuxtLink to="/contact" class="text-blue-600 underline hover:opacity-80 transition">contact page</NuxtLink>.
          </p>
        </section>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    TheFooter: defineAsyncComponent(() => import("~/components/TheFooter.vue")),
  },

  setup() {
    useSeoHead({
      title: "About – Economic Pulse",
      description: "Learn more about the mission and team behind Economic Pulse.",
    })

    return {}
  },
})
</script>
