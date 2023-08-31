import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Euler, Mesh, Vector3 } from 'three'

import natsu from '../../../assets/home/natsu.jpg'
import { isBlending } from '../state'
import SeasonBase from './base'

const Natsu = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline>()

  const position = useRef(new Vector3(0, -viewport.height / 2, 20))
  const rotation = useRef(new Euler(0, 0, 0))

  useLayoutEffect(() => {
    // reset position & rotation for stable motion
    position.current.x = 0
    position.current.y = -viewport.height / 2
    position.current.z = 20
    rotation.current.x = 0
    rotation.current.y = 0
    rotation.current.z = 0

    tl.current = gsap.timeline()
    tl.current
      .to(position.current, {
        y: viewport.height / 2,
        z: 3,
        duration: 2,
      })
      .to(
        rotation.current,
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
          x: viewport.width / 4,
          y: viewport.height / 4,
          z: 0,
          duration: 0.8,
        },
        '>',
      )
      .pause()
  }, [viewport])

  useFrame(() => {
    const inView = scroll.range(1 / 10, 1 / 2)
    if (tl.current && inView && !isBlending()) {
      tl.current.seek(inView * tl.current.duration())
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
    }
  })

  return (
    <SeasonBase
      name="natsu"
      texture={natsu.src}
      position={position.current}
      rotation={[0, Math.PI * -2.8, 0]}
      ref={ref}
    />
  )
}

export default Natsu
