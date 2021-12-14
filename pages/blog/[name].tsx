import { NextPage, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import MetaInfo from '../../components/meta-info'
import BlogLayout from '../../components/blog-layout'
import Post from '../../components/post'
import { getPostByName, PostType } from '../../services/posts'

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

type SSRProps = {
  name: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps<PostProp, SSRProps> =
  async ({ params }) => {
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
