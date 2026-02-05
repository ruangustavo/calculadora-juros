import Image from 'next/image'
import { FormCompoundInterestSimulator } from '@/components/form-compound-interest-simulator'
import Logo from '../../public/logo.png'

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={28} height={28} />

        <h1 className="font-semibold text-lg md:text-xl">
          Simulador de Juros Compostos
        </h1>
      </div>

      <FormCompoundInterestSimulator />
    </div>
  )
}
