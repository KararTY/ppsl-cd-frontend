import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { BioEditor } from '@/components/editors/Bio/editor'
import parseContent from '@/lib/api/parseContent'

export function Page (pageProps) {
  const { user, request } = pageProps

  const [{ title, createdTimestamp, content }] = request.postHistory

  const parsedContent = JSON.stringify(parseContent(content))

  return (
    <Container>
      <Header className="mx-0 mb-0">
        <hgroup className="m-0">
          <h1>PPSL CD</h1>
          <h2>Reviews database</h2>
        </hgroup>
      </Header>

      <div>
        <BioEditor readOnly initialContent={parsedContent} />
      </div>
    </Container>
  )
}
