import { GoogleAnalyzer } from 'components/google-analyzer'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-Hans">
      <Head>
        <GoogleAnalyzer />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
