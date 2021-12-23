/**
 * esbuild can't use type system, so need to use `ts-ignore`
 *
 */
// @ts-ignore
const ExternalLink = ({ href, children }) => {
  return (
    <a href={href} target="_blank">
      {children}
    </a>
  )
}

export default ExternalLink
