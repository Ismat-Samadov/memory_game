import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Secure Password Generator",
              "description": "Generate secure, random passwords, passphrases, and PINs with advanced customization options. Free online password generator with strength analysis.",
              "url": "https://pwd-gen-vert.vercel.app/",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Secure Password Generator"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}