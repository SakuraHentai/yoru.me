import Feeder, { DIRECTION } from '../sprites/feeder'
import Pet from '../sprites/pet'

export const setSource = () => {}

export default class CollideSystem {
  #source: Feeder
  #targets: Pet[]
  #triggerDistance = 70
  #slowDownRatio = 0.05
  #inBulletTime = false

  constructor(source: Feeder, targets: Pet[]) {
    this.#source = source
    this.#targets = targets
  }

  #targetInRange(target: Pet): boolean {
    let inRange = false
    const targetInFrontOfSource =
      this.#source.getDirection() === DIRECTION.RIGHT
        ? target.x > this.#source.x - target.width
        : target.x < this.#source.x + this.#source.width
    if (targetInFrontOfSource) {
      inRange =
        Phaser.Math.Distance.Between(
          this.#source.x,
          this.#source.y,
          target.x,
          target.y
        ) <= this.#triggerDistance
    }
    return inRange
  }

  #checkBulletTime(): void {
    // get target is active && moving
    const activeTargets = this.#targets.filter(
      (t) => t.active && t.body.gravity.y > 0
    )
    const inRangeTargets = activeTargets.filter((t) => this.#targetInRange(t))
    if (inRangeTargets.length) {
      this.#inBulletTime = true
      // slow down source and target
      this.#source.setSpeedRatio(this.#slowDownRatio)
      inRangeTargets.forEach((t) => t.setSpeedRatio(this.#slowDownRatio))
    } else {
      // reset source and target
      if (!this.#inBulletTime) {
        return
      }
      this.#inBulletTime = false
      this.#source.setSpeedRatio()
      activeTargets.forEach((t) => t.setSpeedRatio())
    }
  }

  update(): void {
    this.#checkBulletTime()
  }
}
