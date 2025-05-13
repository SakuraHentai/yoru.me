import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import BlogLayout from '../../../components/blog-layout'
import MetaInfo, { MetaProps } from '../../../components/meta-info'
import Pager from '../../../components/pager'
import PostCard from '../../../components/post-card'
import { getAllPosts } from '../../../services/posts'
import type { PagerType, PostType } from '../../../types'
import parseQueryPath from '../../../utils/parse-query-path'

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type SSGProps = {
  path?: []
} & ParsedUrlQuery

export const getStaticProps: GetStaticProps<PostsProps, SSGProps> = async ({
  params,
}) => {
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
