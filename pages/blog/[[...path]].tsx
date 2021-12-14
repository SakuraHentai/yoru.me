import { NextPage, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import MetaInfo, { MetaProps } from '../../components/meta-info'
import BlogLayout from '../../components/blog-layout'
import { getAllPosts, PostType, PagerType } from '../../services/posts'
import parseQueryPath from '../../utils/parse-query-path'
import PostCard from '../../components/post-card'
import Pager from '../../components/pager'

type PostsProps = {
  posts: PostType[]
  pager: PagerType
}

const Blog: NextPage<PostsProps> = ({ posts, pager }) => {
  const meta: MetaProps = {
    title: 'Blog',
    keywords: 'yoru.me blog, posts about frontend',
    description: 'Posts about frontend development',
  }

  return (
    <>
      <MetaInfo meta={meta} />
      <BlogLayout>
        {posts && posts.map((post, i) => <PostCard key={i} post={post} />)}
        {pager && <Pager pager={pager} />}
      </BlogLayout>
    </>
  )
}

type SSRProps = {
  path?: []
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps<PostsProps, SSRProps> =
  async ({ params }) => {
    const pathParams = parseQueryPath(params?.path)

    const { posts, pager } = await getAllPosts(pathParams.tag, pathParams.page)

    if (!posts.length) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        posts,
        pager,
      },
    }
  }

export default Blog
