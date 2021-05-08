import 'phaser'
import MainScene from './scenes/Main'
import ScoreScene from './scenes/Score'

function init(parent: string): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    banner: false,
    width: window.innerWidth,
    height: window.innerHeight,
    parent,
    // scale: {
    //   parent,
    //   mode: Phaser.Scale.RESIZE,
    //   width: '100%',
    //   height: '100%',
    // },
    backgroundColor: '#fff',
    disableContextMenu: true,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
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
    scene: [MainScene, ScoreScene],
  }
  return new Phaser.Game(config)
}

export { init }
