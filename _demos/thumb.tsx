/**
 * esbuild can't use type system, so need to use `ts-ignore`
 *
 */
// @ts-ignore
const Thumb = ({ src, alt }) => {
  return <img src={src} alt={alt} referrerPolicy="no-referrer" />
}

export default Thumb
