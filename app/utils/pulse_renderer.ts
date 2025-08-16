import type { WaveParams } from "@/utils/wave_params"

export type PulseRendererOptions = {
  // базовое
  height?: number
  lineWidth?: number
  whiteOutRatio?: number
  fadeOutRatio?: number
  fadeOpacity?: number
  stroke?: string
  smallAmp?: number
  bigAmp?: number
  noiseAmp?: number
  sweepPxPerSec?: number // fallback, если bpm=0

  // расширенное
  bpm?: number // целевой темп, уд/мин
  hrvPct?: number // вариабельность темпа (0..1)
  noiseJitterPx?: number // дрожание линии (px)
  glitchProb?: number // вероятность глитча на цикл (0..1)
  glitchAmp?: number // амплитуда глитча (доля высоты 0..1)
  baselineWanderAmp?: number // доля высоты дрейфа
  baselineWanderFreq?: number // Гц дрейфа
}

type Phase = "baseline1" | "small_rise" | "small_fall" | "baseline_after_small" | "tiny_dip" | "big_rise" | "big_fall" | "noise"

export class PulseRenderer {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null

  private width = 0
  private height = 220
  private dpr = 1

  private stroke = "#2e2e2e"
  private lineWidth = 1.4
  private whiteOutRatio = 0.01
  private fadeOutRatio = 0.08
  private fadeOpacity = 0.16

  private sweep = 60
  private smallAmp = 0.1
  private bigAmp = 0.35
  private noiseAmp = 0.06

  private readonly BASELINE1_LEN = 120
  private readonly SMALL_RISE = 4
  private readonly SMALL_FALL = 4
  private readonly BASELINE_AFTER_SMALL = 3
  private readonly TINY_DIP_LEN = 4
  private readonly TINY_DIP_AMP = 0.05
  private readonly BIG_RISE = 4
  private readonly BIG_FALL = 4
  private readonly NOISE_LEN = 30
  private readonly NOISE_WAVES = 2

  private bpm = 0
  private hrvPct = 0
  private noiseJitterPx = 0
  private glitchProb = 0
  private glitchAmp = 0
  private baseWanderAmp = 0
  private baseWanderFreq = 0

  private whiteOut = 0
  private fadeOut = 0
  private x = 0
  private y = 0
  private lastTs = 0
  private tSec = 0
  private raf = 0
  private paused = false
  private MAX_DT = 1 / 30

  private phase: Phase = "baseline1"
  private phasePx = 0

  private glitchActive = false
  private glitchUntilPx = 0

  constructor(opts: PulseRendererOptions = {}) {
    this.applyOptions(opts)
  }

  applyOptions(opts: PulseRendererOptions) {
    if (opts.height != null) this.height = opts.height
    if (opts.lineWidth != null) this.lineWidth = opts.lineWidth
    if (opts.whiteOutRatio != null) this.whiteOutRatio = opts.whiteOutRatio
    if (opts.fadeOutRatio != null) this.fadeOutRatio = opts.fadeOutRatio
    if (opts.fadeOpacity != null) this.fadeOpacity = opts.fadeOpacity

    if (opts.stroke != null) this.stroke = opts.stroke
    if (opts.smallAmp != null) this.smallAmp = opts.smallAmp
    if (opts.bigAmp != null) this.bigAmp = opts.bigAmp
    if (opts.noiseAmp != null) this.noiseAmp = opts.noiseAmp
    if (opts.sweepPxPerSec != null) this.sweep = opts.sweepPxPerSec

    if (opts.bpm != null) this.bpm = opts.bpm
    if (opts.hrvPct != null) this.hrvPct = opts.hrvPct
    if (opts.noiseJitterPx != null) this.noiseJitterPx = opts.noiseJitterPx
    if (opts.glitchProb != null) this.glitchProb = opts.glitchProb
    if (opts.glitchAmp != null) this.glitchAmp = opts.glitchAmp
    if (opts.baselineWanderAmp != null) this.baseWanderAmp = opts.baselineWanderAmp
    if (opts.baselineWanderFreq != null) this.baseWanderFreq = opts.baselineWanderFreq
  }

  updateFromWaveParams(p: WaveParams) {
    this.applyOptions({
      stroke: p.STROKE,
      lineWidth: p.LINE_WIDTH,
      smallAmp: p.SMALL_AMP,
      bigAmp: p.BIG_AMP,
      noiseAmp: p.NOISE_AMP,
      fadeOpacity: p.FADE_OPACITY,
      bpm: p.BPM,
      hrvPct: p.HRV_PCT,
      noiseJitterPx: p.NOISE_JITTER_PX,
      glitchProb: p.GLITCH_PROB,
      glitchAmp: p.GLITCH_AMP,
      baselineWanderAmp: p.BASELINE_WANDER_AMP,
      baselineWanderFreq: p.BASELINE_WANDER_FREQ,
    })
    if (this.bpm > 0) this.setTempoForNewCycle()
  }

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.onVisibility = this.onVisibility.bind(this)
    this.onResize = this.onResize.bind(this)
    document.addEventListener("visibilitychange", this.onVisibility, { passive: true })
    window.addEventListener("resize", this.onResize, { passive: true })
    this.resize()
    this.start()
  }

  detach() {
    this.stop()
    window.removeEventListener("resize", this.onResize)
    document.removeEventListener("visibilitychange", this.onVisibility)
    this.ctx = null
    this.canvas = null
  }

  private onVisibility() {
    this.paused = document.visibilityState !== "visible"
    if (!this.paused) this.lastTs = 0
  }

  private onResize() {
    this.resize()
  }

  private cyclePx(): number {
    return (
      this.BASELINE1_LEN +
      this.SMALL_RISE +
      this.SMALL_FALL +
      this.BASELINE_AFTER_SMALL +
      this.TINY_DIP_LEN +
      this.BIG_RISE +
      this.BIG_FALL +
      this.NOISE_LEN
    )
  }

  private setTempoForNewCycle() {
    if (this.bpm <= 0) return
    const jitter = (Math.random() * 2 - 1) * this.hrvPct
    const bpmNow = Math.max(1, this.bpm * (1 + jitter))
    this.sweep = this.cyclePx() * (bpmNow / 60)
  }

  private resetCycle() {
    this.phase = "baseline1"
    this.phasePx = 0
    this.glitchActive = this.glitchProb > 0 && Math.random() < this.glitchProb
    this.glitchUntilPx = this.glitchActive ? this.cyclePx() * (0.2 + Math.random() * 0.5) : 0
    this.setTempoForNewCycle()
  }

  private computeNextY(
    currentPhase: Phase,
    currentPhasePx: number,
    stepPx: number,
    baseY: number
  ): { y: number; nextPhase: Phase; nextPhasePx: number } {
    let y = baseY
    let nextPhase = currentPhase
    let nextPx = currentPhasePx + stepPx

    const smallTopY = baseY - this.height * this.smallAmp
    const bigTopY = baseY - this.height * this.bigAmp
    const dipY = baseY + this.height * this.TINY_DIP_AMP

    const advance = (threshold: number, calc: (p: number) => number, toPhase: Phase) => {
      const p = Math.min(1, currentPhasePx / threshold)
      if (nextPx >= threshold) {
        nextPx = 0
        nextPhase = toPhase
      }
      return calc(p)
    }

    switch (currentPhase) {
      case "baseline1":
        y = baseY
        if (nextPx >= this.BASELINE1_LEN) {
          nextPx = 0
          nextPhase = "small_rise"
        }
        break

      case "small_rise":
        y = advance(this.SMALL_RISE, (p) => baseY + (smallTopY - baseY) * p, "small_fall")
        break

      case "small_fall":
        y = advance(this.SMALL_FALL, (p) => smallTopY + (baseY - smallTopY) * p, "baseline_after_small")
        break

      case "baseline_after_small":
        y = baseY
        if (nextPx >= this.BASELINE_AFTER_SMALL) {
          nextPx = 0
          nextPhase = "tiny_dip"
        }
        break

      case "tiny_dip":
        y = advance(this.TINY_DIP_LEN, (p) => baseY + (dipY - baseY) * p, "big_rise")
        break

      case "big_rise":
        y = advance(this.BIG_RISE, (p) => baseY + (bigTopY - baseY) * p, "big_fall")
        break

      case "big_fall":
        y = advance(this.BIG_FALL, (p) => bigTopY + (baseY - bigTopY) * p, "noise")
        break

      case "noise": {
        const p = Math.min(1, currentPhasePx / this.NOISE_LEN)
        const env = Math.sin(Math.PI * p)
        const amp = this.height * this.noiseAmp * env
        const core = Math.sin(2 * Math.PI * this.NOISE_WAVES * p)
        y = baseY + amp * core

        if (this.noiseJitterPx > 0) {
          y += (Math.random() * 2 - 1) * this.noiseJitterPx
        }

        if (this.glitchActive && currentPhasePx <= this.glitchUntilPx && this.glitchAmp > 0) {
          y += (Math.random() < 0.5 ? -1 : 1) * this.height * this.glitchAmp
        }

        if (nextPx >= this.NOISE_LEN) {
          nextPx = 0
          nextPhase = "baseline1"
        }

        break
      }
    }

    return { y, nextPhase, nextPhasePx: nextPx }
  }

  private resize() {
    if (!this.canvas || !this.ctx) return
    this.dpr = window.devicePixelRatio || 1
    this.width = this.canvas.clientWidth
    this.canvas.width = Math.max(1, Math.floor(this.width * this.dpr))
    this.canvas.height = Math.max(1, Math.floor(this.height * this.dpr))
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.whiteOut = Math.max(0, Math.floor(this.width * this.whiteOutRatio))
    this.fadeOut = Math.max(this.whiteOut, Math.floor(this.width * this.fadeOutRatio))
    this.x = 0
    this.y = this.height / 2
    this.lastTs = 0
    this.tSec = 0
    this.prefill()
  }

  private prefill() {
    if (!this.ctx) return
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)

    let px = 0
    let py = this.height / 2
    let localPhase: Phase = "baseline1"
    let localPhasePx = 0

    const baseY = this.height / 2

    ctx.beginPath()
    ctx.lineWidth = this.lineWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.strokeStyle = this.stroke
    ctx.moveTo(px, py)

    while (px < this.width) {
      const res = this.computeNextY(localPhase, localPhasePx, 1, baseY)
      py = res.y
      localPhase = res.nextPhase
      localPhasePx = res.nextPhasePx

      px += 1
      ctx.lineTo(px, py)
    }

    ctx.stroke()
    ctx.closePath()

    this.x = Math.max(0, this.width - 2)
    this.y = py
    this.resetCycle()
  }

  private start() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.lastTs = 0
    this.raf = requestAnimationFrame(this.frame)
  }

  private stop() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  private frame = (ts: number) => {
    if (!this.ctx) return
    const ctx = this.ctx

    if (!this.lastTs) this.lastTs = ts
    if (this.paused) {
      this.raf = requestAnimationFrame(this.frame)
      return
    }

    let dt = (ts - this.lastTs) / 1000
    this.lastTs = ts
    if (dt > this.MAX_DT) dt = this.MAX_DT
    this.tSec += dt

    let dx = this.sweep * dt
    if (dx < 0.3) dx = 0.3

    for (let i = 0; i < this.whiteOut; i++) {
      const ex = (this.x + i) % this.width
      ctx.clearRect(ex, 0, 1, this.height)
    }

    if (this.fadeOut > this.whiteOut) {
      ctx.save()
      ctx.globalAlpha = this.fadeOpacity
      ctx.fillStyle = "#fff"
      for (let i = this.whiteOut; i < this.fadeOut; i++) {
        const ex = (this.x + i) % this.width
        ctx.fillRect(ex, 0, 1, this.height)
      }
      ctx.restore()
    }

    ctx.lineWidth = this.lineWidth
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.strokeStyle = this.stroke

    const steps = Math.max(1, Math.floor(dx))
    const stepPx = dx / steps

    const baseY0 = this.height / 2
    const wander =
      this.baseWanderAmp && this.baseWanderFreq
        ? this.height * this.baseWanderAmp * Math.sin(2 * Math.PI * this.baseWanderFreq * this.tSec)
        : 0
    const baseY = baseY0 + wander

    ctx.beginPath()
    ctx.moveTo(this.x, this.y)

    for (let i = 0; i < steps; i++) {
      const res = this.computeNextY(this.phase, this.phasePx, stepPx, baseY)
      this.y = res.y
      this.phase = res.nextPhase
      this.phasePx = res.nextPhasePx

      const nextX = this.x + stepPx
      if (nextX >= this.width) {
        const over = nextX - this.width
        ctx.lineTo(this.width, this.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, this.y)
        this.x = over % this.width
        ctx.lineTo(this.x, this.y)
      } else {
        this.x = nextX
        ctx.lineTo(this.x, this.y)
      }
    }

    ctx.stroke()
    ctx.closePath()
    this.raf = requestAnimationFrame(this.frame)
  }
}
