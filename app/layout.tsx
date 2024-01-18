import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/nav/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import SessionProvider from '@/components/SessionProvider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Twist blog',
    default: 'Twist blog'
  },
  description: 'Blog posts about frontend development',
  openGraph: {
    title: 'Twist blog',
    url: process.env.SITE_URL,
    siteName: 'Twist blog',
    images: '/vercel.svg',
    type: 'website'
  },
  keywords: ['frontend', 'frontend tips', 'frontend blog', 'twist blog']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className='max-w-7x1 mx-auto p-10 space-y-10'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <SessionProvider />
      </body>
    </html>
  )
}
