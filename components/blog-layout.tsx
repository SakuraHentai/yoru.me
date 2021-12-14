import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/blog.module.scss'
import avatar from '../assets/avatar.png'

const BlogLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <aside>
        <div className="inner">
          <div className={styles.avatar}>
            <Image src={avatar} alt="Yoru.me" />
          </div>
          <h3 className={styles.author}>
            <a
              href="https://github.com/SakuraHentai/yoru.me"
              target="_blank"
              rel="noreferrer"
            >
              Derek
            </a>
          </h3>
          <div className={styles.pages}>
            <Link href="/">
              <a>Game</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </div>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  )
}

export default BlogLayout
