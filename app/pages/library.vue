<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-6 text-gray-900">Economic Glossary</h1>

    <!-- Anchor list -->
    <ul class="mb-10 space-y-2 list-disc list-inside text-orange-600">
      <li><NuxtLink to="#policy-rate" class="hover:underline">Policy Interest Rate</NuxtLink></li>
      <li><NuxtLink to="#cpi" class="hover:underline">Consumer Price Index (CPI)</NuxtLink></li>
      <li><NuxtLink to="#unemployment" class="hover:underline">Unemployment Rate</NuxtLink></li>
      <li><NuxtLink to="#pmi" class="hover:underline">Purchasing Managers' Index (PMI)</NuxtLink></li>
      <li><NuxtLink to="#equity-index" class="hover:underline">Equity Index</NuxtLink></li>
      <li><NuxtLink to="#bond-yield" class="hover:underline">10-Year Bond Yield</NuxtLink></li>
      <li><NuxtLink to="#fx-rate" class="hover:underline">FX Rate (Currency Exchange)</NuxtLink></li>
    </ul>

    <!-- Term: Policy Rate -->
    <section id="policy-rate" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Policy Interest Rate</h2>
      <p class="text-gray-700 mb-1">
        The base interest rate set by a central bank, influencing credit, inflation, and overall economic growth.
      </p>
      <p class="text-sm text-gray-500">Higher rates usually slow down borrowing and spending; lower rates stimulate growth.</p>
    </section>

    <!-- Term: CPI -->
    <section id="cpi" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Consumer Price Index (CPI) / Inflation</h2>
      <p class="text-gray-700 mb-1">
        CPI tracks the average change in prices paid by consumers for goods and services. It’s the most common way to measure inflation.
      </p>
      <p class="text-sm text-gray-500">High inflation reduces purchasing power; stable inflation supports healthy growth.</p>
    </section>

    <!-- Term: Unemployment -->
    <section id="unemployment" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Unemployment Rate</h2>
      <p class="text-gray-700 mb-1">Percentage of the labor force that is jobless but actively seeking employment.</p>
      <p class="text-sm text-gray-500">High unemployment signals economic weakness; low rate implies healthy job market.</p>
    </section>

    <!-- Term: PMI -->
    <section id="pmi" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Purchasing Managers' Index (PMI)</h2>
      <p class="text-gray-700 mb-1">A survey-based indicator of business conditions in the manufacturing and service sectors.</p>
      <p class="text-sm text-gray-500">PMI > 50 shows expansion; < 50 shows contraction.</p>
    </section>

    <!-- Term: Equity Index -->
    <section id="equity-index" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">Equity Index</h2>
      <p class="text-gray-700 mb-1">A composite measure of the performance of selected stock market companies.</p>
      <p class="text-sm text-gray-500">Reflects investor sentiment and future earnings expectations.</p>
    </section>

    <!-- Term: Bond Yield -->
    <section id="bond-yield" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">10-Year Bond Yield</h2>
      <p class="text-gray-700 mb-1">The return investors demand to hold a country's 10-year government debt.</p>
      <p class="text-sm text-gray-500">Key indicator of long-term inflation, risk, and market stability expectations.</p>
    </section>

    <!-- Term: FX Rate -->
    <section id="fx-rate" class="mb-10 scroll-mt-20">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">FX Rate (Currency Exchange)</h2>
      <p class="text-gray-700 mb-1">The value of a country's currency relative to another, typically the US dollar.</p>
      <p class="text-sm text-gray-500">Impacts trade competitiveness and reflects global confidence in the economy.</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
