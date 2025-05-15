'use client'

import Script from 'next/script'

import { useState } from 'react'

import ky from 'ky'
import useSWRImmutable from 'swr/immutable'

declare global {
  interface Window {
    wx: {
      config: (config: {
        appId: string
        timestamp: number
        nonceStr: string
        signature: string
        jsApiList: string[]
      }) => void
      ready: (callback: () => void) => void
      updateAppMessageShareData: (data: {
        title: string
        desc: string
        link: string
        imgUrl: string
        success?: () => void
      }) => void
      updateTimelineShareData: (data: {
        title: string
        link: string
        imgUrl: string
        success?: () => void
      }) => void
    }
  }
}

type ShareProps = {
  title: string
  desc: string
  imgURL: string
}

const setupSDK = (props: ShareProps) => {
  const wx = window.wx

  // wechat sdk may not be loaded
  if (!wx || !/MicroMessenger/i.test(navigator.userAgent)) return

  const currentURL = window.location.href
  return ky
    .post('https://mp.yoru.me/wxa/api/js-sdk', {
      json: {
        url: currentURL
      }
    })
    .json<{
      code: number
      data: {
        appId: string
        timestamp: number
        nonceStr: string
        signature: string
      }
    }>()
    .then((res) => {
      if (res.code === 0) {
        wx.config({
          // debug: true,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        })

        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: props.title,
            desc: props.desc,
            link: currentURL,
            imgUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${props.imgURL}`,
            success: function () {}
          })
          wx.updateTimelineShareData({
            title: props.title,
            link: currentURL,
            imgUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${props.imgURL}`,
            success: function () {}
          })
        })
      }
    })
}

const MpShare: React.FC<ShareProps> = (props) => {
  const [isSDKLoaded, setSDKLoaded] = useState(false)
  useSWRImmutable(
    () => {
      if (!isSDKLoaded) {
        return null
      }

      return [props, isSDKLoaded]
    },
    async () => {
      return setupSDK(props)
    }
  )

  return (
    <Script
      src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"
      onLoad={() => setSDKLoaded(true)}
    ></Script>
  )
}

export default MpShare
