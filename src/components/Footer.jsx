import { Link } from '@/renderer/Link'
import { usePageContext } from '@/renderer/usePageContext'

export function Footer () {
  const { urlPathname } = usePageContext()

  return (
    <footer className="flex flex-col gap-2">
      <div className="flex justify-between">
        {urlPathname !== '/'
          ? (
          <span>
            [<Link href="/">Go to Homepage</Link>]
          </span>
            )
          : (
          <span className="basis-1/2">
            PPSL CD is a company reviews database, for consumers, in relation to
            the right-to-repair legislation.
          </span>
            )}

        <span>
          [<Link href="/privacy">Privacy Policy</Link>] [
          <Link href="/terms">Terms of Service</Link>]
        </span>
      </div>
    </footer>
  )
}
