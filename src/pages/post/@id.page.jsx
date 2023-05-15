import { Container } from '@/components/Container'
import { PostTitle } from '@/components/post/Title'

import { usePageContext } from '@/renderer/usePageContext'

import { tryParseContent } from '@/lib/api/posts/utils'

import { ReviewTitle } from '@/components/review/Title'
import { EntityHTML } from '@/components/ppsl-cd-lexical-shared/src/editors/Entity/read'
import { useGetReviewsByPostId } from '@/lib/api/posts'
import { ReviewsList } from '@/components/review/List'

export function Page (pageProps) {
  const { urlPathname } = usePageContext()
  const { request } = pageProps

  const [{ title, content, createdTimestamp }] = request.postHistory

  const parsedContent = tryParseContent(content, true)

  const isEntity = request.outRelations.some(
    (relation) => relation.isSystem && relation.toPost.id === 'entity'
  )

  return (
    <Container>
      <div className="p-4 sm:p-8">
        <PostTitle
          title={title}
          createdTimestamp={createdTimestamp}
          edit={{ href: `${urlPathname}/edit` }}
        />

        <EntityHTML initialContent={parsedContent} />

        {isEntity && (
          <div className="mt-12">
            <ReviewTitle
              title="Reviews"
              edit={{ href: `${urlPathname}/review` }}
            />

            <ReviewsList postId={request.id} />
          </div>
        )}
      </div>
    </Container>
  )
}
