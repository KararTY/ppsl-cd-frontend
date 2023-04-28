import { Button } from '@/components/Button'
import { signIn } from 'fastify-next-auth/client'

export function onBeforeRender (pageContext) {
  if (pageContext.user) {
    return {
      pageContext: {
        redirectTo: '/'
      }
    }
  }
}

export function Page () {
  return (
    <main className="container">
      <article>
        <div>
          <hgroup>
            <h1>Login</h1>
            <h2>Login to PPSL CD using SSO</h2>
          </hgroup>
          <form>
            <Button type="button" onClick={() => signIn('google')}>
              Sign in with Google
            </Button>
            <Button type="button" onClick={() => signIn('github')}>
              Sign in with GitHub
            </Button>
          </form>
        </div>
      </article>
    </main>
  )
}
