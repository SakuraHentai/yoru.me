import dynamic from 'next/dynamic'

import { invalidate, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import aki from '@/assets/home/aki.webp'
import haru from '@/assets/home/haru.webp'
import huyu from '@/assets/home/huyu.webp'
import natsu from '@/assets/home/natsu.webp'

import { wrap } from 'comlink'
import useSWRImmutable from 'swr/immutable'
import { Texture } from 'three'
import { useShallow } from 'zustand/shallow'

import { useWindowViewport } from './hooks/use-window-viewport'
import { useBgCanvasStore } from './store'
import { convertToSRGB } from './utils/convert-to-srgb'

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

const worker = new Worker(new URL('./worker.ts', import.meta.url))

const Scene = () => {
  const comlink = useRef(
    wrap<{
      load(url: string): Promise<ImageBitmap>
    }>(worker)
  )
  const { data: map } = useSWRImmutable('test', async () => {
    const maps = await Promise.all([
      comlink.current.load(haru.src),
      comlink.current.load(natsu.src),
      comlink.current.load(aki.src),
      comlink.current.load(huyu.src)
    ])

    const textures = maps.map((img) => {
      const texture = new Texture(img)
      return convertToSRGB(texture)
    })

    console.log(textures)

    return {
      haru: textures[0],
      natsu: textures[1],
      aki: textures[2],
      huyu: textures[3]
    }
  })
  const [setReady] = useBgCanvasStore(useShallow((state) => [state.setReady]))

  useEffect(() => {
    if (map) {
      setReady(true)
    }
  }, [setReady, map])

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
