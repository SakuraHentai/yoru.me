import { FC, useEffect, useMemo, useRef } from 'react'

import gsap from 'gsap'
import { Euler, Mesh, Texture, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { bgCanvasState, timelineRange } from '../store/state'
import SeasonBase from './base'

type Props = {
  map: Texture
}
const Fuyu: FC<Props> = ({ map }) => {
  const ref = useRef<Mesh>(null)
  const $rootState = useSnapshot(bgCanvasState)
  const viewport = useWindowViewport()
  const position = useRef(new Vector3(0))
  const rotation = useRef(new Euler(0))
  const portalRotation = useMemo(() => {
    return new Euler(0, 0, 0)
  }, [])

  const tl = useMemo<ReturnType<typeof gsap.timeline>>(() => {
    return (
      gsap
        .timeline()
        .fromTo(
          position.current,
          {
            x: viewport.width / 2,
            y: -viewport.height / 1.3,
            z: 10,
          },
          {
            x: viewport.width / 4,
            y: viewport.height / 2,
            z: 8,
            duration: 2,
          },
        )
        .fromTo(
          rotation.current,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          {
            x: Math.PI * 2,
            y: 0,
            z: 0,
            duration: 2,
          },
        )
        // to center
        .to(
          position.current,
          {
            x: viewport.width / 2 - viewport.width / 4,
            y: -viewport.height / 2 + viewport.height / 4,
            z: 0,
            duration: 1.4,
          },
          '<',
        )
        .pause()
    )
  }, [viewport.width, viewport.height])

  useEffect(() => {
    const percentage = timelineRange(1 / 4, 1 / 2)
    tl.seek(percentage * tl.duration())

    ref.current?.position.set(
      position.current.x,
      position.current.y,
      position.current.z,
    )
    ref.current?.rotation.set(
      rotation.current.x,
      rotation.current.y,
      rotation.current.z,
    )
  }, [$rootState.timeline, tl])

  return (
    <SeasonBase
      name="fuyu"
      blending={$rootState.blend.name === 'fuyu'}
      texture={map}
      portalRotation={portalRotation}
      ref={ref}
    />
  )
}

export default Fuyu
