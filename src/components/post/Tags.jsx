import { useState } from 'react'
import { LockIcon, MoreHorizontalIcon, TagsIcon, XIcon } from 'lucide-react'

import { Link } from '#/renderer/Link'
import { Button } from '../Button'

/**
 * @param {{ relations: Array<{isSystem: boolean, toPost: { id: string, postUpdates: Array<{language: string, title: string}>}, toPostId: string> } }}
 */
export function Tags ({ relations = [] }) {
  const [showAllTags, setShowAllTags] = useState(false)

  const linkedRelations = relations.length
    ? relations.filter(({ isSystem }) => !isSystem)
    : []
  const systemRelations = relations.length
    ? relations.filter(({ isSystem }) => isSystem)
    : []

  const handleEllipsisClick = () => {
    setShowAllTags(!showAllTags)
  }

  const relationsToShow = systemRelations.concat(
    showAllTags ? linkedRelations : []
  )

  return (
    <div className="my-2 flex flex-wrap gap-2">
      <span title="Post tags">
        <TagsIcon />
      </span>
      {relationsToShow.map(({ isSystem, toPost, toPostId }) => (
        <Link
          key={toPost?.id || toPostId}
          className="flex items-center gap-1 rounded bg-gray-500 bg-opacity-25 p-1 text-xs leading-none no-underline"
          href={`/post/${toPost?.id || toPostId}`}
          title={isSystem ? 'System tag' : undefined}
        >
          {isSystem && <LockIcon size={'1em'} />}
          <span>{toPost.postUpdates[0].title}</span>
        </Link>
      ))}
      {!!linkedRelations.length && (
        <Button
          className="m-0 p-0 px-2 text-xs leading-none"
          onClick={handleEllipsisClick}
          title={showAllTags ? 'Hide tags' : 'Show more tags'}
        >
          {showAllTags
            ? (
            <XIcon size="1em" />
              )
            : (
            <MoreHorizontalIcon size="1em" />
              )}
        </Button>
      )}
    </div>
  )
}
