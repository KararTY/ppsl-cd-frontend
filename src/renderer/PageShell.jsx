import React from 'react'

import './index.css'
import './pico.scss'

import { PageContextProvider } from './usePageContext.jsx'

export function PageShell ({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}
