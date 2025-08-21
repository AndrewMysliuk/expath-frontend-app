<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-coins text-blue-900 text-lg"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Currency Exchange Rates</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in MOCK_DATA.currency_exchange"
          :key="index"
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.pair }}</h3>
          </div>
          <p class="text-2xl font-bold text-gray-900 mb-1">
            1 {{ item.pair.split("/")[0] }} = {{ item.value }} {{ item.pair.split("/")[1] }}
          </p>
          <p class="text-xs text-gray-500">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const MOCK_DATA = {
  currency_exchange: [
    {
      pair: "EUR/USD",
      value: "1.165",
      desc: "Euro to US Dollar (ECB reference rate)",
    },
    {
      pair: "EUR/GBP",
      value: "0.865",
      desc: "Euro to British Pound (ECB reference rate)",
    },
    {
      pair: "EUR/CHF",
      value: "0.950",
      desc: "Euro to Swiss Franc (approximate mid-market)",
    },
    {
      pair: "EUR/PLN",
      value: "4.45",
      desc: "Euro to Polish Zloty (approximate mid-market)",
    },
    {
      pair: "EUR/JPY",
      value: "159.0",
      desc: "Euro to Japanese Yen (approximate mid-market)",
    },
    {
      pair: "EUR/CNY",
      value: "7.80",
      desc: "Euro to Chinese Yuan (approximate mid-market)",
    },
  ],
}

export default defineComponent({
  setup() {
    return {
      MOCK_DATA,
    }
  },
})
</script>
