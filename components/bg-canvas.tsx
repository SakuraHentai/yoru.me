import { useSpring } from '@react-spring/web'
import { Center, Text3D } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useState } from 'react'

import mouseSpringPos from 'store/mouseSpringPos'
import { useSnapshot } from 'valtio'

import styles from '../styles/home.module.scss'

const MoveEffect = () => {
  const { camera, viewport, size } = useThree()
  const $mouseSpringPos = useSnapshot(mouseSpringPos)
  const [smoothMoveProps, smoothMove] = useSpring(
    {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      onChange() {
        // remap to scene coord.
        const coordX =
          (smoothMoveProps.x.get() / size.width) * viewport.width -
          viewport.width / 2
        const coordY =
          (smoothMoveProps.y.get() / size.height) * viewport.height -
          viewport.height / 2

        // set the camera
        camera.position.set(-coordX, coordY, smoothMoveProps.z.get())
        camera.lookAt(0, 0, 0)
      },
    },
    [camera, size, viewport],
  )

  useFrame(() => {
    smoothMove.start({
      x: $mouseSpringPos.x,
      y: $mouseSpringPos.y,
    })
  })
  return null
}

const BgCanvas = () => {
  const [rendered, setRendered] = useState(false)
  const isMobile = useMemo(() => {
    return window.innerWidth < 768
  }, [window.innerWidth])

  return (
    <>
      <Canvas
        className={styles.bgCanvas}
        camera={{
          position: [0, 0, isMobile ? 20 : 10],
        }}
        onCreated={() => {
          setRendered(true)
        }}
      >
        {rendered && (
          <>
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
          </>
        )}
      </Canvas>
    </>
  )
}
export default BgCanvas
