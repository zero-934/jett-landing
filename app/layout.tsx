import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jett Casino',
  description: 'Provably fair crypto casino. Play now.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
