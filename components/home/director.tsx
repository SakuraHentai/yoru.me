import { useHelper, useScroll } from '@react-three/drei/web'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { AxesHelper } from 'three'

const Director = () => {
  const { camera, viewport } = useThree()
  const scroll = useScroll()
  const tl = useRef<gsap.core.Timeline>()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()

    tl.current.to(camera.position, {
      x: 10,
      y: 8,
      z: 26,
      duration: 2,
    })
  }, [])

  useFrame(() => {
    if (tl.current) {
      // tl.current.seek(scroll.offset * tl.current.duration())
      camera.position.set(10, 10, 56)
      camera.lookAt(0, 0, 0)
    }
  })

  // useHelper(camera as any, AxesHelper)

  return null
}

export default Director
