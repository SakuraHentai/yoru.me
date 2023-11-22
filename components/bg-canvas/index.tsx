import { Canvas } from '@react-three/fiber'

import { useSnapshot } from 'valtio'

import styles from '../../styles/home.module.scss'
import LoadingScreen from './loading-screen'
import Scene from './scene'
import { bgCanvasRootState, isBlending, setBlendName } from './state'

const CloseBlend = () => {
  useSnapshot(bgCanvasRootState)
  return (
    <>
      {isBlending() && (
        <div
          className={styles.closeBlend}
          onClick={() => {
            setBlendName('')
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
            />
          </svg>
        </div>
      )}
    </>
  )
}

const BgCanvas = () => {
  return (
    <>
      <Canvas
        frameloop="demand"
        className={styles.bgCanvas}
        flat
        camera={{
          position: [0, 0, 10],
        }}
      >
        <Scene />
      </Canvas>
      <CloseBlend />
      <LoadingScreen />
    </>
  )
}

export default BgCanvas
