<template>
  <div class="bg-orange-100 min-h-screen px-4 py-8">
    <!-- Country Header Section -->
    <div class="flex flex-col md:flex-row justify-center items-center w-full mb-6 gap-4">
      <!-- Left side: Text -->
      <div class="text-center md:text-left">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ getCountriesData?.country }}</h1>
        <p class="text-sm text-gray-700">Economic Pulse Score: <span class="font-semibold">62/100</span></p>
      </div>

      <!-- Right side: Flag inside mask -->
      <div class="relative w-96 h-64 overflow-hidden flex-shrink-0">
        <div
          class="absolute inset-0"
          :style="{
            maskImage: `url('/masks/country_${getCountriesData?.country_iso}.svg')`,
            maskRepeat: getCountriesData?.mask_repeat,
            maskSize: getCountriesData?.mask_size,
            maskPosition: getCountriesData?.mask_position,

            WebkitMaskImage: `url('/masks/country_${getCountriesData?.country_iso}.svg')`,
            WebkitMaskRepeat: getCountriesData?.webkit_mask_repeat,
            WebkitMaskSize: getCountriesData?.webkit_mask_size,
            WebkitMaskPosition: getCountriesData?.webkit_mask_position,
          }"
        >
          <div
            class="w-full h-full"
            :style="{
              backgroundImage: `url('/flags/flag_${getCountriesData?.country_iso}.svg')`,
              backgroundSize: getCountriesData?.background_size,
              backgroundPosition: getCountriesData?.background_position,
              backgroundRepeat: getCountriesData?.background_repeat,
            }"
          />
        </div>
      </div>
    </div>

    <!-- AI Summary -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Economic Overview</h2>
      <p class="text-sm text-gray-800 mb-2">
        Germany continues to experience economic slowdown. Inflation has stabilized at 3.1%, but remains above the ECB's target (2%), so the
        interest rate stays high at 4.5%.
      </p>
      <p class="text-sm text-gray-800 mb-2">
        Business activity is weakening — PMI fell below 50, indicating contraction in manufacturing and services. Stock market dipped,
        reflecting lower growth expectations.
      </p>
      <p class="text-sm text-gray-800 mb-2">
        Unemployment remains moderate, but job growth has stalled, especially in industry. Euro is stable, showing no major capital flight.
      </p>
      <p class="text-sm text-gray-800 mb-2">
        Real estate remains expensive, but price growth is slowing. With weak GDP and high rates, the market may face a correction.
      </p>
      <h3 class="text-lg font-semibold mt-4 mb-2">Likely Causes:</h3>
      <ul class="list-disc list-inside text-sm text-gray-800">
        <li>Weak external demand (especially from China)</li>
        <li>High energy and import costs</li>
        <li>Structural dependence on pressured manufacturing sector</li>
        <li>Strict ECB policy suppressing investments</li>
      </ul>
      <h3 class="text-lg font-semibold mt-4 mb-2">Implications:</h3>
      <ul class="list-disc list-inside text-sm text-gray-800">
        <li><strong>Investors:</strong> Low yield environment, cautious bond/real estate growth</li>
        <li><strong>Businesses:</strong> High costs, low demand — better to focus on exports or B2B</li>
        <li><strong>Relocation:</strong> Great infrastructure, but expensive. No growth boom expected</li>
      </ul>
      <div class="mt-4">
        <p class="text-sm text-gray-800">
          <strong>12-Month Outlook:</strong> Stability: High / Growth: Low / Investment Attractiveness: Neutral / Risks: Stagnation
        </p>
      </div>
    </div>

    <!-- Metrics by category -->
    <div class="space-y-8">
      <!-- Macroeconomics -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Macroeconomics</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Interest Rate:</strong> 4.5%</li>
          <li><strong>Inflation (CPI):</strong> 3.1%</li>
          <li><strong>Unemployment Rate:</strong> 5.7%</li>
          <li><strong>PMI:</strong> 47.2</li>
          <li><strong>Equity Index:</strong> DAX: -1.8% (YoY)</li>
          <li><strong>FX Rate (EUR/USD):</strong> 1.08</li>
          <li><strong>10Y Bond Yield:</strong> 2.3%</li>
          <li><strong>GDP Growth Rate:</strong> 0.3%</li>
          <li><strong>GDP per Capita:</strong> $50,800</li>
          <li><strong>Nominal GDP:</strong> $4.5T</li>
          <li><strong>GDP by PPP:</strong> $5.3T</li>
        </ul>
      </div>

      <!-- Real Estate -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Real Estate</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Avg. Housing Price (Berlin):</strong> $6,200/m²</li>
          <li><strong>Avg. Housing Price (Regions):</strong> $3,800/m²</li>
          <li><strong>Commercial Property Price:</strong> $4,500/m²</li>
          <li><strong>YoY Price Change:</strong> +2.1%</li>
          <li><strong>Rental Yield:</strong> 3.5%</li>
        </ul>
      </div>

      <!-- Income & Living -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Income & Living</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Minimum Wage (Net):</strong> €1,330/month</li>
          <li><strong>Average Wage (Net):</strong> €2,700/month</li>
          <li><strong>Living Wage:</strong> €1,500/month</li>
        </ul>
      </div>

      <!-- Taxes & Business -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Taxes & Business</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Personal Income Tax:</strong> up to 45%</li>
          <li><strong>Corporate Tax:</strong> 29.9%</li>
          <li><strong>VAT:</strong> 19%</li>
          <li><strong>Freelancer/IT Incentives:</strong> Limited (some deductions)</li>
          <li><strong>Ease of Starting Business:</strong> Moderate (some bureaucracy)</li>
        </ul>
      </div>

      <!-- Economy Structure -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Economy Structure</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Top 3 Sectors (GDP Share):</strong> Industry, Services, Export</li>
          <li><strong>Top Companies:</strong> Volkswagen, Siemens, BASF</li>
        </ul>
      </div>

      <!-- Society & Politics -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Society & Politics</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Population:</strong> 83M</li>
          <li><strong>Population Growth:</strong> +0.1%</li>
          <li><strong>Birth Rate:</strong> 1.5 per woman</li>
          <li><strong>Corruption Index:</strong> 79/100 (low corruption)</li>
          <li><strong>Political Stability:</strong> High (Democracy)</li>
          <li><strong>Urbanization:</strong> 78%</li>
        </ul>
      </div>

      <!-- Migration & Accessibility -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Migration & Accessibility</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Freelance/Investor Visa:</strong> Available</li>
          <li><strong>Visa-Free (EU/US/UA):</strong> Yes</li>
          <li><strong>Bank/Company Setup:</strong> Easy for EU, more complex for non-EU</li>
        </ul>
      </div>

      <!-- Infrastructure -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Infrastructure</h2>
        <ul class="text-sm text-gray-800 space-y-1">
          <li><strong>Internet Speed/Cost:</strong> 100 Mbps avg / €30/month</li>
          <li><strong>Electricity Reliability:</strong> High</li>
          <li><strong>Healthcare Access:</strong> Universal, public and private</li>
          <li><strong>Bank Access:</strong> High (many fintechs + traditional banks)</li>
          <li><strong>Language Barrier:</strong> Medium (English widely spoken in cities)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useIncomingDataStore } from "~/store"

export default defineComponent({
  setup() {
    const incomingDataStore = useIncomingDataStore()
    const route = useRoute()
    const iso = route.params.iso

    const getCountriesData = computed(() => incomingDataStore.getCountriesData?.find((item) => item.country_iso === iso))

    return {
      getCountriesData,
    }
  },
})
</script>
