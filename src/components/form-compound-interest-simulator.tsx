'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CompoundInterestSimulatorForm } from '@/types'
import { useRouter } from 'next/navigation'
import BrazilianCurrencyInput from './brazilian-currency-input'

export function FormCompoundInterestSimulator() {
  const router = useRouter()

  const { handleSubmit, register, control } =
    useForm<CompoundInterestSimulatorForm>({
      defaultValues: {
        compoundInterest: 8,
        initialValue: 0,
        monthlyValue: 0,
        timespan: 1,
        interestPeriod: 'yearly',
        timespanPeriod: 'years',
      },
    })

  const handleSimulateCompoundInterest = ({
    compoundInterest,
    initialValue,
    monthlyValue,
    interestPeriod,
    timespan,
    timespanPeriod,
  }: CompoundInterestSimulatorForm) => {
    const params = [
      `initialValue=${initialValue}`,
      `monthlyValue=${monthlyValue}`,
      `compoundInterest=${compoundInterest}`,
      `interestPeriod=${interestPeriod}`,
      `timespan=${timespan}`,
      `timespanPeriod=${timespanPeriod}`,
    ].join('&')

    router.push(`calculo?${params}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Insira os dados para simulação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-8"
          onSubmit={handleSubmit(handleSimulateCompoundInterest)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="initial_value">Valor inicial</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-foreground/20 bg-zinc-50 text-muted-foreground sm:text-sm select-none">
                  R$
                </span>
                <BrazilianCurrencyInput control={control} name="initialValue" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_value">Valor mensal</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-foreground/20 bg-zinc-50 text-muted-foreground sm:text-sm select-none">
                  R$
                </span>
                <BrazilianCurrencyInput control={control} name="monthlyValue" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compound_interest">Taxa de juros</Label>
              <div className="flex">
                <Input
                  type="number"
                  className="rounded-r-none"
                  {...register('compoundInterest')}
                />
                <Controller
                  name="interestPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[100px] rounded-l-none">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearly">anual</SelectItem>
                        <SelectItem value="monthly">mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timespan">Período</Label>
              <div className="flex">
                <Input
                  type="number"
                  className="rounded-r-none"
                  {...register('timespan')}
                />
                <Controller
                  name="timespanPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[100px] rounded-l-none">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">ano(s)</SelectItem>
                        <SelectItem value="months">mes(es)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit">Calcular</Button>
        </form>
      </CardContent>
    </Card>
  )
}
