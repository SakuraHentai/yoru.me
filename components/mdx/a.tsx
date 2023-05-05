type Props = {} & HTMLAnchorElement

const Anchor: React.FC<Props> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default Anchor
