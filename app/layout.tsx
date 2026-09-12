import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nitesh Singh | Data Analytics & Machine Learning',
  description: 'Computer Science undergraduate with hands-on experience in full-stack ML systems, predictive modeling, and data visualization.',
  keywords: [
    'Nitesh Singh',
    'portfolio',
    'developer',
    'machine learning',
    'data analytics',
  ],
  openGraph: {
    title: 'Nitesh Singh | Data Analytics & Machine Learning',
    description: 'Computer Science undergraduate with hands-on experience in full-stack ML systems, predictive modeling, and data visualization.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitesh Singh | Data Analytics & Machine Learning',
    description: 'Computer Science undergraduate with hands-on experience in full-stack ML systems, predictive modeling, and data visualization.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F3F0FA',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <body className="relative min-h-screen selection:bg-[#DDD4F8] selection:text-[#121217] font-sans">
        {children}
      </body>
    </html>
  )
}
