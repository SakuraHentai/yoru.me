import 'phaser'
import MainScene from './scenes/main'
import ScoreScene from './scenes/score'
import { MIN_WIDTH } from './config'

function init(parent: string): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    banner: false,
    width: window.innerWidth,
    height: window.innerHeight,
    parent,
    scale: {
      parent,
      mode: Phaser.Scale.RESIZE,
    },
    backgroundColor: '#fff',
    disableContextMenu: true,
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

  return new Phaser.Game(config)
}

export default { init }
