import { useTexture } from '@react-three/drei'
import { useCallback } from 'react'

import { SRGBColorSpace, Texture } from 'three'

import aki from '../../../assets/home/aki.jpg'
import fuyu from '../../../assets/home/fuyu.jpg'
import haru from '../../../assets/home/haru.jpg'
import natsu from '../../../assets/home/natsu.jpg'

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
