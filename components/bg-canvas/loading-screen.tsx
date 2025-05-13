'use client'

import { useProgress } from '@react-three/drei'
import { FC, useEffect, useState } from 'react'

import { motion, useSpring } from 'motion/react'

import styles from '../../styles/home.module.scss'

type Props = {}
const LoadingScreen: FC<Props> = () => {
  const loadingState = useProgress()
  const [done, setDone] = useState(false)

  const v = useSpring(0, {
    mass: 100,
    damping: 100,
    stiffness: 10,
  })
  const o = useSpring(100, {
    mass: 5,
    damping: 100,
    stiffness: 600,
  })

  useEffect(() => {
    if (loadingState.loaded > 0 && loadingState.progress === 100) {
      o.set(0)
      v.stop()
      o.on('animationComplete', () => {
        setDone(true)
      })
    }
  }, [loadingState.loaded, loadingState.progress, o, v])

  useEffect(() => {
    const unsubscribe = v.on('change', (v) => {
      console.log(v.toFixed(0))
    })

    v.set(100)

    return () => {
      unsubscribe()
    }
  }, [v])

  return (
    <>
      {!done && (
        <motion.div className={styles.canvasLoading} style={{ opacity: o }}>
          <motion.span className="progress">
            {`${v.get().toFixed(0)} %`}
          </motion.span>
        </motion.div>
      )}
    </>
  )
}

export default LoadingScreen
