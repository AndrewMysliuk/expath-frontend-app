<template>
  <div class="min-h-screen bg-white">
    <CountryDetailsHeader />

    <CountryDetailsSchema />

    <main class="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <EconomicOverview />

      <IncomeStandardLiving />

      <TaxesConditionsBusiness />

      <RealEstate />

      <MigrationOpenness />

      <Infrastructure />

      <MacroeconomicIndicators />

      <CurrencyExchangeRates />

      <EconomicStructure />

      <SocietyPolitics />
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useIncomingDataStore } from "~/store"

export default defineComponent({
  components: {
    CountryDetailsHeader: defineAsyncComponent(() => import("~/components/CountryDetails/CountryDetailsHeader.vue")),
    CountryDetailsSchema: defineAsyncComponent(() => import("~/components/CountryDetails/CountryDetailsSchema.vue")),
    EconomicOverview: defineAsyncComponent(() => import("~/components/CountryDetails/EconomicOverview.vue")),
    IncomeStandardLiving: defineAsyncComponent(() => import("~/components/CountryDetails/IncomeStandardLiving.vue")),
    TaxesConditionsBusiness: defineAsyncComponent(() => import("~/components/CountryDetails/TaxesConditionsBusiness.vue")),
    RealEstate: defineAsyncComponent(() => import("~/components/CountryDetails/RealEstate.vue")),
    MigrationOpenness: defineAsyncComponent(() => import("~/components/CountryDetails/MigrationOpenness.vue")),
    Infrastructure: defineAsyncComponent(() => import("~/components/CountryDetails/Infrastructure.vue")),
    MacroeconomicIndicators: defineAsyncComponent(() => import("~/components/CountryDetails/MacroeconomicIndicators.vue")),
    CurrencyExchangeRates: defineAsyncComponent(() => import("~/components/CountryDetails/CurrencyExchangeRates.vue")),
    EconomicStructure: defineAsyncComponent(() => import("~/components/CountryDetails/EconomicStructure.vue")),
    SocietyPolitics: defineAsyncComponent(() => import("~/components/CountryDetails/SocietyPolitics.vue")),
    TheFooter: defineAsyncComponent(() => import("~/components/TheFooter.vue")),
  },

  setup() {
    const incomingDataStore = useIncomingDataStore()
    const route = useRoute()
    const name = route.params.name

    const getCountriesData = computed(() => incomingDataStore.getCountriesData?.find((item) => item.name === name))

    useHead(() => {
      const country = getCountriesData.value?.country

      return {
        title: country ? `Economy of ${country} – Economic Pulse` : "Economic Pulse",
        meta: [
          {
            name: "description",
            content: country
              ? `Explore key economic indicators of ${country}: inflation, interest rates, and more.`
              : "Explore key economic indicators: inflation, interest rates, and more.",
          },
        ],
      }
    })

    return {}
  },
})
</script>
