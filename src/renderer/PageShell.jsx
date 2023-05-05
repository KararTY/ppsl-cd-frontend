import './index.css'
import './pico.scss'

import { PageContextProvider } from './usePageContext.jsx'

export function PageShell ({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      {children}
    </PageContextProvider>
  )
}
