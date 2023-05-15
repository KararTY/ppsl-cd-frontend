import { Footer } from './Footer'
import { Header } from './Header'

export function Container ({ className = '', header = {}, children }) {
  return (
    <>
      <div className="sticky top-0 border-b-slate-950 border-opacity-25 bg-white p-2 leading-none shadow-lg dark:border-b dark:bg-[#11191f]">
        <nav className="container">
          <Header {...header} className="w-full" />
        </nav>
      </div>
      <main className="container !pt-0">
        <article className={`m-0 px-0 pt-0 ${className} rounded-t-none`}>
          {children}
          <Footer />
        </article>
      </main>
    </>
  )
}
