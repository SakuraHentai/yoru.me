import type { NextPage } from 'next'
import MetaInfo from '../components/meta-info'
import Game from '../components/game'
import Link from 'next/link'

import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <MetaInfo />
      <Game />
      <Link href="/blog">
        <a className={styles.blogEntry} title="去看看前端~">
          BLOG
        </a>
      </Link>
    </>
  )
}

export default Home
