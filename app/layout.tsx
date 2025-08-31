import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio - Your Name',
  description: 'Modern portfolio website with liquid glass design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}