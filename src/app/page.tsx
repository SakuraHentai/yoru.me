'use client'

import BgCanvas from '@/components/bg-canvas'

import Link from 'next/link'

import styles from '../styles/home.module.scss'

const Home = () => {
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
