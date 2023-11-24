import { a, useSpring } from '@react-spring/web'
import { useProgress } from '@react-three/drei'
import { FC, useEffect, useState } from 'react'

import styles from '../../styles/home.module.scss'
import { bgCanvasState } from './store/state'

type Props = {}
const LoadingScreen: FC<Props> = () => {
  const loadingState = useProgress()
  const [loaded, setLoaded] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) {
      bgCanvasState.loaded.ready = true
    }
  }, [done])

  const [progress] = useSpring(
    {
      from: {
        v: 0,
        o: 1,
      },
      to: async (next) => {
        await next({ v: 100 })
        if (loaded) {
          await next({
            o: 0,
          })
          setDone(true)
        }
      },

      config: loaded
        ? {
            mass: 1,
            tension: 270,
            friction: 40,
          }
        : {
            mass: 5,
            tension: 100,
            friction: 600,
          },
    },
    [loaded],
  )

  useEffect(() => {
    if (loadingState.loaded > 0 && loadingState.progress === 100) {
      setLoaded(true)
    }
  }, [loadingState.loaded, loadingState.progress])

  return (
    <>
      {!done && (
        <a.div className={styles.canvasLoading} style={{ opacity: progress.o }}>
          <a.span className="progress">
            {progress.v.to((v) => `${v.toFixed(0)} %`)}
          </a.span>
        </a.div>
      )}
    </>
  )
}

export default LoadingScreen
