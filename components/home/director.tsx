import { useHelper, useScroll } from '@react-three/drei/web'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { AxesHelper } from 'three'

const Director = () => {
  const { camera, viewport } = useThree()
  const scroll = useScroll()
  const cameraPos = useRef(camera.position.clone())
  const tl = useRef<gsap.core.Timeline>()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()

    tl.current
      .to(
        cameraPos.current,
        {
          x: viewport.width / 2,
          y: viewport.height / 5,
          duration: 3,
        },
        0,
      )
      .to(
        cameraPos.current,
        {
          z: 16,
          duration: 1,
        },
        0,
      )
      .to(
        cameraPos.current,
        {
          x: viewport.width / 4,
          duration: 1,
        },
        3,
      )
      .to(
        cameraPos.current,
        {
          y: viewport.height / 3,
          duration: 2,
        },
        4,
      )
  }, [viewport])

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())
      camera.position.set(
        cameraPos.current.x,
        cameraPos.current.y,
        cameraPos.current.z,
      )
      camera.lookAt(0, 0, 0)
    }
  })

  // useHelper(camera as any, AxesHelper)

  return null
}

export default Director
