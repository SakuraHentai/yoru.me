import rabbitFrame from '../assets/rabbit/frame.png'
import radishFrame from '../assets/radish/frame.png'

export const KEYS = {
  SPACE: ' ',
  ARROW: {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
  },
}

export const TEXTURE = {
  FOOD: {
    NAME: 'food',
    ANIM: {
      NAME: 'fire',
      FRAME: {
        START: 0,
        END: 1,
        RATE: 4,
      },
      REPEAT: -1,
    },
    SRC: radishFrame,
    WIDTH: 22,
    HEIGHT: 32,
  },
  PET: {
    NAME: 'pet',
    ANIM: {
      NAME: 'run',
      FRAME: {
        START: 0,
        END: 1,
        RATE: 6,
      },
      REPEAT: -1,
    },
    SRC: rabbitFrame,
    WIDTH: 32,
    HEIGHT: 32,
  },
}

export const LOGO = [
  '*   * **** ***  *  *    **   ** ****',
  ' * *  *  * *  * *  *    *  *  * *   ',
  '  *   *  * ***  *  *    *  *  * ****',
  '  *   *  * * *  *  * ** *  *  * *   ',
  '  *   **** *  *  **  ** *  *  * ****',
]

export const MIN_WIDTH = (TEXTURE.PET.WIDTH + 2) * LOGO[0].length

export const FULL_SCORE = LOGO.join('')
  .split('')
  .filter((_) => _ === '*').length

export const SCENES = {
  MAIN: 'Main',
  SCORE: 'Score',
}
