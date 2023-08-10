import { MouseEvent, useCallback, useRef } from 'react'
import { a, useSpring } from 'react-spring'

const Demo = () => {
  const [props, api] = useSpring(() => ({ x: 0, y: 0 }))
  const demoRef = useRef<HTMLDivElement>(null)
  const getDemoOffset = useCallback(() => {
    return {
      x: demoRef.current?.offsetLeft ?? 0,
      y: demoRef.current?.offsetTop ?? 0,
    }
  }, [])

  const moveTo = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const demoOffset = getDemoOffset()
    api.start({
      x: e.pageX - demoOffset.x,
      y: e.pageY - demoOffset.y,
      config: { mass: 5, tension: 1000, friction: 60 },
    })
  }, [])

  return (
    <div
      className="demo"
      style={{
        height: 300,
        cursor: 'move',
      }}
      onMouseMove={(e) => moveTo(e)}
      ref={demoRef}
    >
      <a.div style={props}>Move anywhere</a.div>
    </div>
  )
}

export default Demo
