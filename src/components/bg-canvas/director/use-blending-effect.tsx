import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import { Vector3 } from 'three'

import { useBgCanvasStore } from '../store'

const useBlendingEffect = (
  callback: (position: Vector3, lookAt: Vector3) => void
) => {
  const { camera, scene } = useThree()
  const prevCameraPosition = useRef(camera.position.clone())

  useEffect(() => {
    return useBgCanvasStore.subscribe(
      (state) => state.blend.name,
      (blendName) => {
        const position = new Vector3()
        const lookAt = new Vector3()

        // get the season position.
        scene.getObjectByName(blendName)?.getWorldPosition(position)

        if (blendName !== '') {
          prevCameraPosition.current.copy(camera.position)
          lookAt.set(position.x, position.y, -2)
        } else {
          position.copy(prevCameraPosition.current)
          lookAt.set(0, 0, 0)
        }
        callback(position, lookAt)
      }
    )
  }, [callback, camera.position, scene])
}

export default useBlendingEffect
