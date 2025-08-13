import { MetricStatusEnum } from "@/types"

export interface WaveParams {
  STROKE: string
  LINE_WIDTH?: number

  // Амплитуды формы удара
  SMALL_AMP: number
  BIG_AMP: number
  NOISE_AMP: number

  // Визуальные эффекты хвоста
  FADE_OPACITY: number

  // Темп и вариабельность
  BPM: number // уд/мин; 60 = спокойный пульс
  HRV_PCT?: number // вариабельность, ±% к BPM на каждый цикл (например, 0.05 = ±5%)

  // Доп. шум
  NOISE_JITTER_PX?: number // мелкое дрожание в px
  GLITCH_PROB?: number // вероятность «помехи» на цикл (0..1)
  GLITCH_AMP?: number // амплитуда помехи (доля высоты 0..1)

  // «брожение» базовой линии (дыхание/дрейф)
  BASELINE_WANDER_AMP?: number // доля высоты, напр. 0.01
  BASELINE_WANDER_FREQ?: number // Гц, напр. 0.15
}

export function mapStatusToWaveParams(status: MetricStatusEnum): WaveParams {
  switch (status) {
    case MetricStatusEnum.EXCELLENT:
      return {
        STROKE: "#16a34a",
        LINE_WIDTH: 1.3,
        SMALL_AMP: 0.08,
        BIG_AMP: 0.2,
        NOISE_AMP: 0.02,
        FADE_OPACITY: 0.08,
        BPM: 60,
        HRV_PCT: 0.02,
        NOISE_JITTER_PX: 0.4,
        GLITCH_PROB: 0.0,
        GLITCH_AMP: 0.0,
        BASELINE_WANDER_AMP: 0.004,
        BASELINE_WANDER_FREQ: 0.1,
      }

    case MetricStatusEnum.GOOD:
      return {
        STROKE: "#84cc16",
        LINE_WIDTH: 1.35,
        SMALL_AMP: 0.1,
        BIG_AMP: 0.22,
        NOISE_AMP: 0.03,
        FADE_OPACITY: 0.1,
        BPM: 65,
        HRV_PCT: 0.03,
        NOISE_JITTER_PX: 0.6,
        GLITCH_PROB: 0.0,
        GLITCH_AMP: 0.0,
        BASELINE_WANDER_AMP: 0.005,
        BASELINE_WANDER_FREQ: 0.12,
      }

    case MetricStatusEnum.MODERATE:
      return {
        STROKE: "#eab308",
        LINE_WIDTH: 1.4,
        SMALL_AMP: 0.12,
        BIG_AMP: 0.24,
        NOISE_AMP: 0.04,
        FADE_OPACITY: 0.12,
        BPM: 75,
        HRV_PCT: 0.04,
        NOISE_JITTER_PX: 0.8,
        GLITCH_PROB: 0.01,
        GLITCH_AMP: 0.1,
        BASELINE_WANDER_AMP: 0.006,
        BASELINE_WANDER_FREQ: 0.14,
      }

    case MetricStatusEnum.WARNING:
      return {
        STROKE: "#f97316",
        LINE_WIDTH: 1.45,
        SMALL_AMP: 0.14,
        BIG_AMP: 0.26,
        NOISE_AMP: 0.06,
        FADE_OPACITY: 0.14,
        BPM: 85,
        HRV_PCT: 0.05,
        NOISE_JITTER_PX: 1.0,
        GLITCH_PROB: 0.02,
        GLITCH_AMP: 0.14,
        BASELINE_WANDER_AMP: 0.008,
        BASELINE_WANDER_FREQ: 0.16,
      }

    case MetricStatusEnum.DANGER:
      return {
        STROKE: "#dc2626",
        LINE_WIDTH: 1.5,
        SMALL_AMP: 0.16,
        BIG_AMP: 0.28,
        NOISE_AMP: 0.08,
        FADE_OPACITY: 0.16,
        BPM: 95,
        HRV_PCT: 0.06,
        NOISE_JITTER_PX: 1.2,
        GLITCH_PROB: 0.035,
        GLITCH_AMP: 0.17,
        BASELINE_WANDER_AMP: 0.01,
        BASELINE_WANDER_FREQ: 0.18,
      }

    case MetricStatusEnum.CRITICAL:
      return {
        STROKE: "#991b1b",
        LINE_WIDTH: 1.6,
        SMALL_AMP: 0.18,
        BIG_AMP: 0.3,
        NOISE_AMP: 0.1,
        FADE_OPACITY: 0.18,
        BPM: 110,
        HRV_PCT: 0.08,
        NOISE_JITTER_PX: 1.6,
        GLITCH_PROB: 0.05,
        GLITCH_AMP: 0.2,
        BASELINE_WANDER_AMP: 0.012,
        BASELINE_WANDER_FREQ: 0.2,
      }

    default:
      return {
        STROKE: "#9ca3af",
        LINE_WIDTH: 1.2,
        SMALL_AMP: 0.06,
        BIG_AMP: 0.12,
        NOISE_AMP: 0.02,
        FADE_OPACITY: 0.06,
        BPM: 58,
        HRV_PCT: 0.02,
        NOISE_JITTER_PX: 0.5,
        GLITCH_PROB: 0.0,
        GLITCH_AMP: 0.0,
        BASELINE_WANDER_AMP: 0.004,
        BASELINE_WANDER_FREQ: 0.1,
      }
  }
}
