import { InterestResult } from '@/components/interest-result'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  return (
    <div className="container p-4 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
          )}
        >
          <ArrowLeft className="size-4" />
          <span className="ml-2">Voltar</span>
        </Link>
      </div>

      <InterestResult searchParams={searchParams} />
    </div>
  )
}
