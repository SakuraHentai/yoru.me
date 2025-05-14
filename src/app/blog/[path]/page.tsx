import { notFound } from 'next/navigation'

import type { FC } from 'react'

import avatar from '@/assets/avatar.png'
import MpShare from '@/components/mp-share'

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
      date: metadata.date,
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

const Page: FC<PageProps> = async (props) => {
  const { path } = await props.params
  console.log(path)

  try {
    const { default: Post, metadata } = await import(`@/posts/${path}.mdx`)

    return (
      <>
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
