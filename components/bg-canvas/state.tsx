import { Vector3 } from 'three'
import { proxy } from 'valtio'

export type BlendNameTypes = '' | 'haru' | 'natsu' | 'aki' | 'fuyu'
type RootStateType = {
  blendName: BlendNameTypes
  timeline: number
}
export const bgCanvasRootState = proxy<RootStateType>({
  // the blend season mesh name
  blendName: '',
  timeline: 0, // from 0 -> 1
})

export const setBlendName = (name: BlendNameTypes) => {
  bgCanvasRootState.blendName = name
}

export const isBlending = (name?: BlendNameTypes) => {
  if (name) {
    return bgCanvasRootState.blendName === name
  } else {
    return bgCanvasRootState.blendName !== ''
  }
}

// The default states makes the motion stable when component rerender
export const getDefaultCameraPosition = () => new Vector3(0, 0, 10)

export const timelineRange = (from: number, distance: number) => {
  const currentTime = bgCanvasRootState.timeline
  return currentTime < 0 ? 0 : (currentTime - from) / distance
}
