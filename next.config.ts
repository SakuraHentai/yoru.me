import rehypeShiki from '@shikijs/rehype'

import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { bundledLanguages } from 'shiki'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['three'],
  images: {
    remotePatterns: [new URL('https://img.yoru.me/**')]
  }
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeShiki,
        {
          langs: Object.keys(bundledLanguages),
          theme: 'github-dark-default'
        }
      ]
    ]
  }
})

export default withMDX(nextConfig)
