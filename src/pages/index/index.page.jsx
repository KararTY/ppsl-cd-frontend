import { signOut } from 'fastify-next-auth/client'

import { Link } from '@/renderer/Link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { PostCard } from '@/components/PostCard'

export function Page (pageProps) {
  const { user, request } = pageProps

  return (
    <Container>
      <header>
        <hgroup className="m-0">
          <h1>PPSL CD</h1>
          <h2>Reviews database</h2>
        </hgroup>
        {!user
          ? (
          <>
            [<Link href="/login">Login</Link>]
          </>
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

      <div className="mb-2 !grid  grid-cols-2 gap-2">
        {request.result?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </Container>
  )
}
