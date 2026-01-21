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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-black text-white">
        <Navbar />
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
        {children}
        
        className="bg-black text-white overscroll-none"

      </body>
    </html>
  )
}
