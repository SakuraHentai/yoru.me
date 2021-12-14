import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function Blog({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default Blog
