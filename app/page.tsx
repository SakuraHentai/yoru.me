'use client'

import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import styles from '../styles/home.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingColumn}>
        <div className={styles.loadingBall}></div>
        <div className={styles.loadingBallShadow}></div>
      </div>
      <div className={styles.loadingColumn}>
        <div className={styles.loadingBall}></div>
        <div className={styles.loadingBallShadow}></div>
      </div>
      <div className={styles.loadingColumn}>
        <div className={styles.loadingBall}></div>
        <div className={styles.loadingBallShadow}></div>
      </div>
    </div>
  )
}

const BgCanvas = dynamic(() => import('../components/bg-canvas'), {
  loading: Loading,
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.home}>
        <BgCanvas />
        <header className={styles.header}>
          <nav className={styles.nav}>
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
