export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: true,
  nitro: {
    preset: "static",
  },

  css: ["~/assets/scss/main.scss"],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  components: {
    loader: false,
  },

  app: {
    pageTransition: false,
    layoutTransition: false,

    head: {
      title: "Economic Pulse",
      meta: [
        {
          name: "description",
          content: "Simple signal of global economic health, updated daily",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: "Economic Pulse" },
        {
          property: "og:description",
          content: "Simple signal of global economic health, updated daily",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/cover.png" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
})
