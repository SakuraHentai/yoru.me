import { getMDXComponent } from 'mdx-bundler/client'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from '../styles/blog.module.scss'
import type { PostType } from '../types'

type PostProps = {
  post: PostType
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { meta, code } = post
  const { date, tags } = meta
  const Component = useMemo(() => getMDXComponent(code!), [code])

  return (
    <article className={styles.post}>
      <h1>{meta.title}</h1>
      <section className="content">
        <Component />
      </section>
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
  )
}

export default Post
