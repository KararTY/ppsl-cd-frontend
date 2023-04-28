export async function onBeforeRender (_) {
  const url = new URL('./posts/', process.env.API_ENDPOINT)

  const res = await fetch(url.href)
  const json = await res.json()

  return {
    pageContext: {
      pageProps: {
        request: json
      }
    }
  }
}
