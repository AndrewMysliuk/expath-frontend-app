<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-white text-center px-4 py-12">
    <h1 class="text-4xl font-semibold text-orange-600 mb-4">{{ statusCode }} Error</h1>
    <p class="text-lg text-gray-800 mb-6">
      {{ message }}
    </p>
    <NuxtLink to="/" class="text-base font-medium text-blue-600 underline hover:text-blue-800 transition-colors">
      Return to homepage
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    statusCode: {
      type: Number,
      default: 404,
    },
    message: {
      type: String,
      default: "Page not found",
    },
  },
})
</script>
