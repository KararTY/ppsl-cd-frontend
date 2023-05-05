import { useRef } from 'react'

import { Container } from '@/components/Container'

import cdROMImage from '@/assets/CD-ROM.png'

export function Page (pageProps) {
  const { request = {}, user = {} } = pageProps

  const me = request.id === user?.id

  const emailEl = useRef()

  const handleEmailOnFocus = () => {
    emailEl.current.value = request.email
  }

  const handleEmailOnBlur = () => {
    emailEl.current.value = emailEl.current.defaultValue
  }

  const img = request.image
    ? { url: request.image }
    : { url: cdROMImage, ppsl: true }

  return (
    <Container>
      <div className="p-4 sm:p-8">
        <div className="mb-4 flex flex-row items-center gap-2">
          <img
            src={img.url}
            className={`h-auto w-16 bg-gray-500 bg-opacity-50 p-2 ${
              img.ppsl && 'opacity-75'
            }`}
          />
          <hgroup className="m-0">
            <h3>Profile</h3>
            <h4>{request.name}</h4>
          </hgroup>
        </div>
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
