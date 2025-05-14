import Image from 'next/image'

import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props) => {
      const { href, children, ...rest } = props
      return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      )
    },
    img: ({ src, alt }) => {
      const url = new URL(src, 'https://img.yoru.me')
      const params = url.searchParams

      const width = params.get('width')
      const height = params.get('height')
      const note = params.get('note') || null

      if (!width || !height) {
        throw new Error(
          'Image width and height are required, set them in URL query, e.g. ?width=100&height=100',
        )
      }

      const aspectRatio = `${width} / ${height}`
      const urlWithoutQuery = `${url.origin}${url.pathname}`

      return (
        <a
          className="thumb-anchor"
          href={urlWithoutQuery}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={urlWithoutQuery}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            width={parseFloat(width)}
            height={parseFloat(height)}
            style={{
              aspectRatio,
            }}
            className="h-auto mt-0"
          />
          {note ? <span className="note">{note}</span> : null}
        </a>
      )
    },
  }
}
