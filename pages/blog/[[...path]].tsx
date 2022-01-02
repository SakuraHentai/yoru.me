import type { NextPage, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import MetaInfo, { MetaProps } from '../../components/meta-info'
import BlogLayout from '../../components/blog-layout'
import { getAllPosts } from '../../services/posts'
import parseQueryPath from '../../utils/parse-query-path'
import PostCard from '../../components/post-card'
import Pager from '../../components/pager'
import type { PagerType, PostType } from '../../types'

type PostsProps = {
  posts: PostType[]
  pager: PagerType
  tag: string
}

const Blog: NextPage<PostsProps> = ({ tag, posts, pager }) => {
  const meta: MetaProps = {
    title: tag ? `${tag} 相关` : 'Blog',
    keywords: 'yoru.me blog, posts about frontend, yoru前端小知识',
    description: '一些关于前端的文字',
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

    const tag = pathParams.tag || ''
    const { posts, pager } = await getAllPosts(tag, pathParams.page)

    if (!posts.length) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        tag,
        posts,
        pager,
      },
    }
  }

export default Blog
