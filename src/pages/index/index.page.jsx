import { signOut } from 'fastify-next-auth/client'
import { Button } from '@/components/Button'
import { Link } from '@/renderer/Link'

export function Page (pageProps) {
  const { user, request } = pageProps

  return (
    <main className="container">
      <article>
        <div>
          <hgroup>
            <h1>PPSL CD</h1>
            <h2>Reviews database</h2>
          </hgroup>

          {!user
            ? (
            <Link href="/login">Login</Link>
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

          <pre>{JSON.stringify(request)}</pre>
        </div>
      </article>
    </main>
  )
}
