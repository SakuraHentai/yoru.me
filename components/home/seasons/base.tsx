import { useSpring } from '@react-spring/three'
import {
  MeshPortalMaterial,
  PortalMaterialType,
  RoundedBox,
  useTexture,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useRef } from 'react'

import { DoubleSide, Mesh } from 'three'

type SeasonBaseProps = {
  position: [number, number, number]
  // this rotation is the inner mesh rotation
  // not the outer mesh rotation
  rotation: [number, number, number]
  texture: string
}
export type SeasonPositionProps = Pick<SeasonBaseProps, 'position'>

const SeasonBase = forwardRef(
  (
    { texture, position, rotation }: SeasonBaseProps,
    ref: ForwardedRef<Mesh>,
  ) => {
    const map = useTexture(texture)

    const focus = useRef(false)
    const [blend] = useSpring(
      {
        value: 0,
      },
      [],
    )

    const { viewport } = useThree()

    const portalRef = useRef<PortalMaterialType>(null)

    useFrame(() => {
      if (portalRef.current) {
        blend.value.start({ to: focus.current ? 1 : 0 })
        portalRef.current.blend = blend.value.get()
      }
    })

    return (
      <RoundedBox
        // will have 4 seasons.
        args={[
          (viewport.width - viewport.width / 8) / 2,
          (viewport.height - viewport.height / 8) / 2,
          0.2,
        ]}
        position={position}
        ref={ref}
        // onPointerEnter={() => {
        //   focus.current = true
        // }}
        onPointerLeave={() => {
          focus.current = false
        }}
      >
        <MeshPortalMaterial ref={portalRef} blend={0} side={DoubleSide}>
          <mesh rotation={rotation}>
            <sphereGeometry args={[50, 64, 64]} />
            <meshBasicMaterial map={map} side={DoubleSide} />
          </mesh>
          <ambientLight />
        </MeshPortalMaterial>
      </RoundedBox>
    )
  },
)

export default SeasonBase
