type configProp = {
  debug?: boolean
  appId: string
  timestamp: string
  nonceStr: string
  signature: string
  jsApiList: string[]
}

interface Window {
  wx: {
    config(opts: configProp): void
    ready(callback: () => void): void
    updateAppMessageShareData(opts: {
      title: string
      desc: string
      link: string
      imgUrl: string
      success: () => void
    }): void
    updateTimelineShareData(opts: {
      title: string
      link: string
      imgUrl: string
      success: () => void
    }): void
  }
}
