import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function Blog({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const onEnterPage = () => {
      NProgress.start()
    }
    const onPageLoaded = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', onEnterPage)
    router.events.on('routeChangeComplete', onPageLoaded)
    router.events.on('routeChangeError', onPageLoaded)

    return () => {
      router.events.off('routeChangeStart', onEnterPage)
      router.events.off('routeChangeComplete', onPageLoaded)
      router.events.off('routeChangeError', onPageLoaded)
    }
  }, [router])

  return <Component {...pageProps} />
}

export default Blog
