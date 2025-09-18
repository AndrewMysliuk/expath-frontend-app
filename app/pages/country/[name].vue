<template>
  <div class="min-h-screen bg-white">
    <main class="max-w-7xl mx-auto px-4 py-12 space-y-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eum necessitatibus dolor quam aperiam deleniti corporis. Minima, animi
      inventore ratione ad, eius atque nostrum quo laboriosam accusantium vel esse doloribus.
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
// import { useIncomingDataStore } from "~/store"

export default defineComponent({
  components: {},

  setup() {
    // const incomingDataStore = useIncomingDataStore()
    // const route = useRoute()
    // const name = route.params.name

    useHead(() => {
      return {
        title: "Economic Pulse",
        meta: [
          {
            name: "description",
            content: "Explore key economic indicators: inflation, interest rates, and more.",
          },
        ],
      }
    })

    return {}
  },
})
</script>
