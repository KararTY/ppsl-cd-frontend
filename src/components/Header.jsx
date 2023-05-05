import { signOut } from 'fastify-next-auth/client'

import { Link } from '@/renderer/Link.jsx'
import { usePageContext } from '@/renderer/usePageContext.jsx'
import { Button } from './Button.jsx'

export function Header ({ className = '', title, children }) {
  const { urlPathname, user } = usePageContext()

  return (
    <header className={`mx-0 mb-0 ${className}`}>
      <hgroup className="m-0">
        <h1>{title ?? 'PPSL CD'}</h1>
        <h2 className="text-gray-400">Reviews database</h2>
      </hgroup>
      {!user
        ? (
            urlPathname !== '/login' && (
          <>
            [<Link href="/login">Login</Link>]
          </>
            )
          )
        : (
        <>
          <p>
            Hello, {user.name}. You&apos;re logged in. [
            <Link href="/profile">Access profile</Link>] [
            <Button onClick={signOut()}>Logout</Button>]
          </p>
        </>
          )}
    </header>
  )
}
