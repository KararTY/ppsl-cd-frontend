import { useRef } from 'react'

import { Container } from '@/components/Container'

export function Page (pageProps) {
  const { request = {}, user = {} } = pageProps

  const me = request.id === user.id

  const emailEl = useRef()

  const handleEmailOnFocus = () => {
    emailEl.current.value = request.email
  }

  const handleEmailOnBlur = () => {
    emailEl.current.value = emailEl.current.defaultValue
  }

  return (
    <Container>
      <header>
        <hgroup className="m-0">
          <h1>{request.name}&apos;s profile</h1>
          <h2></h2>
        </hgroup>
      </header>
      <div>
        <img src={request.image} />
        {/* eslint-disable-next-line multiline-ternary */}
        {request.email && me ? (
          <>
            <label>
              <span>Email:</span>
              <input
                readOnly
                defaultValue={'Tap to see email'}
                ref={emailEl}
                onFocus={handleEmailOnFocus}
                onBlur={handleEmailOnBlur}
              />
            </label>
            {/* <BioEditor /> */}
          </>
        ) : (
          {
            /* <BioHTML /> */
          }
        )}
      </div>
    </Container>
  )
}
