import { invalidate } from '@react-three/fiber'
import { lazy, useEffect } from 'react'

import { useShallow } from 'zustand/shallow'

import { useSeasonTextures } from './hooks/use-season-textures'
import { useWindowViewport } from './hooks/use-window-viewport'
import { advanceTimeline, resetTimeline, useBgCanvasStore } from './store'

// import Natsu from './seasons/natsu'
const Haru = lazy(() => import('./seasons/haru'))
const Natsu = lazy(() => import('./seasons/natsu'))
const Aki = lazy(() => import('./seasons/aki'))
const Fuyu = lazy(() => import('./seasons/fuyu'))
const Director = lazy(() => import('./director'))

const Timeline = () => {
  const [ready] = useBgCanvasStore(useShallow((state) => [state.loaded.ready]))
  useEffect(() => {
    if (!ready) {
      return
    }
    const handle = advanceTimeline()
    invalidate()

    return () => {
      if (handle) {
        cancelAnimationFrame(handle)
      }
    }
  }, [ready])

  return null
}
const FixResizeRender = () => {
  const viewport = useWindowViewport()

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const elapsed = useBgCanvasStore.getState().clock.elapsed

      useBgCanvasStore.getState().setElapsed(elapsed + 0.000001)
    })
    return () => {
      cancelAnimationFrame(handle)
    }
  }, [viewport.width, viewport.height])

  return null
}

const FixNavigateBack = () => {
  // replay animation when enter page.
  useEffect(() => {
    resetTimeline()
  }, [])

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
      <FixResizeRender />
      <FixNavigateBack />
    </>
  )
}

export default Scene
