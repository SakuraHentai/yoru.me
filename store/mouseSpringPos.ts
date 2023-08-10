import { proxy } from 'valtio'

const mouseSpringPos = proxy({
  x: 0,
  y: 0,
})

export default mouseSpringPos
