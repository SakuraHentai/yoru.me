import { useSpring } from '@react-spring/three'
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  Scroll,
  useCursor,
  useScroll,
  useTexture,
} from '@react-three/drei'
import { Euler, Vector3, useFrame, useThree } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'

import { DoubleSide, Mesh } from 'three'
import { useSnapshot } from 'valtio'

import { bgCanvasRootState, isBlending, setBlendName } from '../state'

type SeasonBaseProps = {
  name: string
  position: Vector3
  // this rotation is the inner mesh rotation
  // not the outer mesh rotation
  rotation: Euler
  texture: string
}
export type SeasonPositionProps = Pick<SeasonBaseProps, 'position'>

const SeasonBase = forwardRef(
  (
    { name, texture, position, rotation }: SeasonBaseProps,
    ref: ForwardedRef<Mesh>,
  ) => {
    const map = useTexture(texture)

    const { viewport } = useThree()
    const portalRef = useRef<PortalMaterialType>(null)
    const scroll = useScroll()

    // need it to render the blend
    useSnapshot(bgCanvasRootState)
    const blend = useSpring({
      value: isBlending(name) ? 1 : 0,
    })

    useFrame(() => {
      if (portalRef.current) {
        portalRef.current.blend = blend.value.get()
      }
    })

    return (
      <>
        <RoundedBox
          name={name}
          // will have 4 seasons.
          args={[
            (viewport.width - viewport.width / 8) / 2,
            (viewport.height - viewport.height / 8) / 2,
            0.2,
          ]}
          position={position}
          ref={ref}
          onClick={() => {
            if (scroll.offset > 0.95 && !isBlending()) {
              setBlendName(name)
            }
          }}
        >
          <MeshPortalMaterial ref={portalRef} side={DoubleSide}>
            <mesh rotation={rotation}>
              <sphereGeometry args={[50, 64, 64]} />
              <meshBasicMaterial map={map} side={DoubleSide} />
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
