'use client'

import localFont from 'next/font/local'

import { useCallback, useMemo, useRef, useState } from 'react'

import { cn } from '@/utils'

import { motion } from 'motion/react'

import { useIsomorphicLayoutEffect } from '../../utils/use-isomorphic-layout-effect'

const fipps = localFont({
  src: './assets/Fipps-Regular.ttf'
})
const Loading = () => {
  const loadingText = useMemo(() => {
    return 'Loading...'.split('')
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center',
        fipps.className
      )}
    >
      {loadingText.map((char, idx) => {
        return (
          <motion.span
            key={`${char}-${idx}`}
            initial={{ y: 0 }}
            animate={{ y: -10 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.2,
              delay: idx * 0.1
            }}
          >
            {char}
          </motion.span>
        )
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
      <div id={gameWrapper} />
      {loading && <Loading />}
    </>
  )
}

export default Game
