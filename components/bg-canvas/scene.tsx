import { ScrollControls } from '@react-three/drei'

import { useSnapshot } from 'valtio'

import Director from './director'
import Aki from './seasons/aki'
import Fuyu from './seasons/fuyu'
import Haru from './seasons/haru'
import Natsu from './seasons/natsu'
import { bgCanvasRootState, isBlending } from './state'

const Scene = () => {
  useSnapshot(bgCanvasRootState)
  return (
    <>
      <ScrollControls pages={4} damping={0.1} enabled={!isBlending()}>
        <Haru />
        <Natsu />
        <Aki />
        <Fuyu />
        <Director />
      </ScrollControls>
      {/* <axesHelper /> */}
    </>
  )
}

export default Scene
