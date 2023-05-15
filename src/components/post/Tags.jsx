import { SettingsIcon } from 'lucide-react'

/**
 * @param {{ relations: Array<{isSystem: boolean, toPost: { id: string, postHistory: Array<{language: string, title: string}>}> } }}
 */
export function Tags ({ relations = [] }) {
  return (
    <div className="my-2 flex flex-wrap gap-2">
      {relations.map(({ isSystem, toPost }) => (
        <a
          key={toPost.id}
          className="flex items-center gap-1 rounded bg-gray-500 bg-opacity-25 p-1 text-xs leading-none no-underline"
          href={`/post/${toPost.id}`}
        >
          {isSystem && <SettingsIcon size={'1em'} />}
          <span>{toPost.postHistory[0].title}</span>
        </a>
      ))}
    </div>
  )
}
