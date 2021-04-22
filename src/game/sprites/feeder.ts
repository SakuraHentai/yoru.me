import { KEYS, TEXTURE } from '@/game/config'
import Pet from './pet'
import Food from './food'

export default class Feeder extends Pet {
  speed = 300
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    this.body.setCollideWorldBounds(true, 1, 1, true).setVelocityX(-this.speed)

    this.addEvents()
  }

  private addEvents(): void {
    // keyboard event
    this.scene.input.keyboard.on('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYS.SPACE: {
          const food = new Food(
            this.scene,
            this.x + (TEXTURE.PET.WIDTH - TEXTURE.FOOD.WIDTH / 2),
            this.y - TEXTURE.PET.HEIGHT / 2,
            TEXTURE.FOOD.NAME
          )
          this.emit('feed', food)
          break
        }
        // case KEYS.ARROW.UP:
        //   this.goUp()
        //   break
        // case KEYS.ARROW.DOWN:
        //   this.goDown()
        //   break
        case KEYS.ARROW.LEFT:
          this.goLeft()
          break
        case KEYS.ARROW.RIGHT:
          this.goRight()
          break
      }
    })
  }

  private goUp(): void {
    this.setVelocityY(-this.speed)
  }

  private goDown(): void {
    this.setVelocityY(this.speed)
  }

  private goLeft(): void {
    this.setFlipX(false).setVelocityX(-this.speed)
  }

  private goRight(): void {
    this.setFlipX(true).setVelocityX(this.speed)
  }

  collideWorldBounds(): void {
    this.setFlipX(!this.flipX)
  }

  collide(): void {
    this.scene.scene.get('Main').scene.restart()
  }
}
