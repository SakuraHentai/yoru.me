import { FC, useEffect, useMemo, useRef } from 'react'

import gsap from 'gsap'
import { Mesh, Texture, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { bgCanvasState, timelineRange } from '../store/state'
import SeasonBase from './base'

type Props = {
  map: Texture
}
const Haru: FC<Props> = ({ map }) => {
  const ref = useRef<Mesh>(null)
  const $rootState = useSnapshot(bgCanvasState)
  const viewport = useWindowViewport()
  const position = useRef(new Vector3(0))
  const portalRotation = useMemo(() => {
    return [0, 0, 0] as [number, number, number]
  }, [])

  useEffect(() => {
    bgCanvasState.ready = true
  }, [])

  const tl = useMemo<ReturnType<typeof gsap.timeline>>(() => {
    return (
      gsap
        .timeline({
          defaults: {
            ease: 'power2.inOut',
          },
        })
        .fromTo(
          position.current,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          {
            x: -viewport.width / 2,
            y: viewport.height / 2,
            z: -2,
            duration: 2,
          },
        )
        // to center
        .to(position.current, {
          x: -viewport.width / 2 + viewport.width / 4,
          y: viewport.height / 2 - viewport.height / 4,
          z: 0,
          duration: 1,
        })
        .pause()
    )
  }, [viewport.width, viewport.height])

  useEffect(() => {
    const percentage = timelineRange(0, 1 / 2)
    tl.seek(percentage * tl.duration())

    ref.current?.position.set(
      position.current.x,
      position.current.y,
      position.current.z,
    )
  }, [$rootState.timeline, tl])

  return (
    <SeasonBase
      name="haru"
      blending={$rootState.blend.name === 'haru'}
      texture={map}
      portalRotation={portalRotation}
      ref={ref}
    />
  )
}

export default Haru
