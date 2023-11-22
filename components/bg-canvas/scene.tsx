import { useCallback, useEffect, useState } from 'react'

import Director from './director'
import Aki from './seasons/aki'
import Fuyu from './seasons/fuyu'
import Haru from './seasons/haru'
import Natsu from './seasons/natsu'
import { bgCanvasRootState } from './state'

const ANIMATION_DURATION = 4e3
const Scene = () => {
  const [shouldStart, setShouldStart] = useState(false)
  const advance = useCallback(() => {
    if (shouldStart && bgCanvasRootState.timeline < 1) {
      bgCanvasRootState.timeline +=
        ANIMATION_DURATION /
        ((60 * ANIMATION_DURATION) / 1e3) /
        ANIMATION_DURATION
      return requestAnimationFrame(advance)
    }
  }, [])
  useEffect(() => {
    const handle = requestAnimationFrame(advance)

    return () => {
      cancelAnimationFrame(handle)
    }
  }, [])

  useEffect(() => {
    const handle = setTimeout(() => {
      setShouldStart(true)
    }, 1e3)

    return () => {
      clearTimeout(handle)
    }
  }, [])
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
