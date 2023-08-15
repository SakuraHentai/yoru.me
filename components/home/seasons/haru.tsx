import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh } from 'three'

import haru from '../../../assets/home/haru.jpg'
import SeasonBase from './base'

const Haru = () => {
  const ref = useRef<Mesh>(null)
  const scroll = useScroll()
  const { viewport } = useThree()
  const tl = useRef<ReturnType<typeof gsap.timeline>>()

  // create animation timeline
  useLayoutEffect(() => {
    tl.current = gsap.timeline()
    tl.current
      .to(ref.current?.position as object, {
        x: -viewport.width / 2,
        y: viewport.height / 2,
        z: 2,
        duration: 2,
      })
      // to center
      .to(ref.current?.position as object, {
        x: -viewport.width / 4,
        y: viewport.height / 4,
        z: 0,
        duration: 1.2,
      })
      .pause()
  }, [viewport])

  useFrame(() => {
    const inView = scroll.range(0 / 4, 1 / 2)
    if (tl.current && inView) {
      tl.current.seek(inView * tl.current.duration())
    }
  })
  return (
    <SeasonBase
      texture={haru.src}
      position={[0, 0, 4]}
      rotation={[0, Math.PI * -2.7, 0]}
      ref={ref}
    />
  )
}

export default Haru
