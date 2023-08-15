import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh } from 'three'

import aki from '../../../assets/home/aki.jpg'
import SeasonBase from './base'

const Aki = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline>()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()
    tl.current
      .to(ref.current?.position as object, {
        y: -viewport.height / 2,
        z: 5,
        duration: 2,
      })
      .to(
        ref.current?.position as object,
        {
          x: viewport.width / 2,
          duration: 1,
        },
        '<0.2',
      )
      .to(ref.current?.position as object, {
        x: -viewport.width / 2,
        duration: 1,
      })
      // to center
      .to(
        ref.current?.position as object,
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
    if (tl.current && inView) {
      tl.current.seek(inView * tl.current.duration())
    }
  })

  return (
    <SeasonBase
      texture={aki.src}
      position={[0, viewport.height / 1.6, 20]}
      rotation={[0, Math.PI * -1.95, 0]}
      ref={ref}
    />
  )
}

export default Aki
