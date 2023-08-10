import { Canvas, useThree } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useEffect, useRef, useState } from 'react'
import { a, useSpring } from 'react-spring'
import styles from '../styles/home.module.scss'
import mouseSpringPos from 'store/mouseSpringPos'

const MoveEffect = () => {
  const { camera, viewport, size } = useThree()
  const $mouseSpringPos = useSnapshot(mouseSpringPos)
  const [scaleProps, api] = useSpring(() => {
    return {
      from: {
        v: 100,
      },
      to: {
        v: 10,
      },
    }
  }, [])
  const fstRun = useRef(true)

  useEffect(() => {
    if (fstRun.current) {
      // jump to screen
      api.start({
        onChange() {
          camera.position.set(0, 0, scaleProps.v.get())
          camera.lookAt(0, 0, 0)
        },
      })
    } else {
      // remap to scene coord.
      const coordX =
        ($mouseSpringPos.x / size.width) * viewport.width - viewport.width / 2
      const coordY =
        ($mouseSpringPos.y / size.height) * viewport.height -
        viewport.height / 2

      // set the camera
      camera.position.set(-coordX, coordY, 10)
      camera.lookAt(0, 0, 0)
    }
    fstRun.current = false
  }, [$mouseSpringPos])

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
        onCreated={() => setRendered(true)}
      >
        {rendered && <MoveEffect />}
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
      </Canvas>
    </>
  )
}
export default BgCanvas
