import Image from 'next/image'

type Props = {
  note: string
} & HTMLImageElement

const Img: React.FC<Props> = ({ src, alt, width, height, note }) => {
  const aspectRatio = `${width} / ${height}`
  const fullUrl = `https://img.yoru.me${src}`
  return (
    <a className="thumb-anchor" href={fullUrl} target="_blank" rel="noreferrer">
      <Image
        src={fullUrl}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        width={width}
        height={height}
        style={{
          height: 'auto',
          aspectRatio,
        }}
      />
      {note ? <span className="note">{note}</span> : null}
    </a>
  )
}

export default Img
