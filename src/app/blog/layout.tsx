import Image from 'next/image'
import Link from 'next/link'

import type { FC, ReactNode } from 'react'

import avatar from '@/assets/avatar.png'
import asideBg from '@/assets/bg-aside.jpg'

const BlogLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="mx-auto flex max-w-[1200px]">
        <aside className="w-[30vw] max-w-80">
          <div className="sticky top-0 h-dvh py-[8vw]">
            <div className="absolute inset-0 -z-10">
              <Image
                className="absolute inset-0 size-full object-cover"
                src={asideBg}
                alt="kizuna ai"
                loading="lazy"
              />
            </div>
            <div className="relative mx-auto size-[20vw] max-h-[180px] max-w-[180px] overflow-hidden rounded-full border-[3px] border-[#92737b]">
              <Image
                className="absolute inset-0 size-full object-cover"
                src={avatar}
                alt="Yoru.me"
                loading="lazy"
              />
            </div>
            <div className="mx-auto flex w-1/2 flex-col">
              <h3 className="my-8 text-[2em] font-bold text-white text-shadow-[2px_2px_3px_#555]">
                <a
                  className="transition-colors duration-300"
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
