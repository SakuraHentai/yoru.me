import { useSpring } from '@react-spring/web'
import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { RefObject, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasRootState, isBlending } from '../state'

const useBlendingEffect = () => {
  const enabled = bgCanvasRootState.cameraHandleBy === 'blending'
  useSnapshot(bgCanvasRootState)

  const { camera, viewport, scene } = useThree()
  const prevCameraPosition = useRef(new Vector3(0, 0, 0))
  const cameraPosition = useRef(new Vector3(0, 0, 0))

  useEffect(() => {
    if (!enabled) return

    const position = new Vector3()
    const lookAt = new Vector3()
    const targetPosition = scene
      .getObjectByName(bgCanvasRootState.blendName)
      ?.getWorldPosition(position)!

    if (isBlending() && targetPosition) {
      prevCameraPosition.current.copy(camera.position)
      cameraPosition.current.copy(camera.position)
      position.set(camera.position.x, camera.position.y, camera.position.z - 5)
      lookAt.set(targetPosition.x, targetPosition.y, targetPosition.z)
    } else {
      position.copy(prevCameraPosition.current)
      lookAt.set(0, 0, 0)
    }

    // console.log(`Transition To: `, position.toArray(), lookAt.toArray())
    console.log(`Blending State`, JSON.stringify(bgCanvasRootState))

    console.log(JSON.stringify(camera.position.toArray()))
    console.log(JSON.stringify(viewport))

    // run the animation
    const tl = gsap.timeline()

    tl.to(cameraPosition.current, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1,
      onUpdate() {
        console.log(`position updated -> `, cameraPosition.current.toArray())
        console.log(`viewport updated -> `, JSON.stringify(viewport))
        camera.lookAt(0, 0, 0)
        camera.position.set(
          cameraPosition.current.x,
          cameraPosition.current.y,
          cameraPosition.current.z,
        )
        camera.updateProjectionMatrix()
        // camera.lookAt(...lookAt.toArray())
        scene.updateMatrix()
      },
      onComplete() {
        console.log(JSON.stringify(camera.position.toArray()))
        console.log(JSON.stringify(cameraPosition.current.toArray()))
        if (enabled && !isBlending()) {
          console.log(`switch to scroll`)
          // pass back the handler to scroll
          bgCanvasRootState.cameraHandleBy = 'scroll'
        }
      },
    })
  }, [enabled, isBlending(), viewport])

  return enabled
}

export default useBlendingEffect
