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
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta
        name="description"
        content={
          meta?.description || 'Yoru games and some posts about frontend.'
        }
      ></meta>
      <meta
        name="keywords"
        content={meta?.keywords || 'yoru,sakurahentai'}
      ></meta>
      <meta name="author" content="Derek"></meta>
    </Head>
  )
}

export default MetaInfo
