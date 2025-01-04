import { useEffect, useState } from 'react'
import { CalendarIcon, ChevronLeftIcon, UserIcon } from 'lucide-react'

import { Link } from '#/renderer/Link'
import { usePageContext } from '#/renderer/usePageContext'

import { getAuthorsForPostId } from '#/lib/api/posts'
import { getEditURLForPost } from '#/lib/post'

import { Container } from '#/components/Container'
import { PostTitle } from '#/components/post/Title'
import { Tags } from '#/components/post/Tags'
import useFormattedDate from '#/components/useFormattedDate'
// import { PostsList } from '#/components/post/List'
// import { Reviews } from '#/components/review'
import { typeToColorClassAndIcon } from '#/components/review/utils'
import { getPostType } from '#/components/ppsl-cd-lexical-shared/src/editors/utils'
import { SYSTEM_IDS } from '#/components/ppsl-cd-lexical-shared/src/editors/constants'

const { REVIEW, BIO } = SYSTEM_IDS

export default function Page ({ post, html, user }) {
  const { urlPathname } = usePageContext()

  const [{ title, createdTimestamp: lastUpdated }] = post.postUpdates
  const [authors, setAuthors] = useState([])

  const type = getPostType(post)

  const isReview = type === REVIEW
  const isBio = type === BIO

  const editURL = getEditURLForPost(urlPathname, post.outRelations)

  const isAuthor = authors.some((author) => author.id === user?.id)

  const createdTimestamp = useFormattedDate(post.createdTimestamp)

  useEffect(() => {
    let cancel = false

    ;(async function getAuthors () {
      const authorsRes = await getAuthorsForPostId(post.id)

      if (!cancel) {
        setAuthors(authorsRes)
      }
    })()

    return () => {
      cancel = true
    }
  }, [post.id])

  return (
    <Container>
      <div className="p-4 sm:p-8">
        {isReview && (
          <div className="mb-4 flex flex-col gap-4 leading-none">
            <Link
              href={post.reviewing.toPost.id}
              className="flex items-center py-2"
            >
              <ChevronLeftIcon />
              <span>
                Reviewing &quot;{post.reviewing.toPost.postHistory[0].title}
                &quot;
              </span>
            </Link>
            <span>User review:</span>
            <p
              className={`m-0 ${
                typeToColorClassAndIcon[post.reviewing.type][0]
              } flex items-center gap-2 bg-opacity-10 leading-none`}
            >
              <span
                className={`bg-opacity-75 p-4 text-opacity-75 ${
                  typeToColorClassAndIcon[post.reviewing.type][0]
                }`}
              >
                {typeToColorClassAndIcon[post.reviewing.type][1]}
              </span>
              {post.reviewing.type}
            </p>
          </div>
        )}

        {isBio && authors.length > 0 && (
          <Link
            href={`/profile/${authors[0].id}`}
            className="flex items-center gap-2 py-2"
          >
            <UserIcon />
            <span>Viewing bio for &quot;{authors[0].name}&quot;</span>
          </Link>
        )}

        <PostTitle
          title={title}
          timestamp={lastUpdated}
          edit={
            isReview
              ? isAuthor
                ? { href: `/post/${post.reviewing.toPost.id}/review` }
                : null
              : { href: editURL }
          }
        />

        {!!post.outRelations.length && <Tags relations={post.outRelations} />}

        {html
          ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
            )
          : (
          <p>No content.</p>
            )}

        <div className="mt-8 flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon size="1em" />
            &quot;{title}&quot; post created:{' '}
            {createdTimestamp || (
              <span className="inline-block h-3 w-1/4 animate-pulse bg-slate-400 bg-opacity-25"></span>
            )}
          </span>
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-1">
              <UserIcon size="1em" /> Author{authors.length > 1 && 's'}:
            </span>

            {authors.length
              ? (
                  authors.map((author, index, arr) => (
                <Link key={author.id} href={`/profile/${author.id}`}>
                  {author.name}
                  {index < arr.length - 1 && ', '}
                </Link>
                  ))
                )
              : (
              <span className="h-4 w-1/4 animate-pulse bg-slate-400 bg-opacity-25"></span>
                )}
          </div>
        </div>

        {/* isEntity && (
          <>
            <hr className="my-8" />
            <Reviews postId={request.id} />
          </>
        ) */}

        {/* !isReview && !isBio && (
          <PostsList post={request} isSystem={isSystem || undefined} />
        ) */}
      </div>
    </Container>
  )
}
