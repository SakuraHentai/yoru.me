import { useProgress } from '@react-three/drei'
import { useCallback, useEffect } from 'react'

import Director from './director'
import Aki from './seasons/aki'
import Fuyu from './seasons/fuyu'
import Haru from './seasons/haru'
import Natsu from './seasons/natsu'
import { bgCanvasRootState } from './state'

const ANIMATION_DURATION = 5e3
const Scene = () => {
  const loadingState = useProgress()
  const advance = useCallback(() => {
    if (bgCanvasRootState.timeline < 1) {
      bgCanvasRootState.timeline +=
        ANIMATION_DURATION /
        ((60 * ANIMATION_DURATION) / 1e3) /
        ANIMATION_DURATION
      return requestAnimationFrame(advance)
    }
    return 0
  }, [])

  useEffect(() => {
    let handle: ReturnType<typeof requestAnimationFrame>
    if (loadingState.loaded > 0 && loadingState.progress === 100) {
      handle = advance()
    }

    return () => {
      cancelAnimationFrame(handle)
    }
  }, [loadingState])

  return (
    <>
      <Haru />
      <Natsu />
      <Aki />
      <Fuyu />
      <Director />
      {/* <axesHelper /> */}
    </>
  )
}

export default Scene
