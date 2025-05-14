import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Game = dynamic(() => import('../components/game/entry'), {})

export const generateMetadata = async () => {
  return {
    title: 'You found many rabbits!',
  }
}

const Page404: NextPage = () => {
  return (
    <>
      <Game />
      <div className="">
        <Link href="/blog" title="去看看前端~">
          BLOG
        </Link>
        <span className="">/</span>
        <Link
          href="https://github.com/sakurahentai"
          title="Github~"
          target="_blank"
        >
          GITHUB
        </Link>
      </div>
    </>
  )
}

export default Page404
