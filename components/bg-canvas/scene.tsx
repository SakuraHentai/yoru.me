import { ScrollControls } from '@react-three/drei'

import Director from './director'
import Aki from './seasons/aki'
import Fuyu from './seasons/fuyu'
import Haru from './seasons/haru'
import Natsu from './seasons/natsu'

const Scene = () => {
  return (
    <>
      <ScrollControls pages={4} damping={0.1}>
        <Haru />
        <Natsu />
        <Aki />
        <Fuyu />
        <Director />
      </ScrollControls>
      {/* <axesHelper /> */}
      {/* <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        // enableRotate={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.3}
      /> */}
    </>
  )
}

export default Scene
