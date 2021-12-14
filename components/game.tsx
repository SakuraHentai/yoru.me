import { useState, useMemo, useCallback } from 'react'
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-layout-effect'
import styles from '../styles/game.module.scss'
import { useSprings, a } from 'react-spring'

const Loading = () => {
  const loadingText = useMemo(() => {
    return 'Loading...'.split('')
  }, [])

  const [springs, api] = useSprings(loadingText.length, (i) => ({
    y: 0,
  }))

  useIsomorphicLayoutEffect(() => {
    let handler: ReturnType<typeof setTimeout>
    const run = () => {
      api.start((i) => ({
        from: { y: 0 },
        y: 1,
        delay: i * 100,
      }))
      handler = setTimeout(run, 2e3)
    }

    run()
    return () => {
      clearTimeout(handler)
    }
  }, [])

  return (
    <div className={styles.loading}>
      {springs.map((prop, i) => (
        <a.span
          key={i}
          style={{
            y: prop.y.to([0, 0.5, 1], [0, 1, 0]).to((y) => -6 * y),
          }}
        >
          {loadingText[i]}
        </a.span>
      ))}
    </div>
  )
}

const Game = () => {
  // game id for phaser
  const gameWrapper = 'yoru'
  const [loading, setLoading] = useState(true)

  // define load and init game
  const initGame = useCallback(async () => {
    const gameInst = (await import('../game/index')).default.init(gameWrapper)
    gameInst.events.on(Phaser.Scenes.Events.READY, () => {
      setLoading(false)
    })
    return gameInst
  }, [])

  // load game on mount
  useIsomorphicLayoutEffect(() => {
    let gameInst: Phaser.Game
    initGame().then((g) => {
      gameInst = g
    })
    return () => {
      gameInst?.destroy(true)
    }
  }, [])

  return (
    <>
      <div id={gameWrapper} className={styles.yoru} />
      {loading && <Loading />}
    </>
  )
}

export default Game
