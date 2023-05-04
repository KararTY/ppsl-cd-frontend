import { Link } from '@/renderer/Link'

const POST_PAGE_ENDPOINT = '/post'

export function PostCard ({ id, postHistory }) {
  const [{ title, createdTimestamp }] = postHistory

  return (
    <Link href={`${POST_PAGE_ENDPOINT}/${id}`} className="no-underline">
      <article className="m-0 p-0">
        <header className="m-0 flex flex-col p-3">
          <strong>{title}</strong>
          <small className="text-xs">
            {new Date(createdTimestamp).toLocaleString()}
          </small>
        </header>
      </article>
    </Link>
  )
}