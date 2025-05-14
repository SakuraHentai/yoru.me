import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type blendNameTypes = '' | 'haru' | 'natsu' | 'aki' | 'fuyu'

interface BgCanvasState {
  blend: {
    name: blendNameTypes
  }
  clock: {
    elapsed: number
  }
  loaded: {
    ready: boolean
  }
  setBlendName: (name: blendNameTypes) => void
  setElapsed: (elapsed: number) => void
  setReady: (ready: boolean) => void
  resetTimeline: () => void
}

let firstFrameTime = 0
const ANIMATION_DURATION = 6e3

export const useBgCanvasStore = create<BgCanvasState>()(
  immer((set) => ({
    blend: {
      name: '',
    },
    clock: {
      elapsed: 0,
    },
    loaded: {
      ready: false,
    },
    setBlendName: (name) =>
      set((state) => {
        state.blend.name = name
      }),
    setElapsed: (elapsed) =>
      set((state) => {
        state.clock.elapsed = elapsed
      }),
    setReady: (ready) =>
      set((state) => {
        state.loaded.ready = ready
      }),
    resetTimeline: () =>
      set((state) => {
        firstFrameTime = 0
        state.clock.elapsed = 0
      }),
  })),
)

export const timelineRange = (from: number, distance: number) => {
  const currentTime = useBgCanvasStore.getState().clock.elapsed
  const percentage = (currentTime - from) / (from + distance)
  return Math.min(Math.max(percentage, 0), 1)
}

export const advanceTimeline = () => {
  const elapsed = useBgCanvasStore.getState().clock.elapsed
  if (elapsed >= 1) {
    return 0
  }
  return requestAnimationFrame((t) => {
    if (!firstFrameTime) {
      firstFrameTime = t
    }
    useBgCanvasStore
      .getState()
      .setElapsed((t - firstFrameTime) / ANIMATION_DURATION)
  })
}

export const resetTimeline = () => {
  firstFrameTime = 0
  useBgCanvasStore.getState().setElapsed(0)
}
