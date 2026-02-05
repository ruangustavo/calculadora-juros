'use client'

import { formatDuration, intervalToDuration } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/chart'
import type { CompoundInterestMonth } from '@/types'

const formatCurrency = (value: number | string) => {
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue)
}

const formatMonthDuration = (months: number) => {
  const duration = intervalToDuration({
    start: new Date(2000, 0, 1),
    end: new Date(2000, months, 1),
  })

  return formatDuration(duration, {
    format: ['years', 'months'],
    locale: ptBR,
  })
}

interface TooltipPayload {
  value: number
  name: string
  color: string
  dataKey: string
  payload: {
    month: number
    balance: number
    balanceWithoutInterest: number
  }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const month = payload[0].payload.month
  const duration = formatMonthDuration(month)

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="mb-2 font-medium text-sm">
        Mês {month} {duration && `(depois de ${duration})`}
      </div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
            <div
              className="size-3 rounded-xs"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const chartConfig = {
  balance: {
    label: 'Com juros',
    color: 'var(--color-chart-2)',
  },
  balanceWithoutInterest: {
    label: 'Sem juros',
    color: 'var(--color-muted-foreground)',
  },
} satisfies ChartConfig

interface CompoundInterestChartProps {
  chartData: CompoundInterestMonth[]
}

export function CompoundInterestChart({
  chartData,
}: CompoundInterestChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`
    }
    return `R$ ${value}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Evolução do Investimento</CardTitle>
        <p className="text-muted-foreground text-sm">
          Comparação entre investimento com e sem juros compostos
        </p>
      </CardHeader>
      <CardContent>
        {' '}
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: 'Mês', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatYAxis}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="balance"
              type="monotone"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
              name="Saldo com juros"
            />
            <Line
              dataKey="balanceWithoutInterest"
              type="monotone"
              stroke="var(--color-balanceWithoutInterest)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Saldo sem juros"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
