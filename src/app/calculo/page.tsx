import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { InterestResult } from '@/components/interest-result'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
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
