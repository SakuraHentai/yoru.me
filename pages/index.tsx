import type { NextPage } from 'next'
import Link from 'next/link'
import Game from '../components/game'
import MetaInfo from '../components/meta-info'

import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <MetaInfo />
      <Game />
      <Link href="/blog" className={styles.blogEntry} title="去看看前端~">
        BLOG
      </Link>
    </>
  )
}

export default Home
