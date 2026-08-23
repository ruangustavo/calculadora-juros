import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { InterestResult } from '@/components/interest-result'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Resultado do Cálculo | Simulador de Juros Compostos',
  description:
    'Veja o resultado detalhado do cálculo de juros compostos do seu investimento',
  alternates: {
    canonical: 'https://juros.ruangustavo.com/calculo',
  },
  openGraph: {
    title: 'Resultado do Cálculo | Simulador de Juros Compostos',
    description:
      'Veja o resultado detalhado do cálculo de juros compostos do seu investimento',
    url: 'https://juros.ruangustavo.com/calculo',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
          )}
        >
          <ArrowLeft />
          <span>Voltar</span>
        </Link>
      </div>
      <Suspense fallback={null}>
        <InterestResult />
      </Suspense>
    </div>
  )
}
