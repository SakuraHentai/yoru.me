import { a, useSpring } from '@react-spring/web'
import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

import styles from '../../styles/home.module.scss'

const LoadingScreen = () => {
  const loadingState = useProgress()
  const [loaded, setLoaded] = useState(false)
  const [done, setDone] = useState(false)

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
            config: {
              mass: 1,
              tension: 160,
              friction: 30,
            },
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
  }, [loadingState])

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
