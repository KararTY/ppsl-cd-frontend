export function Button ({ children, ...restProps }) {
  return (
    <button className="text-black dark:text-white" {...restProps}>
      {children}
    </button>
  )
}
