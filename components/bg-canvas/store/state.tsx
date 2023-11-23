import { Vector3 } from 'three'
import { proxy } from 'valtio'

export type blendNameTypes = '' | 'haru' | 'natsu' | 'aki' | 'fuyu'
type RootStateType = {
  blend: {
    name: blendNameTypes
  }
  timeline: number
  ready: boolean
}
export const bgCanvasState = proxy<RootStateType>({
  // the blend season mesh name
  blend: {
    name: '',
  },
  timeline: 0, // from 0 -> 1
  ready: false,
})

export const setBlendName = (name: blendNameTypes) => {
  bgCanvasState.blend.name = name
}

export const isBlending = (name?: blendNameTypes) => {
  if (name) {
    return bgCanvasState.blend.name === name
  } else {
    return bgCanvasState.blend.name !== ''
  }
}

// The default states makes the motion stable when component rerender
export const getDefaultCameraPosition = () => new Vector3(0, 0, 10)

export const timelineRange = (from: number, distance: number) => {
  const currentTime = bgCanvasState.timeline
  const percentage = (currentTime - from) / (from + distance)

  const clamp = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage

  // inView? and percentage
  return clamp
}

const ANIMATION_DURATION = 6e3
const TIME_PER_FRAME =
  ANIMATION_DURATION / ((60 * ANIMATION_DURATION) / 1e3) / ANIMATION_DURATION
export const advanceTimeline = (distance: number = TIME_PER_FRAME) => {
  if (bgCanvasState.timeline >= 1) {
    return
  }
  return requestAnimationFrame(() => {
    bgCanvasState.timeline += distance
  })
}
