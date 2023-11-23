import { useSpring } from '@react-spring/three'
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
} from '@react-three/drei'
import { Euler, invalidate, useThree } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useCallback, useMemo, useRef } from 'react'

import { DoubleSide, Mesh, Texture } from 'three'

import {
  bgCanvasState,
  blendNameTypes,
  isBlending,
  setBlendName,
} from '../store/state'

type SeasonBaseProps = {
  blending: boolean
  name: blendNameTypes
  // this rotation is the inner mesh rotation
  // not the outer mesh rotation
  portalRotation: Euler
  texture: Texture
}

const SeasonBase = forwardRef(
  (
    { blending, name, texture, portalRotation }: SeasonBaseProps,
    ref: ForwardedRef<Mesh>,
  ) => {
    const { viewport } = useThree()
    const portalRef = useRef<PortalMaterialType>(null)
    const args = useMemo(() => {
      const width = viewport.width
      const height = viewport.height
      return [width / 2, height / 2, 0.2] as [number, number, number]
    }, [viewport.width, viewport.height])

    const handleClick = useCallback(() => {
      if (bgCanvasState.timeline >= 1 && !isBlending()) {
        setBlendName(name)
      }
    }, [name])

    // blending effect
    useSpring(
      {
        value: blending ? 1 : 0,
        onChange({ value: spring }) {
          if (portalRef.current) {
            portalRef.current.blend = spring.value
            // queue a frame
            invalidate()
          }
        },
      },
      [blending],
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
