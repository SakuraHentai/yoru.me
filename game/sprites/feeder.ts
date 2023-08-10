import { KEYS, TEXTURE } from '../config'
import Food from './food'
import Pet from './pet'

export enum DIRECTION {
  LEFT = -1,
  RIGHT = 1,
}

export default class Feeder extends Pet {
  #speed = 300
  #speedRatio = 1
  #direction = {
    x: DIRECTION.LEFT,
    // y: 0
  }
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    this.body.setCollideWorldBounds(true, 1, 1, true)
    this.#applySpeed()

    this.#initEvents()
  }

  #initEvents(): void {
    // keyboard event
    // @ts-expect-error
    this.scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (e: KeyboardEvent) => {
        switch (e.key) {
          case KEYS.SPACE: {
            this.#feed()
            break
          }
          // case KEYS.ARROW.UP:
          //   this.goUp()
          //   break
          // case KEYS.ARROW.DOWN:
          //   this.goDown()
          //   break
          case KEYS.ARROW.LEFT:
            this.#goLeft()
            break
          case KEYS.ARROW.RIGHT:
            this.#goRight()
            break
        }
      }
    )
    // mouse left to feed, right to change direction
    this.scene.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (e: Phaser.Input.Pointer) => {
        // ref: https://developer.mozilla.org/ja/docs/Web/API/MouseEvent/button
        switch (e.button) {
          case 0:
            this.#feed()
            break
          case 2:
            this.body.velocity.x > 0 ? this.#goLeft() : this.#goRight()
            break
        }
      }
    )
  }

  #feed(): void {
    const food = new Food(
      this.scene,
      this.x,
      this.y - TEXTURE.FOOD.HEIGHT,
      TEXTURE.FOOD.NAME
    )
    this.emit('feed', food)
  }

  #getSpeed(): number {
    return this.#speed * this.#speedRatio * this.#direction.x
  }

  #goLeft(): void {
    this.#direction.x = DIRECTION.LEFT
    this.setFlipX(false).#applySpeed()
  }

  #goRight(): void {
    this.#direction.x = DIRECTION.RIGHT
    this.setFlipX(true).#applySpeed()
  }

  #applySpeed() {
    this.setVelocityX(this.#getSpeed())
  }

  setSpeedRatio(ratio: number = 1): void {
    this.#speedRatio = ratio
    this.#applySpeed()
  }

  getDirection(): DIRECTION {
    return this.#direction.x
  }

  // @override pet's collideWorldBounds
  collideWorldBounds(): void {
    this.#direction.x *= -1
    this.setFlipX(!this.flipX)
  }

  collide(): void {
    this.scene.scene.get('Main').scene.restart()
  }
}
