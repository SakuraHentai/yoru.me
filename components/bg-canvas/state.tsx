import { Vector3 } from 'three'
import { proxy, useSnapshot } from 'valtio'

export const bgCanvasRootState = proxy({
  // the blend season mesh name
  blendName: '',
})

export const setBlendName = (name: string) => {
  bgCanvasRootState.blendName = name
}

export const isBlending = (name?: string) => {
  if (name) {
    return bgCanvasRootState.blendName === name
  } else {
    return bgCanvasRootState.blendName !== ''
  }
}

// The default states makes the motion stable when component rerender
export const getDefaultCameraPosition = () => new Vector3(0, 0, 10)
