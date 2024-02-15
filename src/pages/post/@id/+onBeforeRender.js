import { getPostById } from '#/lib/api/posts'
import { getYPostUpdatesHTMLByPostId } from '#/lib/api/lexical'

export default async function onBeforeRender (pageContext) {
  const { id } = pageContext.routeParams

  const json = await getPostById(id)

  let html

  if (json) {
    const text = await getYPostUpdatesHTMLByPostId(json.id)

    try {
      JSON.parse(text)
      html = undefined
    } catch {
      html = text
    }
  }

  return {
    pageContext: {
      pageProps: {
        request: json,
        html
      }
    }
  }
}
