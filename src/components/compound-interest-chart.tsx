'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

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

const formatMonthLabel = (month: number) => {
  const years = Math.floor(month / 12)
  const months = month % 12

  const formatYears = (y: number) => `${y} ${y === 1 ? 'ano' : 'anos'}`
  const formatMonths = (m: number) => `${m} ${m === 1 ? 'mês' : 'meses'}`

  let durationLabel: string
  if (years > 0 && months > 0) {
    durationLabel = `${formatYears(years)} e ${formatMonths(months)}`
  } else if (years > 0) {
    durationLabel = formatYears(years)
  } else {
    durationLabel = formatMonths(months)
  }

  return `Mês ${month} (${durationLabel})`
}

interface TooltipPayload {
  value: number
  name: string
  color: string
  dataKey: string
  payload: {
    month: number
    balance: number
    totalContributions: number
    totalInterest: number
    monthlyContribution: number
    contributionIncreaseRate: number
  }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  isYearlyView?: boolean
}

const CustomTooltip = ({
  active,
  payload,
  isYearlyView,
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload
  const period = data.month
  const balance = data.balance
  const totalContributions = data.totalContributions
  const totalInterest = data.totalInterest
  const monthlyContribution = data.monthlyContribution
  const hasPercentageIncrease = data.contributionIncreaseRate > 0

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="mb-2 font-medium text-sm">
        {isYearlyView ? `Ano ${period}` : formatMonthLabel(period)}
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Valor total:</span>
          <span className="font-medium">{formatCurrency(balance)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          {hasPercentageIncrease && (
            <>
              <span className="text-muted-foreground">Aporte mensal:</span>
              <span className="font-medium">
                {formatCurrency(monthlyContribution)}
              </span>
            </>
          )}
        </div>
        <div className="my-1.5 border-t border-dashed" />
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: chartConfig.totalContributions.color }}
            />
            <span className="text-muted-foreground">
              {chartConfig.totalContributions.label}:
            </span>
          </div>
          <span className="font-medium">
            {formatCurrency(totalContributions)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: chartConfig.totalInterest.color }}
            />
            <span className="text-muted-foreground">
              {chartConfig.totalInterest.label}:
            </span>
          </div>
          <span className="font-medium">{formatCurrency(totalInterest)}</span>
        </div>
      </div>
    </div>
  )
}

const chartConfig = {
  totalContributions: {
    label: 'Investido',
    color: 'hsl(142 76% 36%)',
  },
  totalInterest: {
    label: 'Juros',
    color: 'hsl(142 69% 58%)',
  },
} satisfies ChartConfig

interface CompoundInterestChartProps {
  chartData: CompoundInterestMonth[]
}

const aggregateByYear = (data: CompoundInterestMonth[]) => {
  const yearlyData: CompoundInterestMonth[] = []
  const yearsMap = new Map<number, CompoundInterestMonth[]>()

  // Group data by year
  data.forEach((item) => {
    const year = Math.ceil(item.month / 12)
    if (!yearsMap.has(year)) {
      yearsMap.set(year, [])
    }
    const yearData = yearsMap.get(year)
    if (yearData) {
      yearData.push(item)
    }
  })

  // Take the last month of each year
  yearsMap.forEach((months) => {
    const lastMonth = months[months.length - 1]
    if (lastMonth) {
      yearlyData.push({
        ...lastMonth,
        month: Math.ceil(lastMonth.month / 12),
      })
    }
  })

  return yearlyData
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

  const shouldAggregateByYear = chartData.length > 240
  const displayData = shouldAggregateByYear
    ? aggregateByYear(chartData)
    : chartData
  const increaseMonths = displayData.filter((item) => item.increaseApplied)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Evolução do Investimento</CardTitle>
        <p className="text-muted-foreground text-sm">
          Crescimento {shouldAggregateByYear ? 'anual' : 'mensal'} do portfólio
          com separação entre Investido e juros
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={displayData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: shouldAggregateByYear ? 'Ano' : 'Mês',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatYAxis}
            />
            <ChartTooltip
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
              content={<CustomTooltip isYearlyView={shouldAggregateByYear} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {increaseMonths.map((item) => (
              <ReferenceLine
                key={`increase-${item.month}`}
                x={item.month}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="2 4"
                ifOverflow="extendDomain"
              />
            ))}
            <Bar
              dataKey="totalContributions"
              stackId="a"
              fill="var(--color-totalContributions)"
              radius={[0, 0, 0, 0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="totalInterest"
              stackId="a"
              fill="var(--color-totalInterest)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
