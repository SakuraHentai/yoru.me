import { LOGO, SCENES, TEXTURE } from '@/game/config'
import Feeder from '../sprites/feeder'
import Pet from '../sprites/pet'

export default class MainScene extends Phaser.Scene {
  logo!: Phaser.Physics.Arcade.Group
  private player!: Feeder

  constructor() {
    super(SCENES.MAIN)
  }

  // load resources
  preload(): void {
    this.load.spritesheet(TEXTURE.PET.NAME, TEXTURE.PET.SRC, {
      frameWidth: TEXTURE.PET.WIDTH,
      frameHeight: TEXTURE.PET.HEIGHT,
    })
    this.load.spritesheet(TEXTURE.FOOD.NAME, TEXTURE.FOOD.SRC, {
      frameWidth: TEXTURE.FOOD.WIDTH,
      frameHeight: TEXTURE.FOOD.HEIGHT,
    })
  }

  create(): void {
    this.createLogo()
    this.createPlayer()
    this.addCollide()
    this.countScore()
  }

  private createLogo(): void {
    this.logo = this.physics.add.group({
      collideWorldBounds: true,
    })

    LOGO.forEach((row, rowIdx) => {
      row.split('').forEach((col, colIdx) => {
        if (col !== ' ') {
          const pet = new Pet(
            this,
            colIdx * TEXTURE.PET.WIDTH +
              (this.cameras.main.width - LOGO[0].length * TEXTURE.PET.WIDTH) /
                2,
            rowIdx * TEXTURE.PET.HEIGHT,
            TEXTURE.PET.NAME
          )

          // add to group
          this.logo.add(pet)
        }
      })
    })
  }

  private createPlayer(): void {
    this.player = new Feeder(
      this,
      this.cameras.main.centerX - TEXTURE.PET.WIDTH / 2,
      this.cameras.main.height - TEXTURE.PET.HEIGHT * 2,
      TEXTURE.PET.NAME
    )

    this.player.on('feed', (food: Food) => {
      food.addCollide(this.logo.getChildren())
      food.addCollide(this.player)
    })
  }

  private addCollide(): void {
    this.physics.world.setBoundsCollision(true)
    // pets -> player
    this.physics.add.collider(this.logo.getChildren(), this.player, () => {
      this.player.collide()
    })
  }

  private countScore() {
    this.scene.get(SCENES.SCORE).scene.restart()
  }
}
