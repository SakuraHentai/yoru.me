import MDXPlugin from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    domains: ['yoru.me'],
  },
}

const withMDX = MDXPlugin({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)
