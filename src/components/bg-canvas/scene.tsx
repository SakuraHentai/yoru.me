import { invalidate, useFrame } from '@react-three/fiber'
import { lazy, useEffect } from 'react'

import { useShallow } from 'zustand/shallow'

import { useSeasonTextures } from './hooks/use-season-textures'
import { useWindowViewport } from './hooks/use-window-viewport'
import { useBgCanvasStore } from './store'

// import Natsu from './seasons/natsu'
const Haru = lazy(() => import('./seasons/haru'))
const Natsu = lazy(() => import('./seasons/natsu'))
const Aki = lazy(() => import('./seasons/aki'))
const Fuyu = lazy(() => import('./seasons/fuyu'))
const Director = lazy(() => import('./director'))

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
  const textures = useSeasonTextures()

  return (
    <>
      <Haru map={textures.haru} />
      <Natsu map={textures.natsu} />
      <Aki map={textures.aki} />
      <Fuyu map={textures.fuyu} />
      <Director />
      {/* <axesHelper args={[5]} /> */}
      <Timeline />
      <FixNavigateBack />
    </>
  )
}

export default Scene
