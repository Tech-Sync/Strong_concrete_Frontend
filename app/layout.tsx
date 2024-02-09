import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { MantineProvider } from '@mantine/core';


const inter = Inter({ subsets: ['latin'] })
import '../styles/tailwind.css';
export const metadata: Metadata = {
  title: 'Strong Concrete Admin Dashboard',
  description: 'Strong Concrete Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
    <MantineProvider>

          {children}
    </MantineProvider>

        </body>
      </html>
    </Providers>
  )
}

