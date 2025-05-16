import { SRGBColorSpace, type Texture } from 'three'

export const convertToSRGB = (texture: Texture | Texture[]) => {
  if (!Array.isArray(texture)) {
    texture.colorSpace = SRGBColorSpace
  }
}
