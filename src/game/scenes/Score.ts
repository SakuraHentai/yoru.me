import { FULLSCORE, SCENES } from '../config'
import MainScene from '../scenes/Main'
export default class ScoreScene extends Phaser.Scene {
  private mainScene!: MainScene
  private score!: number
  private duration!: number
  private margin = 20

  // text
  private scoreText!: Phaser.GameObjects.Text
  private scoreTextWidth = 500
  private scoreTextHeight = 80

  // time
  private scoreTime!: Phaser.GameObjects.Text
  private scoreTimeWidth = 500
  private scoreTimeHeight = 80

  constructor() {
    super(SCENES.SCORE)
  }

  create(): void {
    this.mainScene = this.scene.get(SCENES.MAIN) as MainScene
    // reset score
    this.score = 0
    this.duration = 0

    // add text
    this.scoreText = this.add.text(
      this.margin,
      this.cameras.main.height - this.scoreTextHeight - this.scoreTimeHeight,
      `Score: ${this.score}`,
      {
        fontFamily: 'score',
        fontSize: '30px',
        color: '#ccc',
        fixedWidth: this.scoreTextWidth,
        fixedHeight: this.scoreTextHeight,
      }
    )
    this.scoreTime = this.add.text(
      this.margin,
      this.cameras.main.height - this.scoreTimeHeight,
      `${this.duration}`,
      {
        fontFamily: 'score',
        fontSize: '30px',
        color: '#ccc',
        fixedWidth: this.scoreTimeWidth,
        fixedHeight: this.scoreTimeHeight,
      }
    )

    this.scene.moveDown()
  }

  update(_: number, delta: number): void {
    const score = FULLSCORE - this.mainScene.logo.countActive()
    if (score > this.score) {
      this.score = score
      this.updateScore()
    }
    this.updateTime(delta)
  }

  private updateScore(): void {
    if (this.score === FULLSCORE) {
      this.scoreText?.setText('Congratulations!')
    } else {
      this.scoreText?.setText(`Score: ${this.score}`)
    }
  }

  private updateTime(delta: number): void {
    if (this.score !== FULLSCORE) {
      this.duration += delta
      this.scoreTime.setText(`${this.parseTime()}`)
    }
  }

  private parseTime(): string {
    const s = this.duration / 1e3,
      m = Math.floor(s / 60),
      h = Math.floor(m / 60)
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${(s % 60).toFixed(3).toString().padStart(6, '0')}`
  }
}
