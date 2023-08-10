import { MDXProvider } from '@mdx-js/react'
import mdxComponents from 'components/mdx'
import Link from 'next/link'
import styles from '../styles/blog.module.scss'
import type { PostMetaType } from '../types'
import BlogLayout from './blog-layout'
import MetaInfo from './meta-info'
import { ReactNode } from 'react'

const PostPage: React.FC<{ meta: PostMetaType; children: ReactNode }> = ({
  meta,
  children,
}) => {
  const { date, tags } = meta
  return (
    <>
      <MetaInfo meta={meta} />
      <BlogLayout>
        <article className={styles.post}>
          <h1>{meta.title}</h1>
          {/* @ts-expect-error */}
          <MDXProvider components={mdxComponents}>
            <section className="content">{children}</section>
          </MDXProvider>
          <time className="date" dateTime={date}>
            {date}
          </time>
          <ul className="tags">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog/tag/${tag}`}>#{tag}</Link>
              </li>
            ))}
          </ul>
        </article>
      </BlogLayout>
    </>
  )
}
export default PostPage
