<template>
  <div class="min-h-screen bg-white">
    <div class="px-6 py-12">
      <div class="max-w-3xl mx-auto">
        <header class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">About Expath</h1>
          <p class="text-lg text-gray-600 max-w-xl mx-auto">A clear and structured way to explore relocation options worldwide.</p>
        </header>

        <section class="space-y-6 text-gray-700 text-base leading-relaxed">
          <p>
            <strong>Expath</strong> is a platform that helps people compare countries side by side. It brings together the essentials of
            relocation — visas, taxes, cost of living, finance, and quality of life — all in one consistent format.
          </p>

          <p>
            The idea is to remove the noise. No endless forums or scattered guides — just structured information, updated and easy to read,
            with clear indicators for what’s simple, what’s tricky, and what’s expensive.
          </p>

          <p>
            Data is pulled from public sources, organized into categories, and turned into a snapshot of each country: how you can move
            there, how much you’ll pay, and what kind of life to expect.
          </p>

          <p>The project is built and maintained by a solo developer. It’s evolving step by step and open to feedback and new ideas.</p>

          <p>
            If you’d like to suggest improvements or collaborate, feel free to reach out via the
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
