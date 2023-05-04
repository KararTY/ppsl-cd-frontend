import { signIn } from 'fastify-next-auth/client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

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
    </Container>
  )
}
