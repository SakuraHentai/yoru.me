import rehypeShiki from '@shikijs/rehype'

import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['three'],
  images: {
    remotePatterns: [new URL('https://img.yoru.me/**')],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeShiki],
  },
})

export default withMDX(nextConfig)
