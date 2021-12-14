import { TEXTURE } from '../config'
import Pet from './pet'
export default class Food extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body
  speed = 300
  onWordBounds!: (body: Phaser.Physics.Arcade.Body) => void

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    // add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // emit
    this.body
      .setCollideWorldBounds(true, 0, 0.4, true)
      .setGravity(0, this.speed)
      .setVelocityY(-this.speed * 2.5)

    // animate it
    this.anims.create({
      key: TEXTURE.FOOD.ANIM.NAME,
      frames: this.anims.generateFrameNumbers(TEXTURE.FOOD.NAME, {
        start: TEXTURE.FOOD.ANIM.FRAME.START,
        end: TEXTURE.FOOD.ANIM.FRAME.END,
      }),
      frameRate: TEXTURE.FOOD.ANIM.FRAME.RATE,
      repeat: TEXTURE.FOOD.ANIM.REPEAT,
    })

    this.play(TEXTURE.FOOD.ANIM.NAME)

    // world bound events
    this.onWordBounds = this.bounds.bind(this)
    this.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
      this.onWordBounds
    )
  }

  private bounds(body: Phaser.Physics.Arcade.Body): void {
    if (this.body === body) {
      this.setAngle(180)
      if (Math.abs(this.body.velocity.y) < 10) {
        this.scene.physics.world.off(
          Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
          this.onWordBounds
        )
        this.destroy()
      }
    }
  }

  addCollide(
    obj: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject
  ): void {
    const colliderHandler = this.scene.physics.add.collider(
      this,
      obj,
      (
        item: Phaser.GameObjects.GameObject,
        obj: Phaser.GameObjects.GameObject
      ) => {
        const r1: Food = item as Food
        const r2: Pet = obj as Pet

        // clear events
        r1.scene.physics.world.removeCollider(colliderHandler)
        r1.scene.physics.world.off(
          Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
          this.onWordBounds
        )

        r2.setCollideWorldBounds(true)

        // collide effect
        r2.collide(r1)
        // boom
        r1.destroy()
      }
    )
  }
}
