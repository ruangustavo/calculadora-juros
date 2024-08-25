'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { CompoundInterestChart } from './compound-interest-chart'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CompoundInterestMonth } from '@/types'
import { z } from 'zod'

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
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Resultados da Simulação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Valor total final
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(results.finalBalance)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Valor total investido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(results.finalTotalContributions)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total em juros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-500">
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
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mês</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Juros</TableHead>
                    <TableHead>Total Investido</TableHead>
                    <TableHead>Juros Acumulados</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.results.map((result) => (
                    <TableRow key={result.month}>
                      <TableCell className="font-medium">
                        {result.month}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(result.balance)}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(result.monthlyInterest)}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(result.totalContributions)}
                      </TableCell>
                      <TableCell>
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
        </Tabs>
      </CardContent>
    </Card>
  )
}
