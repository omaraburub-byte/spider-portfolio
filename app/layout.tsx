// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Omar - Creative Technologist',
  description: 'Building portals between worlds through code and creativity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}