export enum MetricStatusEnum {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  MODERATE = "MODERATE",
  WARNING = "WARNING",
  DANGER = "DANGER",
  CRITICAL = "CRITICAL",
  UNKNOWN = "UNKNOWN",
}

export enum MetricUnitEnum {
  PERCENT = "PERCENT",
  INDEX = "INDEX",
  POINTS = "POINTS",
  LEVEL = "LEVEL",
  RATE_PCT = "RATE_PCT",
}

export interface IMetricSource {
  value: number | null
  date: string
  unit: MetricUnitEnum
  source_url: string
  source_name: string
}

export interface IMetricDaily {
  sources: IMetricSource[]
  average?: number | null
  unit: MetricUnitEnum
  status: MetricStatusEnum
  as_of?: string
}

export interface IFxRate {
  pair: string
  value: number
  as_of: string
  source_url: string
  source_name: string
}

export interface ICountryMetrics {
  policy_rate: IMetricDaily
  inflation: IMetricDaily
  unemployment: IMetricDaily
  pmi: IMetricDaily
  equity_index: IMetricDaily
  fx_rates: IFxRate[]
  currency_index: IMetricDaily
  bond_yield_10y: IMetricDaily
}

export interface IStructuredLLMResponse {
  summary: string
  tip: string
}

export interface IDailyData {
  date: string
  countries: Record<string, ICountryMetrics>
  summary: IStructuredLLMResponse
}
