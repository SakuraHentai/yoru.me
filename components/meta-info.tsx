import Head from 'next/head'

import React from 'react'

import avatar from '../assets/avatar.png'
import { GoogleAnalyzer } from './google-analyzer'
import MpShare from './mp-share'

export type MetaProps = {
  title: string
  description?: string
  keywords?: string
  summary?: string
}

type Props = {
  meta?: MetaProps
}

const MetaInfo: React.FC<Props> = ({ meta }) => {
  const metaInfo = Object.assign(
    {},
    {
      description: 'Yoru 小游戏和一些前端安利',
    },
    {
      ...meta,
      title: meta?.title ? `${meta.title} | Yoru.me` : 'Yoru.me',
    },
  )

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content={metaInfo.description}></meta>
        <meta name="author" content="Derek"></meta>
        <title>{metaInfo.title}</title>
        {meta?.summary && (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.min.css"
            integrity="sha512-MbysAYimH1hH2xYzkkMHB6MqxBqfP0megxsCLknbYqHVwXTCg9IqHbk+ZP/vnhO8UEW6PaXAkKe2vQ+SWACxxA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        )}
        <GoogleAnalyzer />
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
