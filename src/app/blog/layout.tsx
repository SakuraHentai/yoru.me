import Image from 'next/image'
import Link from 'next/link'

import type { FC, ReactNode } from 'react'

import avatar from '@/assets/avatar.png'
import asideBg from '@/assets/bg-aside.jpg'

const BlogLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className={''}>
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
            <div className={''}>
              <Image
                className="avatar-img"
                src={avatar}
                alt="Yoru.me"
                loading="lazy"
              />
            </div>
            <div className={''}>
              <h3 className={''}>
                <a
                  href="https://github.com/SakuraHentai"
                  target="_blank"
                  rel="noreferrer"
                >
                  Derek
                </a>
              </h3>
              <div className={''}>
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
              </div>
            </div>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </>
  )
}

export default BlogLayout
