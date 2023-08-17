import { useSpring } from '@react-spring/web'
import { CameraControls, useHelper, useScroll } from '@react-three/drei/web'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { AxesHelper, Vector3 } from 'three'
import { useSnapshot } from 'valtio'

import {
  bgCanvasRootState,
  getDefaultCameraPosition,
  isBlending,
} from './state'

const Director = () => {
  const { camera, viewport, scene } = useThree()
  const scroll = useScroll()
  const cameraMotionPosition = getDefaultCameraPosition()
  const tl = useRef<gsap.core.Timeline>()

  const cameraControls = useRef<CameraControls>(null)
  const prevCameraPosition = useRef<Vector3>()

  const $rootState = useSnapshot(bgCanvasRootState)

  useLayoutEffect(() => {
    tl.current = gsap.timeline()
    console.log(`rerun camera`)

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
        x: (...args) => {
          return viewport.width / 10
        },
        y: 0,
        z: 12,
        duration: 3,
        delay: 3,
      })
      .to(cameraMotionPosition, {
        x: 0,
        y: 0,
        z: 10,
      })
      .pause()
  }, [viewport, cameraMotionPosition])

  useFrame(() => {
    if (tl.current) {
      if (!isBlending()) {
        tl.current.seek(scroll.offset * tl.current.duration())

        camera.position.set(
          cameraMotionPosition.x,
          cameraMotionPosition.y,
          cameraMotionPosition.z,
        )
        camera.lookAt(0, 0, 0)
      }
    }
  })

  useEffect(() => {
    console.log(`rerun effect`)
    if (isBlending()) {
      const targetSeason = scene.getObjectByName($rootState.blendName)

      if (targetSeason) {
        // save the camera position
        prevCameraPosition.current = camera.position.clone()

        const to = new Vector3()

        targetSeason.getWorldPosition(to)
        console.log($rootState.blendName)

        console.log(to)
        console.log(targetSeason.position)

        // animate the camera
        cameraControls.current?.setLookAt(
          ...[to.x, to.y, 0],
          ...to.toArray(),
          true,
        )
      }
    } else {
      if (prevCameraPosition.current) {
        // restore to previous camera position

        cameraControls.current?.setLookAt(
          ...prevCameraPosition.current.toArray(),
          ...[0, 0, 0],
          true,
        )
        setTimeout(() => {
          console.log(camera.position)
          console.log(prevCameraPosition.current)
          console.log(cameraControls.current?.camera.position)
        }, 1e3)
      }
    }
  }, [$rootState])

  // useHelper(camera as any, AxesHelper)

  console.log(`rerender `)
  return (
    <CameraControls
      ref={cameraControls}
      makeDefault={true}
      enabled={isBlending()}
      maxDistance={30}
      minPolarAngle={Math.PI / 2.3}
      maxPolarAngle={Math.PI / 1.7}
    />
  )
}

export default Director
