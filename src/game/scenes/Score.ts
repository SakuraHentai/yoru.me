import { FULLSCORE, SCENES } from '../config'

export default class ScoreScene extends Phaser.Scene {
  private mainScene!: MainScene
  private score!: number
  private scoreText!: Phaser.GameObjects.Text | null
  private scoreTextWidth = 500
  private scoreTextHeight = 80
  constructor() {
    super(SCENES.SCORE)
  }

  create(): void {
    this.mainScene = this.scene.get(SCENES.MAIN) as MainScene
    // reset score
    this.score = 0

    // add text
    this.scoreText = this.add.text(
      (this.cameras.main.width - this.scoreTextWidth) / 2,
      (this.cameras.main.height - this.scoreTextHeight) / 2,
      `Score: ${this.score}`,
      {
        fontFamily: 'score',
        fontSize: '30px',
        color: '#ccc',
        fixedWidth: this.scoreTextWidth,
        fixedHeight: this.scoreTextHeight,
        align: 'center',
      }
    )
  }

  update(): void {
    const score = FULLSCORE - this.mainScene.logo.countActive()
    if (score > this.score) {
      this.score = score
      this.updateScore()
    }
  }

  private updateScore(): void {
    if (this.score === FULLSCORE) {
      this.scoreText?.setText('Congratulations!')
    } else {
      this.scoreText?.setText(`Score: ${this.score}`)
    }
  }
}
