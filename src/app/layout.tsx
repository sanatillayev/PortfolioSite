import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
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
  metadataBase: new URL('https://sanatillayev.com'),
  title: {
    default: 'Bilol Sanatillaev — iOS Engineer | Swift, SwiftUI, UIKit',
    template: '%s | Bilol Sanatillaev',
  },
  description:
    'iOS Engineer with 10+ shipped apps across fintech, crypto, healthtech, logistics, and F&B. Specializing in Swift, SwiftUI, UIKit, and Clean Architecture. Based in Tashkent, available for remote work worldwide.',
  keywords: [
    'Bilol Sanatillaev',
    'iOS Engineer',
    'iOS Developer',
    'Swift Developer',
    'SwiftUI',
    'UIKit',
    'Clean Architecture',
    'Mobile Developer',
    'Tashkent',
    'Remote iOS Developer',
    'Freelance iOS Engineer',
    'App Developer Uzbekistan',
    'Core Bluetooth',
    'Fintech iOS',
    'HealthTech iOS',
  ],
  authors: [{ name: 'Bilol Sanatillaev', url: 'https://sanatillayev.com' }],
  creator: 'Bilol Sanatillaev',
  openGraph: {
    title: 'Bilol Sanatillaev — iOS Engineer',
    description:
      'iOS Engineer with 10+ shipped apps across fintech, crypto, healthtech, logistics, and F&B. Swift, SwiftUI, UIKit, Clean Architecture.',
    url: 'https://sanatillayev.com',
    siteName: 'Bilol Sanatillaev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilol Sanatillaev — iOS Engineer',
    description:
      'iOS Engineer with 10+ shipped apps. Swift, SwiftUI, UIKit, Clean Architecture.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sanatillayev.com',
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
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
