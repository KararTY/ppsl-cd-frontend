export function Button ({ children, className = '', ...restProps }) {
  return (
    <button className={`m-0 w-[unset] ${className}`} {...restProps}>
      {children}
    </button>
  )
}
