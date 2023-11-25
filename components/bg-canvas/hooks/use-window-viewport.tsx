import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'

/**
 * we use browser size to calc viewport.
 * because `useThree` viewport is base on camera and not update reactively (it will exhaust performance),
 * and we move camera for animation effect.
 *
 */
export const useWindowViewport = () => {
  const { size } = useThree()

  const viewport = useMemo(() => {
    return {
      width: size.width / 100,
      height: size.height / 100,
    }
  }, [size.width, size.height])

  return viewport
}
