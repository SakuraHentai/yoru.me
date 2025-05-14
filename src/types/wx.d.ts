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
