import Head from 'next/head'
import React from 'react'

export type MetaProps = {
  title: string
  keywords: string
  description?: string
}

type Props = {
  meta?: MetaProps
}

const MetaInfo: React.FC<Props> = ({ meta }) => {
  const title = meta?.title ? `${meta.title} | Yoru.me` : 'Yoru.me'

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta
        name="description"
        content={meta?.description || 'Yoru 小游戏和一些前端安利'}
      ></meta>
      <meta
        name="keywords"
        content={meta?.keywords || 'yoru,sakurahentai,前端安利'}
      ></meta>
      <meta name="author" content="Derek"></meta>
      <title>{title}</title>
    </Head>
  )
}

export default MetaInfo
