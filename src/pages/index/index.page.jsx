import { Link } from '@/renderer/Link'

export function Page ({ user, request }) {
  return (
    <main className="container">
      <h1>PPSL CD</h1>
      {!user
        ? (
        <Link href="/login">Login</Link>
          )
        : (
        <>
          <p>Hello, {user.name}. You&apos;re logged in.</p>
        </>
          )}

      <pre>{JSON.stringify(request)}</pre>
    </main>
  )
}
