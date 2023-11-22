import { useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasRootState, getDefaultCameraPosition } from '../state'

const useAnimationEffect = (callback: (position: Vector3) => void) => {
  const { viewport } = useThree()

  const cameraMotionPosition = getDefaultCameraPosition()
  const $rootState = useSnapshot(bgCanvasRootState)

  const tl = useRef<gsap.core.Timeline>()

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

  useEffect(() => {
    if (tl.current) {
      tl.current.seek($rootState.timeline * tl.current.duration())

      callback(cameraMotionPosition)
    }
  }, [$rootState.timeline])
}

export default useAnimationEffect
