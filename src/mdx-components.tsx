import { Fira_Code } from 'next/font/google'
import Image from 'next/image'

import type { MDXComponents } from 'mdx/types'

import { cn } from './utils'

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})
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
      const url = new URL(src.replaceAll('&amp;', '&'), 'https://img.yoru.me')
      const params = url.searchParams

      const width = params.get('width')
      const height = params.get('height')
      const note = params.get('note') || null

      if (!width || !height) {
        throw new Error(
          'Image width and height are required, set them in URL query, e.g. ?width=100&height=100'
        )
      }

      const aspectRatio = `${width} / ${height}`
      const urlWithoutQuery = `${url.origin}${url.pathname}`

      return (
        <a
          className="text-center block no-underline"
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
              aspectRatio
            }}
            className="h-auto mx-auto mt-0 mb-2"
          />
          {note ? <span className="text-sm text-gray-500">{note}</span> : null}
        </a>
      )
    },
    code: ({ children }) => {
      const cls = cn([
        firaCode.className,
        'inline-flex border border-amber-100 px-1 rounded-sm text-gray-500 bg-amber-50 after:hidden before:hidden',
        `group-[.code]:block group-[.code]:bg-transparent group-[.code]:border-0 group-[.code]:rounded-none group-[.code]:p-0`
      ])
      return <code className={cls}>{children}</code>
    },
    pre: ({ children }) => {
      return <pre className="bg-gray-800 rounded-lg group code">{children}</pre>
    }
  }
}
