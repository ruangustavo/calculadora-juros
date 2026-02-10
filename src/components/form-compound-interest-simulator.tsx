'use client'

import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { CompoundInterestSimulatorForm } from '@/types'
import BrazilianCurrencyInput from './brazilian-currency-input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Button } from './ui/button'
import { ButtonGroup } from './ui/button-group'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from './ui/input-group'

export function FormCompoundInterestSimulator() {
  const router = useRouter()

  const { handleSubmit, register, control, watch, reset } =
    useForm<CompoundInterestSimulatorForm>({
      defaultValues: {
        compoundInterest: 8,
        initialValue: 0,
        monthlyValue: 0,
        timespan: 1,
        interestPeriod: 'yearly',
        timespanPeriod: 'years',
        contributionIncrease: 0,
      },
    })

  const timespanPeriod = watch('timespanPeriod')
  const initialValue = watch('initialValue')
  const monthlyValue = watch('monthlyValue')

  const handleSimulateCompoundInterest = ({
    compoundInterest,
    initialValue,
    monthlyValue,
    interestPeriod,
    timespan,
    timespanPeriod,
    contributionIncrease,
  }: CompoundInterestSimulatorForm) => {
    const params = [
      `initialValue=${initialValue}`,
      `monthlyValue=${monthlyValue}`,
      `compoundInterest=${compoundInterest}`,
      `interestPeriod=${interestPeriod}`,
      `timespan=${timespan}`,
      `timespanPeriod=${timespanPeriod}`,
      `contributionIncrease=${contributionIncrease}`,
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initial_value">Valor inicial</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <BrazilianCurrencyInput control={control} name="initialValue" />
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_value">Valor mensal</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <BrazilianCurrencyInput control={control} name="monthlyValue" />
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compound_interest">Taxa de juros</Label>
              <ButtonGroup>
                <Input type="number" {...register('compoundInterest')} />
                <Controller
                  name="interestPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearly">anual</SelectItem>
                        <SelectItem value="monthly">mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </ButtonGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timespan">Período</Label>
              <ButtonGroup>
                <Input type="number" {...register('timespan')} />
                <Controller
                  name="timespanPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          timespanPeriod === 'years'
                            ? 'w-[100px]'
                            : 'w-[110px]',
                        )}
                      >
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">ano(s)</SelectItem>
                        <SelectItem value="months">mes(es)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </ButtonGroup>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="customization">
              <AccordionTrigger className="py-1">
                Personalização
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Label htmlFor="contribution_increase">
                    Aumento anual dos aportes
                  </Label>
                  <InputGroup>
                    <Controller
                      name="contributionIncrease"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <NumericFormat
                          id="contribution_increase"
                          customInput={InputGroupInput}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          fixedDecimalScale
                          allowNegative={false}
                          value={value}
                          onValueChange={(values) => onChange(values.value)}
                          placeholder="0,00"
                        />
                      )}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Limpar
            </Button>
            <Button type="submit" disabled={!initialValue && !monthlyValue}>
              Calcular
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
