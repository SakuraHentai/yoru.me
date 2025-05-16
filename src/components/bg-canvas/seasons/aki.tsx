import { useTexture } from '@react-three/drei'
import { FC, useEffect, useMemo, useRef } from 'react'

import aki from '@/assets/home/aki.webp'

import gsap from 'gsap'
import { Euler, Mesh, Vector3 } from 'three'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { useBgCanvasStore } from '../store'
import { convertToSRGB } from '../utils/convert-to-srgb'
import SeasonBase from './base'

type Props = {}
const Aki: FC<Props> = ({}) => {
  const map = useTexture(aki.src, convertToSRGB)
  const ref = useRef<Mesh>(null)
  const viewport = useWindowViewport()
  const position = useRef(new Vector3(0))
  const portalRotation = useMemo(() => {
    return new Euler(0)
  }, [])

  const tl = useMemo<ReturnType<typeof gsap.timeline>>(() => {
    return (
      gsap
        .timeline()
        .fromTo(
          position.current,
          {
            x: 0,
            y: viewport.height / 1.6,
            z: 20
          },
          {
            y: -viewport.height / 2,
            z: 5,
            duration: 2
          }
        )
        .to(
          position.current,
          {
            x: viewport.width / 2,
            duration: 1
          },
          '<0.2'
        )
        .to(
          position.current,
          {
            x: -viewport.width / 2,
            duration: 1
          },
          '>'
        )
        // to center
        .to(
          position.current,
          {
            x: -viewport.width / 2 + viewport.width / 4,
            y: -viewport.height / 2 + viewport.height / 4,
            z: 0,
            duration: 0.6
          },
          '>'
        )
        .pause()
    )
  }, [viewport.width, viewport.height])

  useEffect(() => {
    return useBgCanvasStore.subscribe(
      (state) => state.clock.elapsed,
      () => {
        const percentage = useBgCanvasStore
          .getState()
          .timelineRange(1 / 5, 1 / 2)
        tl.seek(percentage * tl.duration())

        ref.current?.position.set(
          position.current.x,
          position.current.y,
          position.current.z
        )
      }
    )
  }, [tl])

  return (
    <SeasonBase
      name="aki"
      texture={map}
      portalRotation={portalRotation}
      ref={ref}
    />
  )
}

export default Aki
