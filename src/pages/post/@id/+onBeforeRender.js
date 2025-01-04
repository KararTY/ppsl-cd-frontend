import { getPostById } from '#/lib/api/posts'

export default async function onBeforeRender (pageContext) {
  const { id } = pageContext.routeParams

  const { post, html } = await getPostById(id)

  return {
    pageContext: {
      pageProps: {
        post,
        html
      }
    }
  }
}
