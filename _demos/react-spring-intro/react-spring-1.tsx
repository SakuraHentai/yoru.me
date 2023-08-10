import { a, useSpring } from '@react-spring/web'

const Demo = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    loop: {
      reverse: true,
    },
  })

  return (
    <div className="demo">
      <a.div style={props}>Hello</a.div>
    </div>
  )
}

export default Demo
