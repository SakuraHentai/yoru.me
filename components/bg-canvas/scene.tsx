import { invalidate, useThree } from '@react-three/fiber'
import { lazy, useEffect } from 'react'

import { useSnapshot } from 'valtio'

import { useSeasonTextures } from './hooks/use-season-textures'
import { advanceTimeline, bgCanvasState } from './store/state'

// import Natsu from './seasons/natsu'
const Haru = lazy(() => import('./seasons/haru'))
const Natsu = lazy(() => import('./seasons/natsu'))
const Aki = lazy(() => import('./seasons/aki'))
const Fuyu = lazy(() => import('./seasons/fuyu'))
const Director = lazy(() => import('./director'))

const Timeline = () => {
  const $rootState = useSnapshot(bgCanvasState)
  useEffect(() => {
    if (!$rootState.ready) {
      return
    }
    const handle = advanceTimeline()
    return () => {
      handle && cancelAnimationFrame(handle)
    }
  }, [$rootState.timeline, $rootState.ready])

  return null
}
const FixResizeRender = () => {
  const { viewport } = useThree()

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      invalidate()
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
    bgCanvasState.timeline = 0
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
