import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora de juros compostos',
  description:
    'Utilize esta calculadora para simular cálculos de juros compostos em investimentos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'min-h-svh antialiased bg-zinc-50')}>
        {children}
      </body>
    </html>
  )
}
