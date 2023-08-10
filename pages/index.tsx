import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { a, useSpring, useSprings } from '@react-spring/web'
import { PointerEvent, useEffect, useMemo, useRef } from 'react'

import { throttle } from 'lodash-es'
import { useSnapshot } from 'valtio'

import MetaInfo from '../components/meta-info'
import mouseSpringPos from '../store/mouseSpringPos'
import styles from '../styles/home.module.scss'

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
    [],
  )

  useEffect(() => {
    api.start((i) => {
      return {
        x: $mouseSpringPos.x,
        y: $mouseSpringPos.y,
        delay: i * 100,
      }
    })
  }, [$mouseSpringPos, api])

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
  const [props, move] = useSpring(() => ({ x: 0, y: 0 }), [])
  const onPointerMove = useRef(
    throttle((e: PointerEvent) => {
      move.start({
        x: e.clientX,
        y: e.clientY,
        config: { mass: 5, tension: 1000, friction: 60 },
        onChange() {
          mouseSpringPos.x = props.x.get()
          mouseSpringPos.y = props.y.get()
        },
      })
    }, 100),
  )
  return (
    <>
      <MetaInfo />
      <div className={styles.home} onPointerMove={onPointerMove.current}>
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
        <main>
          <section></section>
        </main>
      </div>
    </>
  )
}

export default Home
