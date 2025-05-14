import { FULL_SCORE, SCENES } from '../config'
import MainScene from './main'

export default class ScoreScene extends Phaser.Scene {
  #mainScene!: MainScene
  #score!: number
  #duration!: number
  #margin = 20

  // text
  #scoreText!: Phaser.GameObjects.Text
  #scoreTextWidth = 500
  #scoreTextHeight = 80

  // time
  #scoreTime!: Phaser.GameObjects.Text
  #scoreTimeWidth = 500
  #scoreTimeHeight = 80

  constructor() {
    super(SCENES.SCORE)
  }

  create(): void {
    this.#mainScene = this.scene.get(SCENES.MAIN) as MainScene
    // reset score
    this.#score = 0
    this.#duration = 0

    // add text
    this.#scoreText = this.add.text(
      this.#margin,
      this.cameras.main.height - this.#scoreTextHeight - this.#scoreTimeHeight,
      `Score: ${this.#score}`,
      {
        fontFamily: 'Fipps',
        fontSize: '30px',
        color: '#ccc',
        fixedWidth: this.#scoreTextWidth,
        fixedHeight: this.#scoreTextHeight,
      },
    )
    this.#scoreTime = this.add.text(
      this.#margin,
      this.cameras.main.height - this.#scoreTimeHeight,
      `${this.#duration}`,
      {
        fontFamily: 'Fipps',
        fontSize: '30px',
        color: '#ccc',
        fixedWidth: this.#scoreTimeWidth,
        fixedHeight: this.#scoreTimeHeight,
      },
    )

    this.scene.moveDown()
  }

  update(_: number, delta: number): void {
    const score = FULL_SCORE - this.#mainScene.logo.countActive()
    if (score > this.#score) {
      this.#score = score
      this.#updateScore()
    }
    this.#updateTime(delta)
  }

  #updateScore(): void {
    if (this.#score === FULL_SCORE) {
      this.#scoreText?.setText('Congratulations!')
    } else {
      this.#scoreText?.setText(`Score: ${this.#score}`)
    }
  }

  #updateTime(delta: number): void {
    if (this.#score !== FULL_SCORE) {
      this.#duration += delta
      this.#scoreTime.setText(`${this.#parseTime()}`)
    }
  }

  #parseTime(): string {
    const s = this.#duration / 1e3,
      m = Math.floor(s / 60)
    return `${m.toString().padStart(2, '0')}:${(s % 60)
      .toFixed(3)
      .toString()
      .padStart(6, '0')}`
  }
}
