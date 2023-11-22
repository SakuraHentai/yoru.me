import { Vector3 } from 'three'
import { proxy, subscribe } from 'valtio'

export type BlendNameTypes = '' | 'haru' | 'natsu' | 'aki' | 'fuyu'
type RootStateType = {
  blendName: BlendNameTypes
  timeline: number
  cameraHandleBy: 'scroll' | 'blending'
}
export const bgCanvasRootState = proxy<RootStateType>({
  // the blend season mesh name
  blendName: '',
  timeline: 0, // from 0 -> 1
  cameraHandleBy: 'scroll',
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

subscribe(bgCanvasRootState, () => {
  console.log(bgCanvasRootState.timeline)
})

// The default states makes the motion stable when component rerender
export const getDefaultCameraPosition = () => new Vector3(0, 0, 10)

export const timelineRange = (from: number, distance: number) => {
  return (bgCanvasRootState.timeline - from) / distance
}
