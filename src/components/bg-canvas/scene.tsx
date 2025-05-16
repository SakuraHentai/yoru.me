import dynamic from 'next/dynamic'

import { invalidate, useFrame } from '@react-three/fiber'
import { useEffect } from 'react'

import { useShallow } from 'zustand/shallow'

import { useWindowViewport } from './hooks/use-window-viewport'
import { useBgCanvasStore } from './store'

// import Natsu from './seasons/natsu'
const Haru = dynamic(() => import('./seasons/haru'), {
  ssr: false
})
const Natsu = dynamic(() => import('./seasons/natsu'), {
  ssr: false
})
const Aki = dynamic(() => import('./seasons/aki'), {
  ssr: false
})
const Huyu = dynamic(() => import('./seasons/huyu'), {
  ssr: false
})
const Director = dynamic(() => import('./director'), {
  ssr: false
})

const Timeline = () => {
  const [ready, advanceTimeline] = useBgCanvasStore(
    useShallow((state) => [state.loaded.ready, state.advanceTimeline])
  )
  const viewport = useWindowViewport()

  useFrame(() => {
    if (!ready) {
      return
    }

    advanceTimeline(invalidate)
  })

  useEffect(() => {
    if (!ready) {
      return
    }

    advanceTimeline(invalidate, true)
  }, [ready, viewport, advanceTimeline])

  return null
}

const FixNavigateBack = () => {
  const [resetTimeline] = useBgCanvasStore(
    useShallow((state) => [state.resetTimeline])
  )

  // replay animation when enter page.
  useEffect(() => {
    resetTimeline()
  }, [resetTimeline])

  return null
}
const Scene = () => {
  return (
    <>
      <Haru />
      <Natsu />
      <Aki />
      <Huyu />
      <Director />
      {/* <axesHelper args={[5]} /> */}
      <Timeline />
      <FixNavigateBack />
    </>
  )
}

export default Scene
