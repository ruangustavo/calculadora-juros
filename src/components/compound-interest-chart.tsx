'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CompoundInterestMonth } from '@/types'

const chartConfig = {
  balance: {
    label: 'Rendimento',
    color: 'hsl(var(--chart-2))',
  },
  balanceWithoutInterest: {
    label: 'Saldo sem juros',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface CompoundInterestChartProps {
  chartData: CompoundInterestMonth[]
}

export function CompoundInterestChart({
  chartData,
}: CompoundInterestChartProps) {
  return (
    <Card>
      <CardContent>
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
              name="Mês"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent isCurrency />}
            />
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
              dot={false}
              name="Saldo sem juros"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
