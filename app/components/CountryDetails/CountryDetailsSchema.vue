<template>
  <div class="flex justify-center py-10 rounded-lg bg-slate-300">
    <div class="relative w-96 h-72 overflow-hidden flex-shrink-0" v-if="getCountriesData">
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
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useIncomingDataStore } from "~/store"

export default defineComponent({
  setup() {
    const incomingDataStore = useIncomingDataStore()
    const route = useRoute()
    const name = route.params.name

    const getCountriesData = computed(() => incomingDataStore.getCountriesData?.find((item) => item.name === name))

    return {
      getCountriesData,
    }
  },
})
</script>
