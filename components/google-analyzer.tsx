'use client'

import Script from 'next/script'

const GA_ID = 'G-FE8Y12MDJM'

export const GoogleAnalyzer = () => {
  return <>
    <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-script" strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
  </>
}