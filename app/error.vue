<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
    <div class="bg-white rounded-xl border border-gray-200 p-10 shadow-sm w-full max-w-xl text-center">
      <div class="flex items-center justify-center space-x-3 mb-6">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ error?.statusCode === 404 ? "Page Not Found" : "Unexpected Error" }}
        </h1>
      </div>

      <div class="text-6xl font-bold text-gray-600 mb-4">
        {{ error?.statusCode || 500 }}
      </div>

      <p class="text-gray-500 text-base mb-6 leading-relaxed">
        {{
          error?.statusCode === 404
            ? "This page could not be found. It may have been removed, renamed, or never existed."
            : error?.message || "Something went wrong."
        }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Return to Home Page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    error: {
      type: Object as () => { statusCode?: number; message?: string },
      required: true,
    },
  },

  setup(props) {
    const title = props.error?.statusCode === 404 ? "Page Not Found – Economic Pulse" : "Error – Economic Pulse"
    const description =
      props.error?.statusCode === 404
        ? "Sorry, the page you’re looking for doesn’t exist."
        : "An unexpected error occurred. Please try again later."

    useSeoHead({
      title,
      description,
    })

    return {}
  },
})
</script>
