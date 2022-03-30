import Head from 'next/head'
import React from 'react'
import avatar from '../assets/avatar.png'
import MpShare from './mp-share'

export type MetaProps = {
  title: string
  keywords: string
  description?: string
}

type Props = {
  meta?: MetaProps
}

const MetaInfo: React.FC<Props> = ({ meta }) => {
  const metaInfo = Object.assign(
    {},
    {
      description: 'Yoru 小游戏和一些前端安利',
      keywords: 'yoru,sakurahentai,前端安利',
    },
    {
      ...meta,
      title: meta?.title ? `${meta.title} | Yoru.me` : 'Yoru.me',
    }
  )

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content={metaInfo.description}></meta>
        <meta name="keywords" content={metaInfo.keywords}></meta>
        <meta name="author" content="Derek"></meta>
        <title>{metaInfo.title}</title>
      </Head>
      <MpShare
        title={metaInfo.title}
        desc={metaInfo.description}
        imgURL={avatar.src}
      />
    </>
  )
}

export default MetaInfo
