import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { a, useSpring, useSprings } from '@react-spring/web'
import { PointerEvent, useEffect, useMemo, useRef } from 'react'

import { throttle } from 'lodash-es'

import MetaInfo from '../components/meta-info'
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

const BgCanvas = dynamic(() => import('../components/home/bg-canvas'), {
  loading: Loading,
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <MetaInfo />
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
