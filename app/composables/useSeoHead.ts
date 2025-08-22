interface ISeoOptions {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  icon?: string
}

export const useSeoHead = (options: ISeoOptions = {}) => {
  const defaultTitle = "Economic Pulse – Global Economy Status"
  const defaultDescription = "A simple pulse indicator showing the current state of the global economy in plain language."
  const defaultOgTitle = "Economic Pulse"
  const defaultOgDescription = "A simple economic status indicator for everyone."
  const defaultOgImage = "/cover.png"
  const defaultOgType = "website"
  const defaultIcon = "/favicon.ico"

  useHead({
    title: options.title ?? defaultTitle,
    meta: [
      {
        name: "description",
        content: options.description ?? defaultDescription,
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        property: "og:title",
        content: options.ogTitle ?? options.title ?? defaultOgTitle,
      },
      {
        property: "og:description",
        content: options.ogDescription ?? options.description ?? defaultOgDescription,
      },
      {
        property: "og:image",
        content: options.ogImage ?? defaultOgImage,
      },
      {
        property: "og:type",
        content: options.ogType ?? defaultOgType,
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: options.icon ?? defaultIcon,
      },
    ],
  })
}
