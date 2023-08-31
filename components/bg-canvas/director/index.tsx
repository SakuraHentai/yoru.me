import { CameraControls } from '@react-three/drei/web'
import { useEffect, useRef } from 'react'

import { useSnapshot } from 'valtio'

import { bgCanvasRootState, isBlending } from '../state'
import useScrollEffect from './use-scroll-effect'
import useBlendingEffect from './useBlendingEffect'

const Director = () => {
  // camera handle by scroll by default
  const $rootState = useSnapshot(bgCanvasRootState)
  const cameraControlRef = useRef<CameraControls>(null)

  useScrollEffect((position) => {
    cameraControlRef.current?.setLookAt(...position.toArray(), 0, 0, 0)
  })
  useBlendingEffect((position, lookAt, resetToScroll) => {
    cameraControlRef.current
      ?.setLookAt(...position.toArray(), ...lookAt.toArray(), true)
      .then(() => {
        if (resetToScroll) {
          bgCanvasRootState.cameraHandleBy = 'scroll'
        }
      })
  })

  useEffect(() => {
    if (isBlending()) {
      bgCanvasRootState.cameraHandleBy = 'blending'
      if (cameraControlRef.current) {
        cameraControlRef.current.mouseButtons.left = 1 // rotate
        cameraControlRef.current.touches.one = 32 // rotate
      }
    } else {
      if (cameraControlRef.current) {
        // ref: https://github.com/yomotsu/camera-controls#user-input-config
        // disable mouse wheel
        cameraControlRef.current.mouseButtons.wheel = 0
        cameraControlRef.current.mouseButtons.left = 0
        cameraControlRef.current.touches.one = 0
        cameraControlRef.current.touches.two = 0
        cameraControlRef.current.touches.three = 0
      }
    }
  }, [$rootState])

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
