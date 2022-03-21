/**
 * esbuild can't use type system, so need to use `ts-ignore`
 *
 */
// @ts-ignore
const Thumb = ({ src, alt, width, height }) => {
  const aspectRatio = `${width} / ${height}`
  return (
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
  )
}

export default Thumb
