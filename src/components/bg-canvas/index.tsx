'use client'

import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { useShallow } from 'zustand/shallow'

import LoadingScreen from './loading-screen'
import { useBgCanvasStore } from './store'

const Animation = dynamic(
  () => import('./animation').then((mod) => mod.Animation),
  {
    ssr: false
  }
)

const CloseBlend = () => {
  const [showClose, setShowClose] = useState(false)
  const [blendName, setBlendName] = useBgCanvasStore(
    useShallow((state) => [state.blend.name, state.setBlendName])
  )

  useEffect(() => {
    setShowClose(blendName !== '')
  }, [blendName])

  return (
    <AnimatePresence>
      {showClose && (
        <motion.div
          className={
            'fixed top-4 left-4 size-12 cursor-pointer text-[rgba(22,101,52,.8)]'
          }
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => {
            setBlendName('')
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="size-full"
          >
            <path
              fill="currentColor"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const BgCanvas = () => {
  return (
    <div className="relative size-full">
      <Animation />
      <CloseBlend />
      <LoadingScreen />
    </div>
  )
}

export default BgCanvas
