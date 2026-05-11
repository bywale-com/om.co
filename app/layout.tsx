import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Om Coda Consulting',
  description:
    'Professional services consultancy — partnerships, offers, and process. Legal, immigration, financial services. Milestone-priced, hypothesis-led engagements.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="layout-shell">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
