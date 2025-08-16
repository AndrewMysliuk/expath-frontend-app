<template>
  <footer class="bg-gray-50 px-6 py-12 mt-16">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
        <router-link to="/library" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">About</router-link>
        <router-link to="/library" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Contact</router-link>
        <router-link to="/library" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Methodology</router-link>
        <router-link to="/library" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Data Sources</router-link>
      </div>
      <div class="text-center border-t border-gray-200 pt-8">
        <p class="text-sm text-gray-500">© 2025 Economic Pulse. All rights reserved. • Data for informational purposes only.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
