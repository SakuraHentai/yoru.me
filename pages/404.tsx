import type { NextPage } from 'next'
import Link from 'next/link'
import Game from '../components/game'
import MetaInfo from '../components/meta-info'

import styles from '../styles/page404.module.scss'

const Page404: NextPage = () => {
  return (
    <>
      <MetaInfo
        meta={{
          title: '404',
        }}
      />
      <Game />
      <div className={styles.entries}>
        <Link href="/blog" title="去看看前端~">
          BLOG
        </Link>
        <span className={styles.sep}>/</span>
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
