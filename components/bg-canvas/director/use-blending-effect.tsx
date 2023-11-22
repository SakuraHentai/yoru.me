import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import { Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasRootState, isBlending } from '../state'

const useBlendingEffect = (
  callback: (position: Vector3, lookAt: Vector3) => void,
) => {
  useSnapshot(bgCanvasRootState)

  const { camera, viewport, scene } = useThree()
  const prevCameraPosition = useRef(new Vector3(0, 0, 0))

  useEffect(() => {
    const position = new Vector3()
    const lookAt = new Vector3()

    // get the season position.
    scene
      .getObjectByName(bgCanvasRootState.blendName)
      ?.getWorldPosition(position)!

    if (isBlending()) {
      prevCameraPosition.current.copy(camera.position)
      lookAt.set(position.x, position.y, -2)
    } else {
      position.copy(prevCameraPosition.current)
      lookAt.set(0, 0, 0)
    }
    callback(position, lookAt)
  }, [isBlending(), viewport])
}

export default useBlendingEffect
