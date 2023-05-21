import { tryParseContent } from '@/lib/api/posts/utils'

import { Link } from '@/renderer/Link'

import { Container } from '@/components/Container'
import { EntityHTML } from '@/components/ppsl-cd-lexical-shared/src/editors/Entity/read'
import { PostTitle } from '@/components/post/Title'
import { ReviewForm } from '@/components/review/Form'

export function Page (pageProps) {
  const { post, review } = pageProps

  const [{ title: postTitle, content }] = post.postHistory

  const parsedPostContent = tryParseContent(content, true)

  return (
    <Container>
      <div className="p-4 sm:p-8">
        <PostTitle title={`Reviewing "${postTitle}"`} />

        <details>
          <summary className="!text-cyan-500 underline">
            View post content
          </summary>

          <EntityHTML initialContent={parsedPostContent} />
        </details>

        <hgroup>
          <h4 className="text-gray-500 dark:text-gray-400">
            Give it a title.{' '}
            <Link href="/terms" target="_blank">
              Don&apos;t forget to read the ToS!
            </Link>
          </h4>
        </hgroup>

        <ReviewForm post={{ id: post.id }} review={review} />
      </div>
    </Container>
  )
}
