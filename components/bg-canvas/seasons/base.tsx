import { useSpring } from '@react-spring/three'
import { MeshPortalMaterial, RoundedBox } from '@react-three/drei'
import { Euler, type ThreeElements } from '@react-three/fiber'
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { DoubleSide, Mesh, Texture } from 'three'
import { subscribe } from 'valtio'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { bgCanvasState, blendNameTypes } from '../store/state'

type SeasonBaseProps = {
  name: blendNameTypes
  // this rotation is the inner mesh rotation
  // not the outer mesh rotation
  portalRotation: Euler
  texture: Texture
}

const SeasonBase = forwardRef(
  (
    { name, texture, portalRotation }: SeasonBaseProps,
    ref: ForwardedRef<Mesh>,
  ) => {
    const viewport = useWindowViewport()
    const portalRef = useRef<ThreeElements['portalMaterialImpl']>(null)
    const [isBlending, setIsBlending] = useState(false)
    const args = useMemo(() => {
      const width = viewport.width
      const height = viewport.height
      return [width / 2, height / 2, 0.2] as [number, number, number]
    }, [viewport.width, viewport.height])

    useEffect(() => {
      return subscribe(bgCanvasState.blend, () => {
        setIsBlending(bgCanvasState.blend.name === name)
      })
    }, [name])

    const handleClick = useCallback(() => {
      // if is others blending, ignore it.
      if (bgCanvasState.clock.elapsed >= 1 && bgCanvasState.blend.name === '') {
        bgCanvasState.blend.name = name
      }
    }, [name])

    // blending effect
    useSpring(
      {
        value: isBlending ? 1 : 0,
        onChange({ value: spring }) {
          if (portalRef.current) {
            portalRef.current.blend = spring.value
          }
        },
      },
      [isBlending],
    )

    return (
      <>
        <RoundedBox
          name={name}
          // will have 4 seasons.
          args={args}
          ref={ref}
          onClick={handleClick}
        >
          {/* @ts-ignore */}
          <MeshPortalMaterial ref={portalRef} side={DoubleSide}>
            <mesh rotation={portalRotation}>
              <sphereGeometry args={[50, 64, 64]} />
              <meshBasicMaterial map={texture} side={DoubleSide} />
            </mesh>
            <ambientLight />
          </MeshPortalMaterial>
        </RoundedBox>
      </>
    )
  },
)

SeasonBase.displayName = `SeasonBase`

export default SeasonBase
