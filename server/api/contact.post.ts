export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const scriptUrl = config.googleScriptEndpoint

  const body = await readBody<{
    name: string
    email: string
    message: string
  }>(event)

  if (!body?.name || !body?.email || !body?.message) {
    return { success: false, error: "Missing fields" }
  }

  try {
    const response = await $fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })

    return response
  } catch (err: any) {
    return { success: false, error: err.message || "Request failed" }
  }
})
