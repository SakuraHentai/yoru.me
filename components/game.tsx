import { useCallback, useMemo, useRef, useState } from 'react'
import { a, useSprings } from 'react-spring'
import styles from '../styles/game.module.scss'
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-layout-effect'

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
  const needGameModule = useRef(true)
  const gameModule = useRef<{ init: (parent: string) => Phaser.Game }>()
  const gameInstance = useRef<Phaser.Game>()

  // load game module
  const loadGame = useCallback(async () => {
    if (needGameModule.current) {
      needGameModule.current = false
      gameModule.current = (await import('../game/index')).default
    }
  }, [])

  // init game on mount
  useIsomorphicLayoutEffect(() => {
    loadGame().then(() => {
      if (gameModule.current) {
        gameInstance.current = gameModule.current.init(gameWrapper)
        gameInstance.current.events.on(Phaser.Scenes.Events.READY, () => {
          setLoading(false)
        })
      }
    })
    return () => {
      gameInstance.current?.destroy(true)
      gameInstance.current = undefined
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
