import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Vector3 } from 'three'

import { bgCanvasRootState, getDefaultCameraPosition } from '../state'

const useScrollEffect = (callback: (position: Vector3) => void) => {
  const enabled = bgCanvasRootState.cameraHandleBy === 'scroll'

  const { camera, viewport, controls } = useThree()

  const cameraMotionPosition = getDefaultCameraPosition()

  const tl = useRef<gsap.core.Timeline>()
  const scroll = useScroll()

  useLayoutEffect(() => {
    tl.current = gsap.timeline()

    tl.current
      .to(cameraMotionPosition, {
        x: viewport.width / 2,
        y: viewport.height / 5,
        duration: 3,
      })
      .to(
        cameraMotionPosition,
        {
          z: '+=6',
          duration: 1,
        },
        '<',
      )
      .to(cameraMotionPosition, {
        x: viewport.width / 4,
        y: viewport.height / 3,
        z: '+=2',
        duration: 2,
      })
      .to(cameraMotionPosition, {
        x: viewport.width / 3,
      })
      .to(cameraMotionPosition, {
        x: () => {
          return viewport.width / 20
        },
        y: 0,
        z: 12,
        duration: 3,
        delay: 3,
      })
      .pause()
  }, [viewport, cameraMotionPosition])

  useFrame(() => {
    if (enabled && tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration())

      callback(cameraMotionPosition)
    }
  })
}

export default useScrollEffect
