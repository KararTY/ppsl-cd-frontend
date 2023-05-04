import { Footer } from './Footer'

export function Container ({ className = '', children }) {
  return (
    <main className="container overflow-hidden max-sm:!m-0 max-sm:!max-w-none">
      <article className={`m-0 max-sm:p-1 ${className}`}>
        {children}
        <Footer />
      </article>
    </main>
  )
}
