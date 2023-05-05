import { signIn } from 'fastify-next-auth/client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'

const submitNoOp = (e) => e.preventDefault()

export function Page () {
  return (
    <Container>
      <Header>
        <hgroup className="m-0">
          <h1>Login</h1>
          <h2>Login to PPSL using SSO</h2>
        </hgroup>
      </Header>
      <div className="p-4">
        <form className="m-0 flex flex-col gap-2" onSubmit={submitNoOp}>
          <Button onClick={() => signIn('google')}>Sign in with Google</Button>
          <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
        </form>
      </div>
    </Container>
  )
}
