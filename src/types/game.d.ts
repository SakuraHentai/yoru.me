declare module '*.png'

declare class MainScene extends Phaser.Scene {
  logo: Phaser.Physics.Arcade.Group
}

declare class Food extends Phaser.Physics.Arcade.Sprite {
  speed: number
  addCollide(
    obj: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject
  ): void
}

declare class Pet extends Phaser.Physics.Arcade.Sprite {
  body!: Phaser.Physics.Arcade.Body
  speed: number
  collide(from: Phaser.GameObjects.GameObject): void
}
