import { notFound } from 'next/navigation'

import type { FC } from 'react'

import avatar from '@/assets/avatar.png'
import MpShare from '@/components/mp-share'

import { globby } from 'globby'
import { basename } from 'node:path'

export const generateStaticParams = async () => {
  const posts = await globby('src/posts/*.mdx')
  return posts.map((post) => {
    return {
      path: basename(post, '.mdx')
    }
  })
}

type PageProps = {
  params: Promise<{
    path: string
  }>
}
export const generateMetadata = async (props: PageProps) => {
  const { path } = await props.params

  try {
    const { metadata } = await import(`@/posts/${path}.mdx`)

    return {
      title: metadata.title,
      description: metadata.description,
      date: metadata.date
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

const Page: FC<PageProps> = async (props) => {
  const { path } = await props.params

  try {
    const { default: Post, metadata } = await import(`@/posts/${path}.mdx`)

    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
        />
        <div className="prose max-w-none">
          <Post />
        </div>
        <MpShare
          title={metadata.title}
          desc={metadata.description}
          imgURL={avatar.src}
        />
      </>
    )
  } catch {
    notFound()
  }
}

export default Page
