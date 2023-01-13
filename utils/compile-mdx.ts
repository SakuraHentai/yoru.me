import { readFile, stat } from 'fs/promises'
import { bundleMDX } from 'mdx-bundler'
import { BundleMDX } from 'mdx-bundler/dist/types'
import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'
import { join } from 'path'
import rehypeHighlight from 'rehype-highlight'
import type { PostMetaType } from '../types'

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

const extractDemosFromImport = async (
  fileContent: string
): Promise<string[]> => {
  const demos: string[] = []
  const importRegex = /^import\s+[^\s]+\s+from\s+'(?<name>[^']+)'$/
  const codeScopeToken = `\`\`\``

  const rl = createInterface({
    input: Readable.from(Buffer.from(fileContent)),
  })

  let inCodeScope = false

  for await (const line of rl) {
    // skip code scope, in ``` token
    if (line.startsWith(codeScopeToken)) {
      inCodeScope = !inCodeScope
      continue
    }

    if (!inCodeScope) {
      const match = importRegex.exec(line)
      if (match) {
        const importName = match.groups!.name
        const importPath = join(demosDirectory, `${importName}.tsx`)
        // check demo exist avoid invalid import from demo source code
        const demoExist = await stat(importPath).then((stat) => stat.isFile())

        if (demoExist) {
          demos.push(importName)
        }
      }
    }
  }

  return demos
}

export const compileMDX = async (mdxContent: string) => {
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

  // prepare demos
  const demos = await extractDemosFromImport(mdxContent)
  if (demos.length) {
    compileOptions.files = {}
    for (const demo of demos) {
      compileOptions.files[demo] = await readFile(
        join(demosDirectory, `${demo}.tsx`),
        'utf8'
      )
    }
  }

  const mdx = await bundleMDX(compileOptions)

  return mdx.code
}
