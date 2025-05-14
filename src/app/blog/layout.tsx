import Image from 'next/image'
import Link from 'next/link'

import type { FC, ReactNode } from 'react'

import avatar from '@/assets/avatar.png'
import asideBg from '@/assets/bg-aside.jpg'

const BlogLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.min.css"
        integrity="sha512-MbysAYimH1hH2xYzkkMHB6MqxBqfP0megxsCLknbYqHVwXTCg9IqHbk+ZP/vnhO8UEW6PaXAkKe2vQ+SWACxxA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="">
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
