import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh, Vector3 } from 'three'

import aki from '../../../assets/home/aki.jpg'
import { isBlending } from '../state'
import SeasonBase from './base'

const Aki = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline>()

  const position = useRef(new Vector3(0, viewport.height / 1.6, 20))

  useLayoutEffect(() => {
    // reset position for stable motion
    position.current.x = 0
    position.current.y = viewport.height / 1.6
    position.current.z = 20

    tl.current = gsap.timeline()
    tl.current
      .to(position.current, {
        y: -viewport.height / 2,
        z: 5,
        duration: 2,
      })
      .to(
        position.current,
        {
          x: viewport.width / 2,
          duration: 1,
        },
        '<0.2',
      )
      .to(
        position.current,
        {
          x: -viewport.width / 2,
          duration: 1,
        },
        '>',
      )
      // to center
      .to(
        position.current,
        {
          x: -viewport.width / 4,
          y: -viewport.height / 4,
          z: 0,
          duration: 0.6,
        },
        '>',
      )
      .pause()
  }, [viewport])

  useFrame(() => {
    const inView = scroll.range(1 / 5, 1 / 2)
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
      name="aki"
      texture={aki.src}
      position={position.current}
      rotation={[0, Math.PI * -1.95, 0]}
      ref={ref}
    />
  )
}

export default Aki
