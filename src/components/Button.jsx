export function Button ({ children, className = '', ...restProps }) {
  return (
    <button className={`m-0 ${className}`} {...restProps}>
      {children}
    </button>
  )
}
