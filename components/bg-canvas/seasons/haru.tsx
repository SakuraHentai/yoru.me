import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh, Vector3 } from 'three'

import haru from '../../../assets/home/haru.jpg'
import { isBlending } from '../state'
import SeasonBase from './base'

const Haru = () => {
  const ref = useRef<Mesh>(null)
  const scroll = useScroll()
  const { viewport } = useThree()
  const tl = useRef<ReturnType<typeof gsap.timeline>>()

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

  useFrame(() => {
    const inView = scroll.range(0 / 4, 1 / 2)
    if (tl.current && inView && !isBlending()) {
      tl.current.seek(inView * tl.current.duration())
      ref.current?.position.set(
        position.current.x,
        position.current.y,
        position.current.z,
      )
    }
  })

  return (
    <SeasonBase
      name="Haru"
      texture={haru.src}
      position={position.current}
      rotation={[0, Math.PI * -2.7, 0]}
      ref={ref}
    />
  )
}

export default Haru
