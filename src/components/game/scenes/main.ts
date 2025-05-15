import { LOGO, MIN_WIDTH, SCENES, TEXTURE } from '../config'
import Feeder from '../sprites/feeder'
import Food from '../sprites/food'
import Pet from '../sprites/pet'
import BulletTimeSystem from '../systems/bullet-time'

export default class MainScene extends Phaser.Scene {
  logo!: Phaser.Physics.Arcade.Group
  player!: Feeder
  #bulletTime!: BulletTimeSystem

  constructor() {
    super(SCENES.MAIN)
  }

  // load resources
  preload(): void {
    this.load.spritesheet(TEXTURE.PET.NAME, TEXTURE.PET.SRC.src, {
      frameWidth: TEXTURE.PET.WIDTH,
      frameHeight: TEXTURE.PET.HEIGHT,
    })
    this.load.spritesheet(TEXTURE.FOOD.NAME, TEXTURE.FOOD.SRC.src, {
      frameWidth: TEXTURE.FOOD.WIDTH,
      frameHeight: TEXTURE.FOOD.HEIGHT,
    })
  }

  create(): void {
    this.#createLogo()
    this.#createPlayer()
    this.#initCollide()
    this.#initScore()
    this.#bulletTime = new BulletTimeSystem(
      this.player,
      this.logo.getChildren() as Pet[],
    )
  }

  #createLogo(): void {
    this.logo = this.physics.add.group({
      // collideWorldBounds: true,
    })

    LOGO.forEach((row, rowIdx) => {
      row.split('').forEach((col, colIdx) => {
        if (col !== ' ') {
          const pet = new Pet(
            this,
            colIdx * TEXTURE.PET.WIDTH +
              (Math.max(this.cameras.main.width, MIN_WIDTH) -
                LOGO[0].length * TEXTURE.PET.WIDTH) /
                2,
            rowIdx * TEXTURE.PET.HEIGHT * 1.2 + TEXTURE.PET.HEIGHT, // offset a pet height
            TEXTURE.PET.NAME,
          )

          // add to group
          this.logo.add(pet)
        }
      })
    })
  }

  #createPlayer(): void {
    this.player = new Feeder(
      this,
      this.cameras.main.centerX - TEXTURE.PET.WIDTH / 2,
      this.cameras.main.height - TEXTURE.PET.HEIGHT * 2,
      TEXTURE.PET.NAME,
    )

    this.player.on('feed', (food: Food) => {
      food.addCollide(this.logo.getChildren())
      food.addCollide(this.player)
    })

    this.cameras.main.setBounds(
      0,
      0,
      Math.max(MIN_WIDTH, this.cameras.main.width),
      this.cameras.main.height,
    )
  }

  #initCollide(): void {
    this.physics.world.setBoundsCollision(true)
    // pets -> player
    this.physics.add.collider(this.logo.getChildren(), this.player, () => {
      this.player.collide()
    })
  }

  #initScore() {
    this.scene.get(SCENES.SCORE).scene.restart()
  }

  update(): void {
    // this.cameras.main.centerToSize()
    this.cameras.main.centerOnX(this.player.x)
    this.#bulletTime.update()
  }
}
