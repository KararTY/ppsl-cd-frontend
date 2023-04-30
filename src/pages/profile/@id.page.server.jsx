export async function onBeforeRender (pageContext) {
  if (!pageContext.user) {
    return {
      pageContext: {
        redirectTo: '/login'
      }
    }
  }

  let json

  if (pageContext.routeParams.id === pageContext.user.id) {
    json = pageContext.user
  } else {
    const url = new URL(
      `./users/${pageContext.routeParams.id}`,
      process.env.API_ENDPOINT
    )
    const res = await fetch(url, { headers: { cookie: pageContext.cookie } })
    json = await res.json()
  }

  return {
    pageContext: {
      pageProps: {
        request: json
      }
    }
  }
}
