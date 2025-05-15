'use client'

import { useProgress } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/utils'

import { animate, motion, useMotionValue } from 'motion/react'
import { match } from 'ts-pattern'
import { useShallow } from 'zustand/shallow'

import { useBgCanvasStore } from './store'

const LoadingScreen = () => {
  const loadingState = useProgress()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [setReady] = useBgCanvasStore(useShallow((state) => [state.setReady]))

  const v = useMotionValue(0)

  const o = useMotionValue(1)

  useEffect(() => {
    const animation = match(
      loadingState.loaded > 0 && loadingState.progress === 100
    )
      .with(true, () => {
        // Done
        return animate(v, 100, {
          ease: 'easeOut',
          duration: 1.5,
          onUpdate(v) {
            setProgress(Math.floor(v))
          },
          onComplete() {
            setReady(true)
            animate(o, 0, {
              duration: 0.5,
              ease: [0, 0.76, 0.82, 1],
              delay: 0.1,
              onComplete() {
                setDone(true)
              }
            })
          }
        })
      })
      .otherwise(() => {
        // Loading
        return animate(v, 100, {
          ease: [0, 0.95, 0.45, 1],
          duration: 60,
          onUpdate(v) {
            setProgress(Math.floor(v))
          }
        })
      })

    return () => {
      animation.stop()
    }
  }, [v, o, loadingState.progress, loadingState.loaded, setReady])

  const cls = useMemo(() => {
    return cn([
      'fixed inset-0 flex items-center justify-center',
      'text-6xl text-white bg-[#ffe500]',
      'pointer-events-none',
      'font-[Preahvihear,Tahoma,sans-serif]',
      'z-50'
    ])
  }, [])

  return (
    <>
      {!done && (
        <motion.div
          className={cls}
          style={
            {
              // opacity: o
            }
          }
        >
          <motion.span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom, #fff ${v.get()}%, transparent 100%)`,
              opacity: o
            }}
          >{`${progress} %`}</motion.span>
        </motion.div>
      )}
    </>
  )
}

export default LoadingScreen
