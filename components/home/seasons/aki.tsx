import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh } from 'three'

import aki from '../../../assets/home/aki.jpg'
import SeasonBase from './base'

const Aki = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    const inView = scroll.range(2 / 4, 1 / 4)
    console.log(`Aki:`, inView)
  })
  return (
    <SeasonBase
      texture={aki.src}
      position={[0, -viewport.height * 2, 2]}
      rotation={[0, Math.PI * -1.95, 0]}
      ref={ref}
    />
  )
}

export default Aki
