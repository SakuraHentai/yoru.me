import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import { Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasState, isBlending } from '../store/state'

const useBlendingEffect = (
  callback: (position: Vector3, lookAt: Vector3) => void,
) => {
  const $rootState = useSnapshot(bgCanvasState)

  const { camera, scene } = useThree()
  const prevCameraPosition = useRef(camera.position.clone())

  useEffect(() => {
    const position = new Vector3()
    const lookAt = new Vector3()

    // get the season position.
    scene.getObjectByName($rootState.blend.name)?.getWorldPosition(position)!

    if (isBlending()) {
      prevCameraPosition.current.copy(camera.position)
      lookAt.set(position.x, position.y, -2)
    } else {
      position.copy(prevCameraPosition.current)
      lookAt.set(0, 0, 0)
    }
    callback(position, lookAt)
  }, [$rootState.blend.name, callback, camera.position, scene])
}

export default useBlendingEffect
