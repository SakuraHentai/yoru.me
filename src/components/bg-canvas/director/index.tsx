import { CameraControls } from '@react-three/drei/web'
import { useCallback, useRef } from 'react'

import { Vector3 } from 'three'

import useAnimationEffect from './use-animation-effect'
import useBlendingEffect from './use-blending-effect'

const Director = () => {
  // camera handle by scroll by default
  const cameraControlRef = useRef<CameraControls>(null)
  const onAnimation = useCallback((position: Vector3) => {
    cameraControlRef.current?.setLookAt(...position.toArray(), 0, 0, 0)
  }, [])
  const onBlending = useCallback((position: Vector3, lookAt: Vector3) => {
    cameraControlRef.current?.setLookAt(
      ...position.toArray(),
      ...lookAt.toArray(),
      true
    )
  }, [])

  // blending will lost prev camera position
  // it cause render error after go back action.
  // so it needs update blending first, then animation
  useBlendingEffect(onBlending)

  useAnimationEffect(onAnimation)

  return (
    <>
      <CameraControls
        ref={cameraControlRef}
        makeDefault
        // enabled={enabledBlend}
        // maxDistance={30}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  )
}

export default Director
