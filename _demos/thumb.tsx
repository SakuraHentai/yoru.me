/**
 * esbuild can't use type system, so need to use `ts-ignore`
 *
 */
// @ts-ignore
const Thumb = ({ src, alt, width, height, note }) => {
  const aspectRatio = `${width} / ${height}`
  return (
    <a className="thumb-anchor" href={src} target="_blank" rel="noreferrer">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        style={{
          width,
          aspectRatio,
        }}
      />
      {note ? <span className="note">{note}</span> : null}
    </a>
  )
}

export default Thumb
