import { Container } from '@/components/Container'
import parseContent from '@/lib/api/parseContent'
import { Link } from '@/renderer/Link'
import { usePageContext } from '@/renderer/usePageContext'
import { EditIcon } from 'lucide-react'

export function Page (pageProps) {
  const { urlPathname } = usePageContext()
  const { request } = pageProps

  const [{ title, content, createdTimestamp }] = request.postHistory

  const parsedContent = JSON.stringify(parseContent(content))

  return (
    <Container>
      <div className="p-4 sm:p-8">
        <div className="mb-4 flex flex-row items-center justify-between">
          <hgroup className="m-0 grow">
            <h3>{title}</h3>
            <span className="!text-xs text-gray-400">
              {new Date(createdTimestamp).toLocaleString()}
            </span>
          </hgroup>
          <Link
            href={`${urlPathname}/edit`}
            className="flex items-center gap-2 no-underline"
          >
            <EditIcon />
            <span>Edit</span>
          </Link>
        </div>

        {/* <BioEditor readOnly post={request} initialContent={parsedContent} /> */}
      </div>
    </Container>
  )
}
