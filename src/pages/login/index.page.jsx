import { signIn } from 'fastify-next-auth/client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Link } from '@/renderer/Link'

const submitNoOp = (e) => e.preventDefault()

export function Page () {
  return (
    <Container>
      <header>
        <hgroup className="m-0">
          <h1>Login</h1>
          <h2>Login to PPSL using SSO</h2>
        </hgroup>
      </header>
      <div>
        <form className="flex flex-col gap-2" onSubmit={submitNoOp}>
          <Button onClick={() => signIn('google')}>Sign in with Google</Button>
          <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
        </form>
      </div>
      <footer className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>
            [<Link href="/">Go to Homepage</Link>]
          </span>
          <span>
            [<Link href="/privacy">Privacy Policy</Link>] [
            <Link href="/terms">Terms of Service</Link>]
          </span>
        </div>
      </footer>
    </Container>
  )
}
