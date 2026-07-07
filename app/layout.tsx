import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { BackgroundMusic } from '@/components/background-music'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Preloader } from '@/components/preloader'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nitesh Singh — Developer & Creative Technologist',
  description:
    'A deep-universe portfolio exploring software, AI, design, and creative engineering — projects, experience, hackathons, and more.',
  keywords: [
    'Nitesh Singh',
    'portfolio',
    'developer',
    'software engineer',
    'AI',
    'machine learning',
    'data analytics',
    'creative technologist',
    '3D',
    'WebGL',
  ],
  openGraph: {
    title: 'Nitesh Singh — Developer & Creative Technologist',
    description:
      'A deep-universe portfolio exploring software, AI, design, and creative engineering.',
    type: 'website',
    // Add your deployed URL here when ready, e.g. 'https://niteshsingh.dev'
    // url: 'https://your-domain.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitesh Singh — Developer & Creative Technologist',
    description: 'A deep-universe portfolio exploring software, AI, design, and creative engineering.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fff7ed',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Preloader />
        <ScrollToTop />
        {children}
        <BackgroundMusic />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
