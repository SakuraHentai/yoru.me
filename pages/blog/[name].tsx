import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import BlogLayout from '../../components/blog-layout'
import MetaInfo from '../../components/meta-info'
import Post from '../../components/post'
import { getPostByName } from '../../services/posts'
import type { PostType } from '../../types'

type PostProp = {
  post: PostType
}

const PostPage: NextPage<PostProp> = ({ post }) => {
  const meta = post.meta
  return (
    <>
      <MetaInfo meta={meta} />
      <BlogLayout>
        <Post post={post} />
      </BlogLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type SSGProps = {
  name: string
} & ParsedUrlQuery

export const getStaticProps: GetStaticProps<PostProp, SSGProps> = async ({
  params,
}) => {
  try {
    if (!params?.name) {
      throw new Error('post name is required')
    }

    const post = await getPostByName(params.name, true)

    return {
      props: {
        post,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}

export default PostPage
