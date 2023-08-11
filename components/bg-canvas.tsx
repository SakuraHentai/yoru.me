import { useSpring } from '@react-spring/web'
import { Center, Text3D } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'

import styles from '../styles/home.module.scss'

const MoveEffect = () => {
  const { camera, mouse, viewport, size } = useThree()
  const isMobile = useMemo(() => {
    return window.innerWidth < 768
  }, [window.innerWidth])
  const [smoothMoveProps, smoothMove] = useSpring(
    {
      x: camera.position.x,
      y: camera.position.y,
      z: 100,
    },
    [camera, size, viewport],
  )

  useFrame(() => {
    // set the camera
    camera.position.set(
      smoothMoveProps.x.get(),
      smoothMoveProps.y.get(),
      smoothMoveProps.z.get(),
    )
    camera.lookAt(0, 0, 0)
  })

  useFrame(() => {
    smoothMove.start({
      x: -(mouse.x * viewport.width) / 2,
      y: -(mouse.y * viewport.height) / 2,
      z: isMobile ? 20 : 10,
    })
  })

  return null
}

const BgCanvas = () => {
  return (
    <>
      <Canvas className={styles.bgCanvas}>
        <Suspense fallback={null}>
          <MoveEffect />
          <Center rotation={[-0.3, 0.2, 0]}>
            <Text3D
              curveSegments={32}
              bevelEnabled
              bevelSize={0.03}
              bevelThickness={0.1}
              height={0.5}
              lineHeight={0.8}
              size={1.5}
              font="/Preahvihear_Regular.json"
            >
              {`HELLO\nI'm Derek`}
              <meshNormalMaterial />
            </Text3D>
          </Center>
        </Suspense>
      </Canvas>
    </>
  )
}
export default BgCanvas
