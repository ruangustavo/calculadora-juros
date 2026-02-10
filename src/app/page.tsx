import { Calculator } from 'lucide-react'
import { FormCompoundInterestSimulator } from '@/components/form-compound-interest-simulator'

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="size-6 text-primary" />
          <h1 className="font-semibold text-lg md:text-xl">
            Simulador de Juros Compostos
          </h1>
        </div>
        <p className="ml-8 text-muted-foreground text-sm">
          Calcule o crescimento do seu investimento com juros compostos
        </p>
      </div>
      <FormCompoundInterestSimulator />
    </div>
  )
}
