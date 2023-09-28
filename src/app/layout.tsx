import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Navbar from '@/components/header'
import { getCurrentUser } from '@/models/user/services'

import AuthProvider from '../providers/auth-provider'
import ModalsProvider from '../providers/modals-provider'
import ToastProvider from '../providers/toast-provider'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone by zakaria magdy',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
    ],
  },
  themeColor: '#ffffff',
  colorScheme: 'light',
  openGraph: {
    url: 'https://airbnb.com',
    title: 'Airbnb',
    description: 'Airbnb clone by zakaria magdy',
    images: ['/images/logo.png'],
    type: 'website',
    siteName: 'Airbnb',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zakariamagdy',
    creator: '@zakariamagdy',
    title: 'Airbnb',
    description: 'Airbnb clone by zakaria magdy',
    images: ['/images/logo.png'],
  },
  other: {
    'msapplication-TileColor': '#da532c',
  },
  keywords: ['airbnb', 'clone', 'zakaria', 'magdy'],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider />
          <ModalsProvider />
          <Navbar currentUser={currentUser} />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
