import { join } from 'path'
import { readFile } from 'fs/promises'
import { bundleMDX } from 'mdx-bundler'
import { BundleMDX } from 'mdx-bundler/dist/types'
import { PostMetaType } from '../services/posts'
import rehypeHighlight from 'rehype-highlight'

// ref: https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe'
  )
} else {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild'
  )
}

const demosDirectory = join(process.cwd(), '_demos')

export const compileMDX = async (mdxContent: string, meta: PostMetaType) => {
  const compileOptions: BundleMDX<PostMetaType> = {
    source: mdxContent,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
      ]

      return options
    },
  }
  if (Array.isArray(meta.demos)) {
    compileOptions.files = {}
    for (const demo of meta.demos) {
      compileOptions.files![demo] = await readFile(
        join(demosDirectory, `${demo}.tsx`),
        'utf8'
      )
    }
  }
  const mdx = await bundleMDX(compileOptions)

  return mdx.code
}
