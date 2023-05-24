import { useState } from 'react'

import { useGetLatestPostsByFilter } from '@/lib/api/posts'

import { PostCard } from './Card'
import { PaginationButtons } from '../PaginationButtons'

export function PostList ({ post }) {
  const [{ title }] = post.postHistory

  const [page, setPage] = useState(0)
  const { response, isLoading, isFetching, canContinue } =
    useGetLatestPostsByFilter(page, {
      outRelations: {
        some: {
          toPostId: post.id
        }
      }
    })

  return (
    <>
      <hr className="my-8" />
      <div className="flex flex-col gap-2">
        <strong>Latest edited posts with relation &quot;{title}&quot;</strong>

        {!isLoading && !isFetching
          ? (
          <>
            <PaginationButtons
              size="small"
              onClick={setPage}
              page={page}
              canContinue={canContinue}
            />
            <div className="!grid grid-cols-2 gap-2">
              {response?.result?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <PaginationButtons
              size="small"
              onClick={setPage}
              page={page}
              canContinue={canContinue}
            />
          </>
            )
          : (
          <label className="flex flex-col gap-2">
            <span>Loading...</span>
            <progress />
          </label>
            )}
      </div>
    </>
  )
}
