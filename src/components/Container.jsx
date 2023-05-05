import { Footer } from './Footer'

export function Container ({ className = '', children }) {
  return (
    <main className="container">
      <article className={`m-0 px-0 max-sm:pt-0 ${className}`}>
        {children}
        <Footer />
      </article>
    </main>
  )
}
