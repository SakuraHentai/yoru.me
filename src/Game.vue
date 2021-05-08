<template>
  <div :id="gameWorld">
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script lang="ts">
import * as Phaser from 'phaser'
interface InitData {
  gameWorld: string
  loading: boolean
}
let game: Phaser.Game | null

export default {
  data(): InitData {
    return {
      gameWorld: 'yoru',
      loading: true,
    }
  },
  async mounted(this: InitData): Promise<void> {
    const gameModule = await import('@/game/index')
    game = gameModule.init(this.gameWorld)
    this.loading = false
    // eslint-disable-next-line
    console.log(
      `%c Hihi! Github: https://github.com/SakuraHentai`,
      'color: #009688'
    )
  },
  destroyed(this: InitData): void {
    game?.destroy(true)
  },
}
</script>

<style lang="scss">
// ref: https://www.dafont.com/fipps.font
@font-face {
  font-family: score;
  src: url('./assets/Fipps-Regular.ttf');
  font-weight: normal;
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#yoru {
  height: 100vh;
  font-family: score;
  text-align: center;
}
</style>
