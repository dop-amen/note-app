import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'Notes App',
  description: 'A simple notes app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}