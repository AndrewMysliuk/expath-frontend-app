<template>
  <div class="min-h-screen bg-white">
    <div class="px-6 py-12">
      <div class="max-w-xl mx-auto">
        <header class="text-center mb-10">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Contact</h1>
          <p class="text-gray-600 text-base">Got feedback, suggestions, or partnership inquiries? Drop a message below.</p>
        </header>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">
            {{ loading ? "Sending..." : "Send Message" }}
          </button>

          <p v-if="success" class="text-green-600 text-sm font-medium mt-2">Message sent successfully!</p>
          <p v-if="error" class="text-red-600 text-sm font-medium mt-2">Something went wrong. Please try again later.</p>
        </form>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { TheFooter } from "~/components"

export default defineComponent({
  components: {
    TheFooter,
  },
  setup() {
    const config = useRuntimeConfig()
    const endpoint = config.public.contactEndpoint as string
    const form = ref({
      name: "",
      email: "",
      message: "",
    })
    const loading = ref(false)
    const success = ref(false)
    const error = ref(false)

    const handleSubmit = async () => {
      loading.value = true
      success.value = false
      error.value = false

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(form.value),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const result = await res.json()

        if (result.success) {
          success.value = true
          form.value = { name: "", email: "", message: "" }
        } else {
          throw new Error()
        }
      } catch (_) {
        error.value = true
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      success,
      error,
      handleSubmit,
    }
  },
})
</script>
