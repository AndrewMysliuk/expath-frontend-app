export interface IMetricPoint {
  date: string
  value: number | null
}

export interface IFxPoint {
  date: string
  value: number
}

export interface ICountryHistory {
  units?: Record<string, string>
  policy_rate?: IMetricPoint[]
  inflation?: IMetricPoint[]
  unemployment?: IMetricPoint[]
  pmi?: IMetricPoint[]
  equity_index?: IMetricPoint[]
  currency_index?: IMetricPoint[]
  bond_yield_10y?: IMetricPoint[]
  fx_rates?: Record<string, IFxPoint[]>
}

export interface IHistory {
  generated_at: string
  window_days: number
  start_date: string
  end_date: string
  countries: Record<string, ICountryHistory | null>
}
