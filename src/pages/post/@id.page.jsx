import { Container } from '@/components/Container'
import { BioHTML } from '@/components/editors/Bio/read'
import parseContent from '@/lib/api/parseContent'

export function Page (pageProps) {
  const { user, request } = pageProps

  const [{ title, createdTimestamp, content }] = request.postHistory

  const parsedContent = JSON.stringify(parseContent(content))

  return (
    <Container>
      <header>
        <hgroup className="m-0">
          <h1>PPSL CD</h1>
          <h2>Reviews database</h2>
        </hgroup>
      </header>

      <div>
        <BioHTML initialContent={parsedContent} />
      </div>
    </Container>
  )
}
