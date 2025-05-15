'use client'

import { ProgressProvider } from '@bprogress/next/app'

import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const ProgressBar: FC<Props> = ({ children }) => {
  return (
    <ProgressProvider height="3px" color="rgba(22,101,52)" shallowRouting>
      {children}
    </ProgressProvider>
  )
}
