import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'

import gsap from 'gsap'
import { Euler, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasState, timelineRange } from '../store/state'

const useAnimationEffect = (callback: (position: Vector3) => void) => {
  const { viewport } = useThree()

  const cameraMotionPosition = useRef(new Vector3(0))
  const $rootState = useSnapshot(bgCanvasState)

  const tl = useMemo<ReturnType<typeof gsap.timeline>>(() => {
    const endPosition = new Vector3(0, 0, 8)
    const endRotation = new Euler(0, Math.PI / 20, 0)

    endPosition.applyEuler(endRotation)

    return gsap
      .timeline({
        defaults: {
          ease: 'power2.inOut',
        },
      })
      .fromTo(
        cameraMotionPosition.current,
        {
          x: 0,
          y: 0,
          z: 10,
        },
        {
          x: 0,
          y: 0,
          z: 12,
          duration: 3,
        },
      )
      .to(cameraMotionPosition.current, {
        x: endPosition.x,
        y: 0,
        z: 12,
        duration: 1,
      })

      .to(cameraMotionPosition.current, {
        x: endPosition.x,
        y: endPosition.y,
        z: endPosition.z,
        duration: 1,
        delay: 1,
      })
      .pause()
  }, [])

  useEffect(() => {
    const percentage = timelineRange(0, 1)
    tl.seek(percentage * tl.duration())

    callback(cameraMotionPosition.current)
  }, [$rootState.timeline, tl])
}

export default useAnimationEffect
