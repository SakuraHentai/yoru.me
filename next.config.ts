import MDXPlugin from '@next/mdx'
import type { NextConfig } from 'next'

import rehypeHighlight from 'rehype-highlight'

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['three'],
  images: {
    domains: ['img.yoru.me'],
  },
} satisfies NextConfig

const withMDX = MDXPlugin({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)
