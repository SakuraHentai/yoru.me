import { useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import haru from '../../../assets/home/haru.jpg'
import { bgCanvasRootState, isBlending, timelineRange } from '../state'
import SeasonBase from './base'

const Haru = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const tl = useRef<ReturnType<typeof gsap.timeline>>()
  const $rootState = useSnapshot(bgCanvasRootState)

  const position = useRef(new Vector3(0, 0, 4))

  // create animation timeline
  useLayoutEffect(() => {
    // reset position & rotation for stable motion
    position.current.x = 0
    position.current.y = 0
    position.current.z = 4

    tl.current = gsap.timeline()
    tl.current
      .to(position.current, {
        x: -viewport.width / 2,
        y: viewport.height / 2,
        z: 2,
        duration: 2,
      })
      // to center
      .to(position.current, {
        x: -viewport.width / 4,
        y: viewport.height / 4,
        z: 0,
        duration: 1.2,
      })
      .pause()
  }, [viewport])

  useEffect(() => {
    const inView = timelineRange(0 / 4, 1 / 2)
    if (tl.current && inView && !isBlending()) {
      tl.current.seek(inView * tl.current.duration())
      ref.current?.position.set(
        position.current.x,
        position.current.y,
        position.current.z,
      )
    }
  }, [$rootState.timeline])

  return (
    <SeasonBase
      name="haru"
      texture={haru.src}
      position={position.current}
      rotation={[0, Math.PI * -2.7, 0]}
      ref={ref}
    />
  )
}

export default Haru
