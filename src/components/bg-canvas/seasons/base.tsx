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

import { animate } from 'motion/react'
import { DoubleSide, Mesh, Texture } from 'three'
import { match } from 'ts-pattern'
import { useShallow } from 'zustand/shallow'

import { useWindowViewport } from '../hooks/use-window-viewport'
import { type blendNameTypes, useBgCanvasStore } from '../store'

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
    const [blendName, setBlendName] = useBgCanvasStore(
      useShallow((state) => [state.blend.name, state.setBlendName]),
    )
    const args = useMemo(() => {
      const width = viewport.width
      const height = viewport.height
      return [width / 2, height / 2, 0.2] as [number, number, number]
    }, [viewport.width, viewport.height])

    useEffect(() => {
      setIsBlending(blendName === name)
    }, [blendName, name])

    const handleClick = useCallback(() => {
      const elapsed = useBgCanvasStore.getState().clock.elapsed
      if (elapsed >= 1 && blendName === '') {
        setBlendName(name)
      }
    }, [name, blendName, setBlendName])

    // blending effect
    useEffect(() => {
      const [from, to] = match(isBlending)
        .with(true, () => {
          return [0, 1]
        })
        .otherwise(() => {
          return [1, 0]
        })

      const animation = animate(from, to, {
        duration: 0.5,
        ease: 'easeInOut',
        onUpdate: (v) => {
          if (portalRef.current) {
            portalRef.current.blend = v
          }
        },
      })

      return () => {
        animation.stop()
      }
    }, [isBlending])

    return (
      <>
        <RoundedBox
          name={name}
          // will have 4 seasons.
          args={args}
          ref={ref}
          onClick={handleClick}
        >
          {/* @ts-expect-error r3f type */}
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
