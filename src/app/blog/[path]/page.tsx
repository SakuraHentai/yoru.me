import { notFound } from 'next/navigation'
import type { FC } from 'react'

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
    return {}
  }
}

const Page: FC<PageProps> = async (props) => {
  const { path } = await props.params
  console.log(path)

  try {
    const { default: Post } = await import(`@/posts/${path}.mdx`)

    return (
      <div className="prose max-w-none">
        <Post />
      </div>
    )
  } catch {
    notFound()
  }
}

export default Page
