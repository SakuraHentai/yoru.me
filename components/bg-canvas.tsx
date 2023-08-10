import { Canvas, useThree } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useEffect, useRef, useState } from 'react'
import { a, useSpring, useSpringValue } from 'react-spring'
import styles from '../styles/home.module.scss'
import mouseSpringPos from 'store/mouseSpringPos'

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
    [camera, size, viewport]
  )

  useEffect(() => {
    smoothMove.start({
      x: $mouseSpringPos.x,
      y: $mouseSpringPos.y,
    })
  }, [$mouseSpringPos, viewport, size])

  return null
}

const BgCanvas = () => {
  const [rendered, setRendered] = useState(false)

  return (
    <>
      <Canvas
        className={styles.bgCanvas}
        camera={{
          position: [0, 0, 10],
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
