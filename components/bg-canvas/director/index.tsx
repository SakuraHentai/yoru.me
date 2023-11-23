import { CameraControls } from '@react-three/drei/web'
import { useRef } from 'react'


import useAnimationEffect from './use-animation-effect'
import useBlendingEffect from './use-blending-effect'

const Director = () => {
  // camera handle by scroll by default
  const cameraControlRef = useRef<CameraControls>(null)

  useAnimationEffect((position) => {
    cameraControlRef.current?.setLookAt(...position.toArray(), 0, 0, 0)
  })
  useBlendingEffect((position, lookAt) => {
    cameraControlRef.current?.setLookAt(
      ...position.toArray(),
      ...lookAt.toArray(),
      true,
    )
  })

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
