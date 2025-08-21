<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-4">
            <div class="flex items-center gap-2">
              <span :class="['country-flag --xl', getCountriesData?.country_iso]" />
              <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
                {{ getCountriesData?.country }}
              </h1>
            </div>

            <span class="text-sm text-gray-600 font-medium tracking-wide bg-gray-100 rounded px-2 py-1">
              {{ MOCK_DATA.header.currency.short }} - {{ MOCK_DATA.header.currency.name }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Last Updated</div>
          <div class="text-gray-700 font-medium">{{ formattedDate }}</div>
        </div>
      </div>

      <div class="mt-6 flex items-center space-x-6">
        <div class="flex items-center space-x-3">
          <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Economic Pulse Score</div>
          <div class="flex items-center space-x-2">
            <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="{
                  'bg-gradient-to-r from-red-500 to-red-600': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                  'bg-gradient-to-r from-orange-400 to-orange-500': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                  'bg-gradient-to-r from-yellow-300 to-yellow-400': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                  'bg-gradient-to-r from-green-400 to-green-500': MOCK_DATA.header.score.status === 'STABLE',
                  'bg-gradient-to-r from-emerald-500 to-emerald-600': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
                }"
                :style="{ width: MOCK_DATA.header.score.value + '%' }"
              />
            </div>
            <span
              class="text-2xl font-bold"
              :class="{
                'text-red-500': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                'text-orange-500': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                'text-yellow-500': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                'text-green-500': MOCK_DATA.header.score.status === 'STABLE',
                'text-emerald-500': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
              }"
            >
              {{ MOCK_DATA.header.score.value }}
            </span>
            <span class="text-gray-400 font-medium">/100</span>
          </div>
        </div>

        <div
          class="flex items-center space-x-2 px-3 py-1 rounded-full border"
          :class="{
            'bg-red-50 border-red-200': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
            'bg-orange-50 border-orange-200': MOCK_DATA.header.score.status === 'HIGH_TENSION',
            'bg-yellow-50 border-yellow-200': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
            'bg-green-50 border-green-200': MOCK_DATA.header.score.status === 'STABLE',
            'bg-emerald-50 border-emerald-200': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
          }"
        >
          <span
            class="w-2 h-2 rounded-full animate-pulse"
            :class="{
              'bg-red-500': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
              'bg-orange-400': MOCK_DATA.header.score.status === 'HIGH_TENSION',
              'bg-yellow-400': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
              'bg-green-400': MOCK_DATA.header.score.status === 'STABLE',
              'bg-emerald-500': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
            }"
          ></span>
          <span
            class="text-sm font-medium uppercase tracking-wide"
            :class="{
              'text-red-700': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
              'text-orange-700': MOCK_DATA.header.score.status === 'HIGH_TENSION',
              'text-yellow-700': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
              'text-green-700': MOCK_DATA.header.score.status === 'STABLE',
              'text-emerald-700': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
            }"
          >
            {{ MOCK_DATA.header.score.status.replaceAll("_", " ") }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useIncomingDataStore } from "~/store"
import { ScoreStatusEnum } from "~/types"

const MOCK_DATA = {
  header: {
    currency: {
      name: "Euro",
      short: "EUR",
    },
    last_updated: "2025-08-20",
    score: {
      value: 85,
      status: ScoreStatusEnum.STABLE,
    },
  },
}

export default defineComponent({
  setup() {
    const incomingDataStore = useIncomingDataStore()
    const route = useRoute()
    const name = route.params.name

    const getCountriesData = computed(() => incomingDataStore.getCountriesData?.find((item) => item.name === name))
    const formattedDate = computed(() => {
      return new Date(MOCK_DATA.header.last_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    })

    return {
      MOCK_DATA,
      getCountriesData,
      formattedDate,
    }
  },
})
</script>
