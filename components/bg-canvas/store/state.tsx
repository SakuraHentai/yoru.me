import { proxy } from 'valtio'

export type blendNameTypes = '' | 'haru' | 'natsu' | 'aki' | 'fuyu'
type RootStateType = {
  blend: {
    name: blendNameTypes
  }
  clock: {
    elapsed: number
  }
  loaded: {
    ready: boolean
  }
}
export const bgCanvasState = proxy<RootStateType>({
  // the blend season mesh name
  blend: {
    name: '',
  },
  clock: {
    elapsed: 0,
  },
  loaded: {
    ready: false,
  },
})

export const setBlendName = (name: blendNameTypes) => {
  bgCanvasState.blend.name = name
}

export const timelineRange = (from: number, distance: number) => {
  const currentTime = bgCanvasState.clock.elapsed
  const percentage = (currentTime - from) / (from + distance)

  const clamp = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage

  // inView? and percentage
  return clamp
}

const ANIMATION_DURATION = 6e3

let firstFrameTime = 0
export const advanceTimeline = () => {
  if (bgCanvasState.clock.elapsed >= 1) {
    return 0
  }
  return requestAnimationFrame((t) => {
    if (!firstFrameTime) {
      firstFrameTime = t
    }

    bgCanvasState.clock.elapsed = (t - firstFrameTime) / ANIMATION_DURATION
  })
}

export const resetTimeline = () => {
  firstFrameTime = 0
  bgCanvasState.clock.elapsed = 0
}
