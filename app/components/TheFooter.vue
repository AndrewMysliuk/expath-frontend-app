<template>
  <footer class="bg-gray-50 px-6 py-12 mt-16" aria-labelledby="footer-title">
    <div class="max-w-6xl mx-auto">
      <nav aria-label="Footer">
        <ul class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <li><router-link to="/" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Home</router-link></li>
          <li><router-link to="/about" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">About</router-link></li>
          <li>
            <router-link to="/contact" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Contact</router-link>
          </li>
          <li>
            <router-link to="/library" class="text-gray-600 hover:text-orange-500 transition-colors font-medium">Glossary</router-link>
          </li>
        </ul>
      </nav>
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
