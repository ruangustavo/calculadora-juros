import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'katex/dist/katex.min.css'
import Script from 'next/script'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://juros.ruangustavo.com'),
  title: 'Calculadora de juros compostos',
  description:
    'Utilize esta calculadora para simular cálculos de juros compostos em investimentos',
  openGraph: {
    title: 'Calculadora de Juros Compostos',
    description:
      'Utilize esta calculadora para simular cálculos de juros compostos em investimentos',
    url: 'https://juros.ruangustavo.com',
    siteName: 'Calculadora de Juros Compostos',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Juros Compostos',
    description:
      'Utilize esta calculadora para simular cálculos de juros compostos em investimentos',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={cn(inter.className, 'min-h-dvh bg-background antialiased')}
      >
        {children}
      </body>
    </html>
  )
}
