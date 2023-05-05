import Image from 'next/image'

type Props = {
  note: string
} & HTMLImageElement

const Img: React.FC<Props> = ({ src, alt, width, height, note }) => {
  const aspectRatio = `${width} / ${height}`
  return (
    <a className="thumb-anchor" href={src} target="_blank" rel="noreferrer">
      <Image
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

export default Img
