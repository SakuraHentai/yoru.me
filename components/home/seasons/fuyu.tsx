import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh } from 'three'

import fuyu from '../../../assets/home/fuyu.jpg'
import SeasonBase from './base'

const Fuyu = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline>()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()
    tl.current
      .to(ref.current?.position as object, {
        x: viewport.width / 4,
        y: viewport.height / 2,
        z: 16,
        duration: 2,
      })
      .to(ref.current?.position as object, {
        y: -viewport.height / 2,
        z: 3,
        duration: 1,
      })
      .to(ref.current?.rotation as object, {
        x: Math.PI * 2,
        duration: 1,
      })
      // to center
      .to(
        ref.current?.position as object,
        {
          x: viewport.width / 4,
          y: -viewport.height / 4,
          z: 0,
          duration: 1.4,
        },
        '>',
      )
      .pause()
  }, [viewport])

  useFrame(() => {
    const inView = scroll.range(1 / 4, 1 / 2)
    if (tl.current && inView) {
      tl.current.seek(inView * tl.current.duration())
    }
  })

  return (
    <SeasonBase
      texture={fuyu.src}
      position={[viewport.width / 2, -viewport.height / 1.3, 10]}
      rotation={[0, Math.PI * -1.8, 0]}
      ref={ref}
    />
  )
}

export default Fuyu
