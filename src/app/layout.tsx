import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bilol Sanatillaev — iOS Engineer',
  description:
    'iOS Engineer with 10+ shipped apps across fintech, crypto, healthtech, logistics, and F&B. Swift, SwiftUI, UIKit, Clean Architecture.',
  keywords: [
    'iOS Engineer',
    'Swift',
    'SwiftUI',
    'UIKit',
    'Clean Architecture',
    'Mobile Developer',
    'Bilol Sanatillaev',
  ],
  authors: [{ name: 'Bilol Sanatillaev' }],
  openGraph: {
    title: 'Bilol Sanatillaev — iOS Engineer',
    description:
      'iOS Engineer with 10+ shipped apps. Swift, SwiftUI, UIKit, Clean Architecture.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-void text-white antialiased">
        {children}
      </body>
    </html>
  )
}
