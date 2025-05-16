import dynamic from 'next/dynamic'

import { invalidate, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'

import aki from '@/assets/home/aki.webp'
import haru from '@/assets/home/haru.webp'
import huyu from '@/assets/home/huyu.webp'
import natsu from '@/assets/home/natsu.webp'

import { wrap } from 'comlink'
import useSWRImmutable from 'swr/immutable'
import { SRGBColorSpace, Texture } from 'three'
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

  useLayoutEffect(() => {
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

const loaderWorker = new Worker(new URL('./loader.ts', import.meta.url))

const Scene = () => {
  const gl = useThree((state) => state.gl)
  const loader = useRef(
    wrap<{
      load(url: string): Promise<ImageBitmap>
    }>(loaderWorker)
  )
  const { data: map } = useSWRImmutable('test', async () => {
    const maps = await Promise.all([
      loader.current.load(haru.src),
      loader.current.load(natsu.src),
      loader.current.load(aki.src),
      loader.current.load(huyu.src)
    ])

    const textures = maps.map((map) => {
      const texture = new Texture(map)

      // Important for ImageBitmap
      // texture.flipY = false
      texture.colorSpace = SRGBColorSpace
      texture.needsUpdate = true

      // Preload
      gl.initTexture(texture)
      map.close()

      return texture
    })

    return {
      haru: textures[0],
      natsu: textures[1],
      aki: textures[2],
      huyu: textures[3]
    }
  })
  const [setResourcesLoaded] = useBgCanvasStore(
    useShallow((state) => [state.setResourcesLoaded])
  )

  useEffect(() => {
    if (map) {
      setResourcesLoaded(true)
    }
  }, [setResourcesLoaded, map])

  return (
    <>
      {map && (
        <>
          <Haru src={map.haru} />
          <Natsu src={map.natsu} />
          <Aki src={map.aki} />
          <Huyu src={map.huyu} />
        </>
      )}
      <Director />
      {/* <axesHelper args={[5]} /> */}
      <Timeline />
      <FixNavigateBack />
    </>
  )
}

export default Scene
