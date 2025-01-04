// getDocumentProps() can use fetched data to provide <title> and <meta name="description">

import { SYSTEM_IDS } from '#/components/ppsl-cd-lexical-shared/src/editors/constants'
import { getPostType } from '#/components/ppsl-cd-lexical-shared/src/editors/utils'

export default function getDocumentProps (pageProps) {
  const { post } = pageProps

  const [{ title: postHistoryTitle }] = post.postUpdates

  let title = postHistoryTitle

  const isReview = getPostType(post) === SYSTEM_IDS.REVIEW

  if (isReview) {
    const [{ title: reviewingPostHistoryTitle }] =
      post.reviewing.toPost.postHistory

    title = `"${postHistoryTitle}" reviewing ${reviewingPostHistoryTitle}`
  }

  return {
    title
  }
}
