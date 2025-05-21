import { Fira_Code } from 'next/font/google'

import type { MDXComponents } from 'mdx/types'

import { ImagePreview } from './components/image-preview'
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
      return <ImagePreview src={src} alt={alt} />
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
      return <pre className="group code rounded-lg bg-gray-800">{children}</pre>
    }
  }
}
