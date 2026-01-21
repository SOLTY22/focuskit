import './globals.css'
import Navbar from '@/components/Navbar'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'FocusKit',
  description: 'Simple productivity tools to help you focus',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Google AdSense – مرة واحدة فقط */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6627537476082218"
          crossOrigin="anonymous"
        />

        {/* Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                })
              }
            `,
          }}
        />
      </head>

      <body className="bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
