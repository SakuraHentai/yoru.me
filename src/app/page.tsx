'use client'

import Link from 'next/link'

import BgCanvas from '@/components/bg-canvas'

const Home = () => {
  return (
    <>
      <div className={''}>
        <BgCanvas />
        <header className="">
          <nav className="">
            <ul>
              <li>
                <Link href={'/blog'} title="去看看前端~">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={'https://github.com/sakurahentai'}
                  title="Github~"
                  target="_blank"
                >
                  Github
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Home
