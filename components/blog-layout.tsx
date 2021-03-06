import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/blog.module.scss'
import avatar from '../assets/avatar.png'
import asideBg from '../assets/bg-aside.jpg'

const BlogLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <aside>
        <div className="inner">
          <div className="bg">
            <Image
              src={asideBg}
              alt="kizuna ai"
              loading="lazy"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.avatar}>
            <Image src={avatar} alt="Yoru.me" loading="lazy" />
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
