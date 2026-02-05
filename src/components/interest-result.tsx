'use client'

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

export function InterestResult({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const searchParamsSchema = z.object({
    initialValue: z.coerce.number(),
    monthlyValue: z.coerce.number(),
    compoundInterest: z.coerce.number(),
    interestPeriod: z.enum(['yearly', 'monthly']),
    timespan: z.coerce.number(),
    timespanPeriod: z.enum(['years', 'months']),
  })

  const {
    initialValue,
    monthlyValue,
    compoundInterest,
    interestPeriod,
    timespan,
    timespanPeriod,
  } = searchParamsSchema.parse(searchParams)

  const calculateInterest = () => {
    const periods = timespanPeriod === 'years' ? timespan * 12 : timespan

    const rate =
      interestPeriod === 'yearly'
        ? compoundInterest / 12 / 100
        : compoundInterest / 100

    let balance = initialValue
    let totalContributions = initialValue
    let totalInterest = 0
    const results: CompoundInterestMonth[] = []

    for (let month = 1; month <= periods; month++) {
      if (month !== 1) {
        balance += monthlyValue
      }

      totalContributions += monthlyValue

      const monthlyInterest = balance * rate
      balance += monthlyInterest
      totalInterest += monthlyInterest

      results.push({
        month,
        monthlyInterest,
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
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="text-base">Resultados da Simulação</CardTitle>
      </CardHeader>
      <CardContent>
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

        <Tabs defaultValue="chart" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Gráfico</TabsTrigger>
            <TabsTrigger value="table">Tabela</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <CompoundInterestChart chartData={results.results} />
          </TabsContent>
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detalhamento Mensal</CardTitle>
                <p className="text-muted-foreground text-sm">
                  Evolução mês a mês do seu investimento
                </p>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
