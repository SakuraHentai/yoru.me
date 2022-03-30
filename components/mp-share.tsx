import Script from 'next/script'
import { useEffect, useState } from 'react'

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
  fetch('https://mp.yoru.me/wxa/api/js-sdk', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ url: currentURL }),
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res.code === 0) {
        wx.config({
          // debug: true,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
        })

        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: props.title,
            desc: props.desc,
            link: currentURL,
            imgUrl: `https://yoru.me${props.imgURL}`,
            success: function () {},
          })
          wx.updateTimelineShareData({
            title: props.title,
            link: currentURL,
            imgUrl: `https://yoru.me${props.imgURL}`,
            success: function () {},
          })
        })
      }
    })
}

const MpShare: React.FC<ShareProps> = (props) => {
  const [isSDKLoaded, setSDKLoaded] = useState(false)

  useEffect(() => {
    setupSDK(props)
  }, [props, isSDKLoaded])

  return (
    <Script
      src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"
      onLoad={() => setSDKLoaded(true)}
    ></Script>
  )
}

export default MpShare
