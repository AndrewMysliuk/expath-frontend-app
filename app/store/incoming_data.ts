import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { MetricStatusEnum, type ICountry, type IDailyData, type IHistory } from "~/types"

const DAILY_URL = "/json_data/2025-08-12.json"
const COUNTRIES_URL = "/json_data/countries.json"

export const useIncomingDataStore = defineStore("incomingDateStore", () => {
  const dailyData = ref<IDailyData | null>(null)
  const countriesData = ref<ICountry[]>([])
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)
  const ac = ref<AbortController | null>(null)

  const getDailyData = computed(() => dailyData.value)
  const getCountriesData = computed(() => countriesData.value)
  const getGlobalStatus = computed(() => (dailyData.value ? computeGlobalStatus(dailyData.value).status : MetricStatusEnum.UNKNOWN))
  const getWaveParams = computed(() =>
    getGlobalStatus.value ? mapStatusToWaveParams(getGlobalStatus.value) : mapStatusToWaveParams(-1 as any)
  )

  const cancel = () => {
    ac.value?.abort()
    ac.value = null
  }

  const fetchDailyData = async (force = false) => {
    if (dailyData.value && !force) return dailyData.value

    try {
      const data = await $fetch<IDailyData>(DAILY_URL, {
        headers: { accept: "application/json" },
      })
      dailyData.value = data

      return data
    } catch (err: any) {
      errorMessage.value = err?.message ?? "Failed to load daily"
      throw err
    }
  }

  const fetchCountriesData = async (force = false) => {
    if (countriesData.value.length && !force) return countriesData.value

    try {
      const data = await $fetch<ICountry[]>(COUNTRIES_URL, {
        headers: { accept: "application/json" },
      })
      countriesData.value = data

      return data
    } catch (err: any) {
      errorMessage.value = err?.message ?? "Failed to load history"
      throw err
    }
  }

  const fetchAllData = async (force = false) => {
    if (!force && dailyData.value && countriesData.value) {
      return { daily: dailyData.value, countries: countriesData.value }
    }

    cancel()
    ac.value = new AbortController()
    isLoading.value = true
    errorMessage.value = null

    try {
      const [daily, countries] = await Promise.all([
        $fetch<IDailyData>(DAILY_URL, {
          signal: ac.value.signal,
          headers: { accept: "application/json" },
        }),
        $fetch<ICountry[]>(COUNTRIES_URL, {
          signal: ac.value.signal,
          headers: { accept: "application/json" },
        }),
      ])

      dailyData.value = daily
      countriesData.value = countries

      return { daily, countries }
    } catch (e: any) {
      errorMessage.value = e?.message ?? "Failed to load"
      throw e
    } finally {
      isLoading.value = false
      ac.value = null
    }
  }

  return {
    getDailyData,
    getCountriesData,
    getGlobalStatus,
    getWaveParams,
    cancel,
    fetchDailyData,
    fetchCountriesData,
    fetchAllData,
  }
})
