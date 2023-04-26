import { signIn } from 'fastify-next-auth/client'
import { useEffect, useState } from 'react'

function App () {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    async function getUser () {
      const d = await fetch('/api/users')

      setUserData(await d.json())
    }

    getUser()
  }, [])

  return (
    <main>
      <article>
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h2>Login to PPSL CD using SSO</h2>
          </hgroup>
          <form>
            <button type="button" onClick={() => signIn('google')}>
              Sign in with Google
            </button>
            <button type="button" onClick={() => signIn('github')}>
              Sign in with GitHub
            </button>
          </form>
        </div>
      </article>

      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </main>
  )
}

export default App
