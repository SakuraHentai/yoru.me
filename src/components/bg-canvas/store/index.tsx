import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
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
  timelineRange: (from: number, distance: number) => number
  advanceTimeline: (callback: () => void, force?: boolean) => void
  resetTimeline: () => void
}

let firstFrameTime = 0
const ANIMATION_DURATION = 6e3

export const useBgCanvasStore = create<BgCanvasState>()(
  subscribeWithSelector(
    immer((set, get) => ({
      blend: {
        name: ''
      },
      clock: {
        elapsed: 0
      },
      loaded: {
        ready: false
      },
      setBlendName: (name) => {
        set((state) => {
          state.blend.name = name
        })
      },
      setElapsed: (elapsed) => {
        set((state) => {
          state.clock.elapsed = elapsed
        })
      },
      setReady: (ready) => {
        set((state) => {
          state.loaded.ready = ready
        })
      },
      timelineRange: (from: number, distance: number) => {
        const currentTime = get().clock.elapsed
        const percentage = (currentTime - from) / (from + distance)
        return Math.min(Math.max(percentage, 0), 1)
      },
      advanceTimeline: (callback: () => void, force) => {
        set((state) => {
          const elapsed = state.clock.elapsed
          if (elapsed <= 1 || force) {
            if (!firstFrameTime) {
              firstFrameTime = Date.now()
            }
            state.clock.elapsed =
              (Date.now() - firstFrameTime) / ANIMATION_DURATION

            callback()
          }
        })
      },
      resetTimeline: () => {
        set((state) => {
          firstFrameTime = 0
          state.clock.elapsed = 0
        })
      }
    }))
  )
)
