import { useEffect, useLayoutEffect } from 'react'

// For server-side rendering: https://github.com/react-spring/zustand/pull/34
const isSSR = typeof window === 'undefined' || !window.navigator

export const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect
