import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { Mesh } from 'three'

import fuyu from '../../../assets/home/fuyu.jpg'
import SeasonBase from './base'

const Fuyu = () => {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    const inView = scroll.range(3 / 4, 1 / 4)
    // console.log(`Fuyu:`, inView)
  })
  return (
    <SeasonBase
      texture={fuyu.src}
      position={[0, -viewport.height * 4, 1]}
      rotation={[0, Math.PI * -1.4, 0]}
      ref={ref}
    />
  )
}

export default Fuyu
