import { FormCompoundInterestSimulator } from '@/components/form-compound-interest-simulator'
import Image from 'next/image'
import Logo from '../../public/logo.png'

export default function Home() {
  return (
    <div className="container p-4 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Image src={Logo} alt="Logo" width={28} height={28} />

        <h1 className="text-lg md:text-xl font-semibold">
          Simulador de Juros Compostos
        </h1>
      </div>

      <FormCompoundInterestSimulator />
    </div>
  )
}
