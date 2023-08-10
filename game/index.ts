import 'phaser'

import { MIN_WIDTH } from './config'
import MainScene from './scenes/main'
import ScoreScene from './scenes/score'

function init(parent: string): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    banner: false,
    width: window.innerWidth,
    // ref: https://developer.chrome.com/blog/url-bar-resizing/
    height: document.body.clientHeight,
    parent,
    scale: {
      parent,
      mode: Phaser.Scale.RESIZE,
    },
    backgroundColor: '#fff',
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        width: Math.max(MIN_WIDTH, window.innerWidth),
        gravity: { x: 0, y: 0 },
        checkCollision: {
          up: true,
          down: true,
          left: true,
          right: true,
        },
        // debug: process.env.NODE_ENV !== 'production',
      },
    },
    audio: {
      noAudio: true,
    },
    scene: [MainScene, ScoreScene],
  }

  const gameInstance = new Phaser.Game(config)

  // NOTE: wait phaser v3.60 release
  // disableContextMenu now effect on `body`, which will cause all app with no context menu
  // it should effect on canvas
  // https://github.com/photonstorm/phaser/discussions/6316
  gameInstance.canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })

  return gameInstance
}

export { init }
