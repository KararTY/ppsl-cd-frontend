import { getInitialUpdate } from '#/lib/api/posts'
import { SYSTEM_IDS } from '#/components/ppsl-cd-lexical-shared/src/editors/constants'

const { ENTITY } = SYSTEM_IDS

export default async function onBeforeRender (pageContext) {
  if (!pageContext.user) {
    return {
      pageContext: {
        redirectTo: '/login'
      }
    }
  }

  const initialUpdate = await getInitialUpdate(ENTITY)

  return {
    pageContext: {
      pageProps: {
        initialUpdate
      }
    }
  }
}
