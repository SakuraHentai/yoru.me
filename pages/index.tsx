import type { NextPage } from 'next'
import Link from 'next/link'
import MetaInfo from '../components/meta-info'

import styles from '../styles/home.module.scss'
import {
  PointerEvent,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { throttle } from 'lodash-es'
import mouseSpringPos from 'store/mouseSpringPos'
import { useSnapshot } from 'valtio'
import { a, useSpring, useSprings } from 'react-spring'
import dynamic from 'next/dynamic'

const Loading = () => {
  const $mouseSpringPos = useSnapshot(mouseSpringPos)
  const loadingText = useMemo(() => {
    return 'Loading...'.split('')
  }, [])

  const [chars, api] = useSprings(
    loadingText.length,
    (i) => ({
      x: 10,
      y: 10,
    }),
    []
  )

  useEffect(() => {
    api.start((i) => {
      return {
        x: $mouseSpringPos.x,
        y: $mouseSpringPos.y,
        delay: i * 100,
      }
    })
  }, [$mouseSpringPos])

  return (
    <a.div className={styles.loading}>
      {chars.map((prop, i) => (
        <a.span key={i} style={prop}>
          {loadingText[i]}
        </a.span>
      ))}
    </a.div>
  )
}

const BgCanvas = dynamic(() => import('../components/bg-canvas'), {
  loading: Loading,
  ssr: false,
})

const Home: NextPage = () => {
  const [props, api] = useSpring(() => ({ x: 0, y: 0 }), [])
  const onPointerMove = useCallback(
    throttle((e: PointerEvent) => {
      api.start({
        x: e.clientX,
        y: e.clientY,
        config: { mass: 5, tension: 1000, friction: 60 },
        onChange() {
          mouseSpringPos.x = props.x.get()
          mouseSpringPos.y = props.y.get()
        },
      })
    }, 100),
    []
  )
  return (
    <>
      <MetaInfo />
      <div className={styles.home} onPointerMove={onPointerMove}>
        <BgCanvas />
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href={'/blog'}>Blog</Link>
              </li>
              <li>
                <Link href={'https://github.com/sakurahentai'}>Github</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section></section>
        </main>
      </div>
    </>
  )
}

export default Home
