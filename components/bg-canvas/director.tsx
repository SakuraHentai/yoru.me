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
      .to(cameraPos.current, {
        x: viewport.width / 2,
        y: viewport.height / 5,
        duration: 3,
      })
      .to(
        cameraPos.current,
        {
          z: '+=6',
          duration: 1,
        },
        '<',
      )
      .to(cameraPos.current, {
        x: viewport.width / 4,
        y: viewport.height / 3,
        z: '+=2',
        duration: 2,
      })
      .to(cameraPos.current, {
        x: viewport.width / 3,
      })
      .to(cameraPos.current, {
        x: (...args) => {
          return viewport.width / 10
        },
        y: 0,
        z: 12,
        duration: 3,
        delay: 3,
      })
      .pause()
  }, [viewport])

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())
      camera.position.set(
        cameraPos.current.x,
        cameraPos.current.y,
        cameraPos.current.z,
      )

      // camera.position.set(10, 10, 30)
      camera.lookAt(0, 0, 0)
    }
  })

  // useHelper(camera as any, AxesHelper)

  return null
}

export default Director
