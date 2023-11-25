import { FC, useEffect, useMemo, useRef } from 'react'

import gsap from 'gsap'
import { Euler, Mesh, Texture, Vector3 } from 'three'
import { subscribe } from 'valtio'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { bgCanvasState, timelineRange } from '../store/state'
import SeasonBase from './base'

type Props = {
  map: Texture
}
const Haru: FC<Props> = ({ map }) => {
  const ref = useRef<Mesh>(null)
  const viewport = useWindowViewport()
  const position = useRef(new Vector3(0))
  const portalRotation = useMemo(() => {
    return new Euler(0, -Math.PI / 1.8, 0)
  }, [])

  // we start the animation immediately when sprint season rendered
  useEffect(() => {
    bgCanvasState.loaded.ready = true
  }, [])

  const tl = useMemo<ReturnType<typeof gsap.timeline>>(() => {
    return (
      gsap
        .timeline({
          defaults: {
            ease: 'power2.inOut',
          },
        })
        .fromTo(
          position.current,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          {
            x: -viewport.width / 2,
            y: viewport.height / 2,
            z: -2,
            duration: 2,
          },
        )
        // to center
        .to(position.current, {
          x: -viewport.width / 2 + viewport.width / 4,
          y: viewport.height / 2 - viewport.height / 4,
          z: 0,
          duration: 1,
        })
        .pause()
    )
  }, [viewport.width, viewport.height])

  useEffect(() => {
    return subscribe(bgCanvasState.clock, () => {
      const percentage = timelineRange(0, 1 / 2)
      tl.seek(percentage * tl.duration())

      ref.current?.position.set(
        position.current.x,
        position.current.y,
        position.current.z,
      )
    })
  }, [tl])

  return (
    <SeasonBase
      name="haru"
      texture={map}
      portalRotation={portalRotation}
      ref={ref}
    />
  )
}

export default Haru
