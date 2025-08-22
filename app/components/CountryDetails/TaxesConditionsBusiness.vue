<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <!-- Header -->
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-scale-balanced text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Taxes & Conditions for Business</h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div
          v-for="(item, index) in taxItems"
          :key="index"
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ item.title }}</h3>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold text-gray-900">
              {{
                item.range
                  ? `${item.from}${item.unit} - ${item.to}${item.unit}`
                  : `${(item as { value: number | string; unit?: string }).value}${item.unit ?? ""}`
              }}
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ item.desc }}</p>
        </div>
      </div>

      <!-- Tax Benefits Block -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
        <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
          {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.title }}
        </div>
        <div class="text-xl font-semibold text-blue-900 mb-1 leading-snug">
          {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.value }}
        </div>
        <div class="text-sm text-blue-900 leading-relaxed">
          {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.desc }}
        </div>
        <div class="text-sm text-blue-800 font-medium bg-blue-100 border-l-4 border-blue-400 p-4 mt-4 rounded">
          <strong>Note:</strong> {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.note }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

const MOCK_DATA = {
  taxes_and_conditions_for_business: {
    personal_income_tax: {
      title: "Personal Income Tax",
      desc: "Higher income = higher tax. Top rate applies from ~€278K/year",
      from: 14,
      to: 45,
      unit: "%",
    },
    corporate_tax: {
      title: "Corporate Tax (Total)",
      desc: "Includes corporate tax, trade tax, and solidarity surcharge",
      value: 30,
      unit: "%",
    },
    vat: {
      title: "VAT (Value-Added Tax)",
      desc: "Lower rate for essentials (food, books); standard for most goods",
      from: 7,
      to: 19,
      unit: "%",
    },
    tax_benefits: {
      title: "Tax Benefits",
      value: "Limited",
      desc: "Germany offers partial tax relief for freelancers: exemption from trade tax (Gewerbesteuer), but no broader incentives.",
      note: "Applies mainly to those officially registered as 'Freiberufler'.",
    },
    business_setup: {
      title: "Business Setup Difficulty",
      desc: "Not very hard, but paperwork and local offices are involved",
      value: "Moderate",
    },
  },
}

export default defineComponent({
  setup() {
    const taxItems = computed(() => [
      {
        ...MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax,
        range: true,
      },
      {
        ...MOCK_DATA.taxes_and_conditions_for_business.corporate_tax,
        range: false,
      },
      {
        ...MOCK_DATA.taxes_and_conditions_for_business.vat,
        range: true,
      },
      {
        ...MOCK_DATA.taxes_and_conditions_for_business.business_setup,
        range: false,
      },
    ])

    return {
      MOCK_DATA,
      taxItems,
    }
  },
})
</script>
