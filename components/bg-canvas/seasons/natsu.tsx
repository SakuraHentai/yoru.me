import { useThree } from '@react-three/fiber'
import { FC, useEffect, useMemo, useRef } from 'react'

import gsap from 'gsap'
import { Euler, Mesh, Texture, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasState, timelineRange } from '../store/state'
import SeasonBase from './base'

type Props = {
  map: Texture
}
const Natsu: FC<Props> = ({ map }) => {
  const ref = useRef<Mesh>(null)
  const $rootState = useSnapshot(bgCanvasState)
  const { viewport } = useThree()
  const position = useRef(new Vector3(0))
  const rotation = useRef(new Euler(0))
  const portalRotation = useMemo(() => {
    return new Euler(0, 0, 0)
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
            y: -viewport.height / 2,
            z: 10,
          },
          {
            y: viewport.height / 2,
            z: 3,
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
            y: Math.PI,
            duration: 2,
          },
          '<0.1',
        )
        .to(
          position.current,
          {
            x: viewport.width / 2,
            duration: 2,
          },
          '<1',
        )
        // to center
        .to(
          position.current,
          {
            x: viewport.width / 2 - viewport.width / 4,
            y: viewport.height / 2 - viewport.height / 4,
            z: 0,
            duration: 0.8,
          },
          '>',
        )
        .pause()
    )
  }, [viewport.width, viewport.height])

  useEffect(() => {
    const percentage = timelineRange(1 / 10, 1 / 2)
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
      name="natsu"
      blending={$rootState.blend.name === 'natsu'}
      texture={map}
      portalRotation={portalRotation}
      ref={ref}
    />
  )
}

export default Natsu
