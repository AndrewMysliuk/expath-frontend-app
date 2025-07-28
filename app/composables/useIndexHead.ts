export const useIndexHead = () => {
  useHead({
    title: "Economic Pulse – Global Economy Status",
    meta: [
      {
        name: "description",
        content: "A simple pulse indicator showing the current state of the global economy in plain language.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "Economic Pulse" },
      { property: "og:description", content: "A simple economic status indicator for everyone." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/cover.png" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  })
}
