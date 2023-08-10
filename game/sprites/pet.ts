import { TEXTURE } from '../config'
import Food from './food'

export default class Pet extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body
  #speed = 300
  #speedRatio = 1
  #onWordBounds!: (body: Phaser.Physics.Arcade.Body) => void

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    // add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.#onWordBounds = this.#bounds.bind(this)

    this.body.setCollideWorldBounds(true, 1, 0.4, true)

    // animate it
    this.anims.create({
      key: TEXTURE.PET.ANIM.NAME,
      frames: this.anims.generateFrameNumbers(TEXTURE.PET.NAME, {
        start: TEXTURE.PET.ANIM.FRAME.START,
        end: TEXTURE.PET.ANIM.FRAME.END,
      }),
      frameRate: TEXTURE.PET.ANIM.FRAME.RATE,
      repeat: TEXTURE.PET.ANIM.REPEAT,
    })

    this.play({
      key: TEXTURE.PET.ANIM.NAME,
      delay: Math.random() * 3e2,
    })

    // world bounds event
    this.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
      this.#onWordBounds,
    )
  }

  #getSpeed(): number {
    return this.#speed * this.#speedRatio
  }

  setSpeedRatio(ratio: number = 1): void {
    this.#speedRatio = ratio
    if (ratio === 1) {
      this.setVelocityY(0)
    } else {
      this.setVelocityY(this.#getSpeed())
    }
  }

  #bounds(body: Phaser.Physics.Arcade.Body): void {
    if (this.body === body) {
      this.collideWorldBounds()
    }
  }

  collideWorldBounds(): void {
    if (
      Math.abs(this.body.velocity.y) < 10 &&
      this.body.y > this.scene.cameras.main.height - TEXTURE.PET.HEIGHT * 2
    ) {
      this.scene.physics.world.off(
        Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
        this.#onWordBounds,
      )
      this.destroy()
    }
  }

  collide(from: Pet | Food): void {
    if (from instanceof Food) {
      this.setGravityY(this.#getSpeed())
    }
  }
}
