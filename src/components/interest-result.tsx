'use client'

import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { CompoundInterestMonth } from '@/types'
import { CompoundInterestChart } from './compound-interest-chart'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function InterestResult() {
  const searchParams = useSearchParams()
  const searchParamsSchema = z.object({
    initialValue: z.coerce.number(),
    monthlyValue: z.coerce.number(),
    compoundInterest: z.coerce.number(),
    interestPeriod: z.enum(['yearly', 'monthly']),
    timespan: z.coerce.number(),
    timespanPeriod: z.enum(['years', 'months']),
    contributionIncrease: z.coerce.number().optional().default(0),
  })

  const {
    initialValue,
    monthlyValue,
    compoundInterest,
    interestPeriod,
    timespan,
    timespanPeriod,
    contributionIncrease,
  } = searchParamsSchema.parse(Object.fromEntries(searchParams))

  const calculateInterest = () => {
    const periods = timespanPeriod === 'years' ? timespan * 12 : timespan

    const rate =
      interestPeriod === 'yearly'
        ? compoundInterest / 12 / 100
        : compoundInterest / 100
    const contributionIncreaseRate = contributionIncrease / 100

    let balance = initialValue
    let totalContributions = initialValue
    let totalInterest = 0
    const results: CompoundInterestMonth[] = []

    for (let month = 1; month <= periods; month++) {
      const yearlyContributionMultiplier = Math.floor((month - 1) / 12)
      const monthlyContribution =
        monthlyValue *
        (1 + contributionIncreaseRate) ** yearlyContributionMultiplier
      const increaseApplied =
        contributionIncreaseRate > 0 && month > 1 && (month - 1) % 12 === 0

      if (month !== 1) {
        balance += monthlyContribution
      }

      totalContributions += monthlyContribution

      const monthlyInterest = balance * rate
      balance += monthlyInterest
      totalInterest += monthlyInterest

      results.push({
        month,
        monthlyInterest,
        monthlyContribution,
        increaseApplied,
        contributionIncreaseRate,
        balance,
        balanceWithoutInterest: balance - totalInterest,
        totalContributions,
        totalInterest,
      })
    }

    return {
      finalBalance: totalContributions + totalInterest,
      finalTotalContributions: totalContributions,
      finalTotalInterest: totalInterest,
      results,
    }
  }

  const results = calculateInterest()

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="gap-0">
          <CardHeader>
            <CardTitle className="font-medium text-sm">
              Valor total final
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(results.finalBalance)}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader>
            <CardTitle className="font-medium text-sm">
              Valor total investido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(results.finalTotalContributions)}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader>
            <CardTitle className="font-medium text-sm">
              Total em juros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl text-lime-300">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(results.finalTotalInterest)}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <Tabs defaultValue="chart">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <div>
                <CardTitle className="text-base">
                  Evolução do Investimento
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Comparação entre investimento com e sem juros compostos
                </p>
              </div>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Gráfico</TabsTrigger>
                <TabsTrigger value="table">Tabela</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="chart" className="mt-0">
              <CompoundInterestChart chartData={results.results} />
            </TabsContent>
            <TabsContent value="table" className="mt-0">
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="h-12 w-[100px]">Mês</TableHead>
                      <TableHead className="h-12">Saldo</TableHead>
                      <TableHead className="h-12">Juros</TableHead>
                      <TableHead className="h-12">Total Investido</TableHead>
                      <TableHead className="h-12">Juros Acumulados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.results.map((result) => (
                      <TableRow key={result.month}>
                        <TableCell className="h-12 font-medium">
                          {result.month}
                        </TableCell>
                        <TableCell className="h-12 font-medium text-lime-300">
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(result.balance)}
                        </TableCell>
                        <TableCell className="h-12">
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(result.monthlyInterest)}
                        </TableCell>
                        <TableCell className="h-12">
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(result.totalContributions)}
                        </TableCell>
                        <TableCell className="h-12">
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(result.totalInterest)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
