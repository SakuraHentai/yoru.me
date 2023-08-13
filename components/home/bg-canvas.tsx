import { useSpring } from '@react-spring/web'
import {
  Center,
  Environment,
  Image,
  Loader,
  MeshPortalMaterial,
  OrbitControls,
  PortalMaterialType,
  Scroll,
  ScrollControls,
  Text3D,
  useProgress,
  useTexture,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'

import {
  AddEquation,
  BackSide,
  CustomBlending,
  DoubleSide,
  FrontSide,
  MathUtils,
  SRGBColorSpace,
} from 'three'

import bg from '../../assets/home/20230813204145.png'
import aki from '../../assets/home/aki.jpg'
import fuyu from '../../assets/home/fuyu.jpg'
import haru from '../../assets/home/haru.jpg'
import natsu from '../../assets/home/natsu.jpg'
import styles from '../../styles/home.module.scss'

type PageProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  texture: string
}
const Page = ({ position, rotation, texture }: PageProps) => {
  const map = useTexture(texture)
  // map.repeat.x = -1
  const focus = useRef(false)

  const { viewport, size } = useThree()

  const portalRef = useRef<PortalMaterialType>(null)

  const progress = useProgress()
  console.log(JSON.stringify(progress))

  useFrame(() => {
    if (portalRef.current) {
      portalRef.current.blend = MathUtils.lerp(
        portalRef.current.blend,
        focus.current ? 1 : 0,
        0.1,
      )
    }
  })

  return (
    <mesh
      position={position}
      onDoubleClick={() => {
        focus.current = !focus.current
      }}
    >
      <planeGeometry args={[viewport.width / 3, viewport.height / 3]} />
      <MeshPortalMaterial ref={portalRef} blend={0} side={DoubleSide}>
        <mesh rotation={rotation}>
          <sphereGeometry args={[50, 64, 64]} />
          <meshBasicMaterial map={map} side={DoubleSide} />
        </mesh>
        <ambientLight />
      </MeshPortalMaterial>
    </mesh>
  )
}

const BgCanvas = () => {
  return (
    <>
      <Canvas
        className={styles.bgCanvas}
        flat
        camera={{
          position: [0, 0, 10],
        }}
        onCreated={() => {
          console.log(`done`)
        }}
      >
        {/* <color attach={'background'} args={['#000000']} /> */}
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.1}>
            <Page
              texture={haru.src}
              rotation={[0, Math.PI * -2.7, 0]}
              position={[-3.5, 3, 0]}
            />
            <Page
              texture={natsu.src}
              rotation={[0, Math.PI * -2.8, 0]}
              position={[3.5, 3, 0]}
            />
            <Page
              texture={aki.src}
              rotation={[0, Math.PI * -1.95, 0]}
              position={[-3.5, -3, 0]}
            />
            <Page
              texture={fuyu.src}
              rotation={[0, Math.PI * -1.4, 0]}
              position={[3.5, -3, 0]}
            />
          </ScrollControls>
          {/* <Image
            url={bg.src}
            position={[1.5, 5, 2]}
            transparent
            scale={[16, 9]}
          />
          <Image
            url={aki.src}
            position={[1.5, 5, 1]}
            transparent
            scale={[aki.width / 100, aki.height / 100]}
          /> */}
        </Suspense>
        {/* <ambientLight /> */}
        <axesHelper />
        <OrbitControls
          enablePan={false}
          // enableZoom={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
      <Loader />
    </>
  )
}

export default BgCanvas
