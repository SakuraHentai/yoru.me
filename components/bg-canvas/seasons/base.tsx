import { useSpring } from '@react-spring/three'
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  useTexture,
} from '@react-three/drei'
import { Euler, Vector3, useThree } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useRef } from 'react'

import { DoubleSide, Mesh } from 'three'
import { useSnapshot } from 'valtio'

import {
  BlendNameTypes,
  bgCanvasRootState,
  isBlending,
  setBlendName,
} from '../state'

type SeasonBaseProps = {
  name: BlendNameTypes
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
    const $rootState = useSnapshot(bgCanvasRootState)
    const map = useTexture(texture)

    const { viewport } = useThree()
    const portalRef = useRef<PortalMaterialType>(null)

    useSpring(
      {
        value: isBlending(name) ? 1 : 0,
        onChange({ value: spring }) {
          if (portalRef.current) {
            portalRef.current.blend = spring.value
          }
        },
      },
      [$rootState.blendName],
    )

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
            if (bgCanvasRootState.timeline >= 1 && !isBlending()) {
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
