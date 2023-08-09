import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import avatar from '../assets/avatar.png'
import asideBg from '../assets/bg-aside.jpg'
import styles from '../styles/blog.module.scss'

const BlogLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <aside>
        <div className="inner">
          <div className="bg">
            <Image
              className="bg-img"
              src={asideBg}
              alt="kizuna ai"
              loading="lazy"
            />
          </div>
          <div className={styles.avatar}>
            <Image
              className="avatar-img"
              src={avatar}
              alt="Yoru.me"
              loading="lazy"
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.author}>
              <a
                href="https://github.com/SakuraHentai"
                target="_blank"
                rel="noreferrer"
              >
                Derek
              </a>
            </h3>
            <div className={styles.pages}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  )
}

export default BlogLayout
