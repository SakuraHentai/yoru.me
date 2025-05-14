'use client'

import { Preahvihear } from 'next/font/google'
import Link from 'next/link'

import { useMemo } from 'react'

import BgCanvas from '@/components/bg-canvas'
import { cn } from '@/utils'

const pFont = Preahvihear({
  weight: '400',
  subsets: ['latin'],
})

const Home = () => {
  const anchorCls = useMemo(() => {
    return cn([
      'rounded-[32px] text-white',
      'py-2 w-24 block text-center',
      'font-[Preahvihear,_sans-serif]',
      'bg-[rgba(92,101,22,.3)]',
      pFont.className,
    ])
  }, [])

  return (
    <>
      <div className="h-dvh bg-[#ffe500]">
        <BgCanvas />
        <header className="fixed right-8 top-4">
          <nav className="h-16 py-2 px-8 bg-[rgba(22,101,52,.5)] rounded-[64px] flex items-center">
            <ul className="flex items-center gap-4">
              <li>
                <Link href={'/blog'} title="去看看前端~" className={anchorCls}>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={'https://github.com/sakurahentai'}
                  title="Github~"
                  target="_blank"
                  className={anchorCls}
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
