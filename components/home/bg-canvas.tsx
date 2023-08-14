import { Canvas } from '@react-three/fiber'

import styles from '../../styles/home.module.scss'
import LoadingScreen from './loading-screen'
import Scene from './scene'

const BgCanvas = () => {
  return (
    <>
      <Canvas
        className={styles.bgCanvas}
        flat
        camera={{
          position: [0, 0, 10],
        }}
      >
        <Scene />
      </Canvas>
      <LoadingScreen />
    </>
  )
}

export default BgCanvas
