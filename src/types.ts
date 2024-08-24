export type CompoundInterestMonth = {
  month: number
  balance: number
  balanceWithoutInterest: number
  monthlyInterest: number
  totalContributions: number
  totalInterest: number
}

export type CompoundInterestSimulation = {
  finalBalance: number
  finalTotalContributions: number
  finalTotalInterest: number
  results: CompoundInterestMonth[]
}

export type TimespanPeriod = 'years' | 'months'

export type InterestPeriod = 'yearly' | 'monthly'

export type CompoundInterestSimulatorForm = {
  initialValue: number
  monthlyValue: number
  compoundInterest: number
  interestPeriod: InterestPeriod
  timespan: number
  timespanPeriod: TimespanPeriod
}
