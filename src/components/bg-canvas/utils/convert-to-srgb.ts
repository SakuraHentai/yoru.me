import { type Texture } from 'three'

export const convertToSRGB = <T extends Texture | Texture[]>(texture: T) => {
  if (!Array.isArray(texture)) {
    // texture.colorSpace = SRGBColorSpace
  }

  return texture
}
