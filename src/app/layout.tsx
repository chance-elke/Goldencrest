import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTracker from '@/components/PageTracker'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Gold Investments Guide | Best Gold IRA Companies 2026',
    template: '%s | Gold Investments Guide',
  },
  description:
    'Compare the best gold IRA companies for 2026. Independent reviews, ratings, and expert analysis to help you protect your retirement savings with precious metals.',
  keywords: [
    'gold IRA',
    'best gold IRA companies',
    'gold IRA review',
    'precious metals IRA',
    'gold investment',
    'silver IRA',
    '401k to gold',
    'IRA rollover',
    'Augusta Precious Metals',
    'American Hartford Gold',
    'Goldco',
    'Birch Gold Group',
  ],
  authors: [{ name: 'Gold Investments Guide' }],
  creator: 'Gold Investments Guide',
  publisher: 'Gold Investments Guide',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    siteName: 'Gold Investments Guide',
    title: 'Gold Investments Guide | Best Gold IRA Companies 2026',
    description:
      'Compare the best gold IRA companies for 2026. Independent reviews, ratings, and expert analysis to help you protect your retirement savings with precious metals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Investments Guide | Best Gold IRA Companies 2026',
    description:
      'Compare the best gold IRA companies for 2026. Independent reviews and ratings.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
