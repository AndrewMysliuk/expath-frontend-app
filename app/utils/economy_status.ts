import { MetricStatusEnum } from "@/types"
import type { IDailyData, ICountryMetrics } from "@/types"

const ORDER: MetricStatusEnum[] = [
  MetricStatusEnum.EXCELLENT,
  MetricStatusEnum.GOOD,
  MetricStatusEnum.MODERATE,
  MetricStatusEnum.WARNING,
  MetricStatusEnum.DANGER,
  MetricStatusEnum.CRITICAL,
]

const metricKeys: (keyof Omit<ICountryMetrics, "fx_rates">)[] = [
  "policy_rate",
  "inflation",
  "unemployment",
  "pmi",
  "equity_index",
  "currency_index",
  "bond_yield_10y",
]

export const rank = (s: MetricStatusEnum): number | null => (s === MetricStatusEnum.UNKNOWN ? null : ORDER.indexOf(s))

export const unrank = (r: number): MetricStatusEnum => {
  const idx = Math.max(0, Math.min(ORDER.length - 1, r))
  return ORDER[idx] ?? MetricStatusEnum.UNKNOWN
}

const median = (arr: number[]): number => {
  if (arr.length === 0) return 0
  const a = arr.slice().sort((x, y) => x - y)
  const n = a.length
  return n % 2 !== 0 ? a[(n - 1) / 2]! : (a[n / 2 - 1]! + a[n / 2]!) / 2
}

export function countryWorstStatus(c: ICountryMetrics): MetricStatusEnum {
  const ranks = metricKeys
    .map((k) => c[k]?.status)
    .map(rank)
    .filter((v): v is number => v !== null)

  if (!ranks.length) return MetricStatusEnum.UNKNOWN
  return unrank(Math.max(...ranks))
}

export function computeGlobalStatus(d: IDailyData): {
  status: MetricStatusEnum
  byCountry: Record<string, MetricStatusEnum>
  histogram: Record<MetricStatusEnum, number>
} {
  const byCountry: Record<string, MetricStatusEnum> = {}
  const numericRanks: number[] = []
  const histogram: Record<MetricStatusEnum, number> = {
    [MetricStatusEnum.EXCELLENT]: 0,
    [MetricStatusEnum.GOOD]: 0,
    [MetricStatusEnum.MODERATE]: 0,
    [MetricStatusEnum.WARNING]: 0,
    [MetricStatusEnum.DANGER]: 0,
    [MetricStatusEnum.CRITICAL]: 0,
    [MetricStatusEnum.UNKNOWN]: 0,
  }

  for (const [code, cm] of Object.entries(d.countries)) {
    const s = countryWorstStatus(cm)
    byCountry[code] = s
    histogram[s] += 1
    const r = rank(s)
    if (r !== null) numericRanks.push(r)
  }

  const status = numericRanks.length ? unrank(Math.round(median(numericRanks))) : MetricStatusEnum.UNKNOWN

  return { status, byCountry, histogram }
}

export const compareStatus = (a: MetricStatusEnum, b: MetricStatusEnum) => {
  const ra = rank(a)
  const rb = rank(b)
  if (ra === null && rb === null) return 0
  if (ra === null) return 1
  if (rb === null) return -1
  return ra - rb
}
