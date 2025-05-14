import { useTexture } from '@react-three/drei'
import { useCallback } from 'react'

import aki from '@/assets/home/aki.webp'
import fuyu from '@/assets/home/fuyu.webp'
import haru from '@/assets/home/haru.webp'
import natsu from '@/assets/home/natsu.webp'

import { SRGBColorSpace, Texture } from 'three'

export const useSeasonTextures = () => {
  const convertToSRGB = useCallback((texture: Texture | Texture[]) => {
    if (!Array.isArray(texture)) {
      texture.colorSpace = SRGBColorSpace
    }
  }, [])
  const haruTexture = useTexture(haru.src, convertToSRGB)
  const natsuTexture = useTexture(natsu.src, convertToSRGB)
  const akiTexture = useTexture(aki.src, convertToSRGB)
  const fuyuTexture = useTexture(fuyu.src, convertToSRGB)

  return {
    haru: haruTexture,
    natsu: natsuTexture,
    aki: akiTexture,
    fuyu: fuyuTexture,
  }
}
