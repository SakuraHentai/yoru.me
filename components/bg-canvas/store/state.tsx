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
const FPS_DELTA = 1e3 / 60 // lock 60 fps
const TIME_PER_FRAME =
  ANIMATION_DURATION / ((60 * ANIMATION_DURATION) / 1e3) / ANIMATION_DURATION

let prevFrameTime = 0
export const advanceTimeline = () => {
  if (bgCanvasState.clock.elapsed >= 1) {
    return 0
  }
  return requestAnimationFrame((t) => {
    let delta = FPS_DELTA
    if (!prevFrameTime) {
      prevFrameTime = t
    } else {
      delta = t - prevFrameTime
    }

    prevFrameTime = t
    bgCanvasState.clock.elapsed += (delta / FPS_DELTA) * TIME_PER_FRAME
  })
}
