<template>
  <div class="min-h-screen bg-white">
    <div class="px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <header class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Economic Glossary</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Key macroeconomic terms explained in a clear and simple way.</p>
        </header>

        <nav class="mb-12 text-sm text-orange-600">
          <ul class="flex flex-wrap justify-center gap-4">
            <li><NuxtLink to="#policy-rate" class="hover:underline">Policy Interest Rate</NuxtLink></li>
            <li><NuxtLink to="#cpi" class="hover:underline">CPI</NuxtLink></li>
            <li><NuxtLink to="#unemployment" class="hover:underline">Unemployment</NuxtLink></li>
            <li><NuxtLink to="#pmi" class="hover:underline">PMI</NuxtLink></li>
            <li><NuxtLink to="#equity-index" class="hover:underline">Equity Index</NuxtLink></li>
            <li><NuxtLink to="#bond-yield" class="hover:underline">10Y Bond Yield</NuxtLink></li>
            <li><NuxtLink to="#fx-rate" class="hover:underline">FX Rate</NuxtLink></li>
          </ul>
        </nav>

        <div class="space-y-12">
          <section id="policy-rate" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Policy Interest Rate</h2>
            <p class="text-gray-700 mb-1">
              The base interest rate set by a central bank, influencing credit, inflation, and overall economic growth.
            </p>
            <p class="text-sm text-gray-500">Higher rates usually slow down borrowing and spending; lower rates stimulate growth.</p>
          </section>

          <section id="cpi" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Consumer Price Index (CPI) / Inflation</h2>
            <p class="text-gray-700 mb-1">
              CPI tracks the average change in prices paid by consumers for goods and services. It’s the most common way to measure
              inflation.
            </p>
            <p class="text-sm text-gray-500">High inflation reduces purchasing power; stable inflation supports healthy growth.</p>
          </section>

          <section id="unemployment" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Unemployment Rate</h2>
            <p class="text-gray-700 mb-1">Percentage of the labor force that is jobless but actively seeking employment.</p>
            <p class="text-sm text-gray-500">High unemployment signals economic weakness; low rate implies healthy job market.</p>
          </section>

          <section id="pmi" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Purchasing Managers' Index (PMI)</h2>
            <p class="text-gray-700 mb-1">A survey-based indicator of business conditions in the manufacturing and service sectors.</p>
            <p class="text-sm text-gray-500">PMI &gt; 50 shows expansion; &lt; 50 shows contraction.</p>
          </section>

          <section id="equity-index" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Equity Index</h2>
            <p class="text-gray-700 mb-1">A composite measure of the performance of selected stock market companies.</p>
            <p class="text-sm text-gray-500">Reflects investor sentiment and future earnings expectations.</p>
          </section>

          <section id="bond-yield" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">10-Year Bond Yield</h2>
            <p class="text-gray-700 mb-1">The return investors demand to hold a country's 10-year government debt.</p>
            <p class="text-sm text-gray-500">Key indicator of long-term inflation, risk, and market stability expectations.</p>
          </section>

          <section id="fx-rate" class="scroll-mt-20">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">FX Rate (Currency Exchange)</h2>
            <p class="text-gray-700 mb-1">The value of a country's currency relative to another, typically the US dollar.</p>
            <p class="text-sm text-gray-500">Impacts trade competitiveness and reflects global confidence in the economy.</p>
          </section>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { TheFooter } from "~/components"

export default defineComponent({
  components: {
    TheFooter,
  },
})
</script>
