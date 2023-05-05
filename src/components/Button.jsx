export function Button ({ children, className = '', ...restProps }) {
  return (
    <button
      type={restProps.type || 'button'}
      className={`m-0 w-[unset] ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}
