import { Canvas } from '@react-three/fiber'

import { useSnapshot } from 'valtio'

import styles from '../../styles/home.module.scss'
import LoadingScreen from './loading-screen'
import Scene from './scene'
import { bgCanvasRootState, isBlending, setBlendName } from './state'

const BgCanvas = () => {
  useSnapshot(bgCanvasRootState)

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
      {isBlending() && (
        <div
          className={styles.closeBlend}
          onClick={() => {
            setBlendName('')
          }}
        >
          ???
        </div>
      )}
    </>
  )
}

export default BgCanvas
