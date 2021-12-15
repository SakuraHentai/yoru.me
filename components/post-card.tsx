import Link from 'next/link'
import styles from '../styles/blog.module.scss'
import type { PostType } from '../types'

type PostCardProps = {
  post: PostType
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { path, title, date, tags, summary } = post.meta

  return (
    <article className={styles.postCard}>
      <Link href={`/blog/${path}`}>
        <a>
          <h2 className="title">{title}</h2>
        </a>
      </Link>
      <time className="date" dateTime={date}>
        {date}
      </time>
      <ul className="tags">
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/blog/tag/${tag}`}>
              <a>#{tag}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p className="summary">{summary}</p>
    </article>
  )
}

export default PostCard
