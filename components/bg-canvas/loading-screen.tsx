'use client'

import { useProgress } from '@react-three/drei'
import { FC, useEffect, useState } from 'react'

import { animate, motion, useMotionValue } from 'motion/react'
import { match } from 'ts-pattern'

import styles from '../../styles/home.module.scss'

type Props = {}
const LoadingScreen: FC<Props> = () => {
  const loadingState = useProgress()
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  const v = useMotionValue(0)

  const o = useMotionValue(1)

  useEffect(() => {
    const animation = match(
      loadingState.loaded > 0 && loadingState.progress === 100,
    )
      .with(true, () => {
        // Done
        return animate(v, 100, {
          ease: 'easeOut',
          duration: 1.2,
          onUpdate(v) {
            setProgress(Math.floor(v))
          },
          onComplete() {
            animate(o, 0, {
              duration: 0.5,
              onComplete() {
                setDone(true)
              },
            })
          },
        })
      })
      .otherwise(() => {
        // Loading
        return animate(v, 100, {
          ease: [0, 0.95, 0.45, 0.99],
          duration: 60,
          onUpdate(v) {
            setProgress(Math.floor(v))
          },
          onComplete() {
            console.log(`done`)
          },
        })
      })

    return () => {
      animation.stop()
    }
  }, [v, o, loadingState.progress, loadingState.loaded])

  return (
    <>
      {!done && (
        <motion.div className={styles.canvasLoading} style={{ opacity: o }}>
          <span className="progress">{`${progress} %`}</span>
        </motion.div>
      )}
    </>
  )
}

export default LoadingScreen
