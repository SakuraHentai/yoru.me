'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from '../../utils/use-isomorphic-layout-effect'
import styles from '../styles/game.module.scss'

const Loading = () => {
  const loadingText = useMemo(() => {
    return 'Loading...'.split('')
  }, [])

  return (
    <div className={styles.loading}>
      {loadingText.map((char, idx) => {
        return <span key={`${char}-${idx}`}>{char}</span>
      })}
    </div>
  )
}

const Game = () => {
  // game id for phaser
  const gameWrapper = 'yoru'
  const [loading, setLoading] = useState(true)
  const needGameModule = useRef(true)
  const gameModule = useRef<{ init: (parent: string) => Phaser.Game }>(null)
  const gameInstance = useRef<Phaser.Game>(null)

  // load game module
  const loadGame = useCallback(async () => {
    if (needGameModule.current) {
      needGameModule.current = false
      gameModule.current = await import('./index')
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
      gameInstance.current = null
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
