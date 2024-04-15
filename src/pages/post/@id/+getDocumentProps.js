import { isOfPostType } from '#/lib/post'

// getDocumentProps() can use fetched data to provide <title> and <meta name="description">

export default function getDocumentProps (pageProps) {
  const { request } = pageProps

  const { post } = request

  const [{ title: postHistoryTitle }] = post.postUpdates

  let title = postHistoryTitle

  const isReview = isOfPostType(post.outRelations, 'review')

  if (isReview) {
    const [{ title: reviewingPostHistoryTitle }] =
      request.reviewing.toPost.postHistory

    title = `"${postHistoryTitle}" reviewing ${reviewingPostHistoryTitle}`
  }

  return {
    title
  }
}
