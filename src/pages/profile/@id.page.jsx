import { useRef } from 'react'

export function Page (pageProps) {
  const { request = {} } = pageProps

  const emailEl = useRef()

  const handleEmailOnFocus = () => {
    emailEl.current.value = request.email
  }

  const handleEmailOnBlur = () => {
    emailEl.current.value = emailEl.current.defaultValue
  }

  return (
    <main className="container">
      <article>
        <div>
          <hgroup>
            <h1>{request.name}&apos;s profile</h1>
            <h2></h2>
          </hgroup>
          <img src={request.image} />
          {request.email && (
            <label>
              <span>Email:</span>
              <input
                readOnly
                defaultValue={'Tap to see your email'}
                ref={emailEl}
                onFocus={handleEmailOnFocus}
                onBlur={handleEmailOnBlur}
              />
            </label>
          )}
        </div>
      </article>
    </main>
  )
}
