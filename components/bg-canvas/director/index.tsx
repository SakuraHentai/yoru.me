import { OrbitControls } from '@react-three/drei/web'
import { useEffect, useRef } from 'react'

import { Leva, useControls } from 'leva'
import { useSnapshot } from 'valtio'

import { bgCanvasRootState, isBlending } from '../state'
import useScrollEffect from './use-scroll-effect'
import useBlendingEffect from './useBlendingEffect'

const Director = () => {
  // camera handle by scroll by default
  const $rootState = useSnapshot(bgCanvasRootState)

  useScrollEffect()
  const enabledBlend = useBlendingEffect()

  useEffect(() => {
    if (isBlending()) {
      bgCanvasRootState.cameraHandleBy = 'blending'
    }
  }, [$rootState])

  return (
    <>
      <OrbitControls
        makeDefault={true}
        enabled={enabledBlend}
        // maxDistance={30}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 1.7}
      />
      <Leva />
    </>
  )
}

export default Director
