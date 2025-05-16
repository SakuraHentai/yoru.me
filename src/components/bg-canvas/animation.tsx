import { Canvas } from '@react-three/fiber'

import Scene from './scene'

export const Animation = () => {
  return (
    <Canvas frameloop="demand" className="col-span-full row-span-full" flat>
      <Scene />
    </Canvas>
  )
}
