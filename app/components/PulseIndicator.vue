<template>
  <div class="w-full rounded-2xl border border-gray-200 bg-white p-2">
    <canvas ref="canvasEl" class="block w-full rounded-xl" style="height: 220px"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue"

export default defineComponent({
  setup() {
    const HEIGHT = 220
    const SWEEP_PX_PER_SEC = 60
    const LINE_WIDTH = 1.4
    const WHITE_OUT_RATIO = 0.01
    const FADE_OUT_RATIO = 0.08
    const FADE_OPACITY = 0.16
    const STROKE = "#2e2e2e"

    const BASELINE1_LEN = 120

    const SMALL_RISE = 4
    const SMALL_FALL = 4
    const SMALL_AMP = 0.1

    const BASELINE_AFTER_SMALL = 3

    const TINY_DIP_LEN = 4
    const TINY_DIP_AMP = 0.05

    const BIG_RISE = 4
    const BIG_FALL = 4
    const BIG_AMP = 0.35

    const NOISE_LEN = 30
    const NOISE_AMP = 0.06
    const NOISE_WAVES = 2

    const MAX_DT = 1 / 30
    let paused = false

    const canvasEl = ref<HTMLCanvasElement | null>(null)

    let ctx: CanvasRenderingContext2D | null = null
    let width = 0,
      height = HEIGHT
    let whiteOut = 0,
      fadeOut = 0

    let x = 0,
      y = HEIGHT / 2
    let lastTs = 0,
      raf = 0

    type Phase = "baseline1" | "small_rise" | "small_fall" | "baseline_after_small" | "tiny_dip" | "big_rise" | "big_fall" | "noise"

    let phase: Phase = "baseline1"
    let phasePx = 0

    const resetCycle = () => {
      phase = "baseline1"
      phasePx = 0
    }

    const resize = () => {
      const c = canvasEl.value!
      const dpr = window.devicePixelRatio || 1
      width = c.clientWidth
      height = HEIGHT
      c.width = Math.max(1, Math.floor(width * dpr))
      c.height = Math.max(1, Math.floor(height * dpr))
      ctx = c.getContext("2d")
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      whiteOut = Math.max(0, Math.floor(width * WHITE_OUT_RATIO))
      fadeOut = Math.max(whiteOut, Math.floor(width * FADE_OUT_RATIO))
      x = 0
      y = height / 2
      lastTs = 0
      resetCycle()
      prefill()
    }

    const frame = (ts: number) => {
      if (!ctx) return

      if (!lastTs) lastTs = ts
      if (paused) {
        raf = requestAnimationFrame(frame)
        return
      }

      let dt = (ts - lastTs) / 1000
      lastTs = ts
      if (dt > MAX_DT) dt = MAX_DT

      let dx = SWEEP_PX_PER_SEC * dt
      if (dx < 0.3) dx = 0.3

      for (let i = 0; i < whiteOut; i++) {
        const ex = (x + i) % width
        ctx.clearRect(ex, 0, 1, height)
      }
      if (fadeOut > whiteOut) {
        ctx.save()
        ctx.globalAlpha = FADE_OPACITY
        ctx.fillStyle = "#fff"
        for (let i = whiteOut; i < fadeOut; i++) {
          const ex = (x + i) % width
          ctx.fillRect(ex, 0, 1, height)
        }
        ctx.restore()
      }

      ctx.lineWidth = LINE_WIDTH
      ctx.lineJoin = "round"
      ctx.lineCap = "round"
      ctx.strokeStyle = STROKE

      const steps = Math.max(1, Math.floor(dx))
      const stepPx = dx / steps

      const baseY = height / 2
      const smallTopY = baseY - height * SMALL_AMP
      const bigTopY = baseY - height * BIG_AMP
      const dipY = baseY + height * TINY_DIP_AMP

      ctx.beginPath()
      ctx.moveTo(x, y)

      for (let i = 0; i < steps; i++) {
        switch (phase) {
          case "baseline1":
            y = baseY
            phasePx += stepPx
            if (phasePx >= BASELINE1_LEN) {
              phase = "small_rise"
              phasePx = 0
            }
            break

          case "small_rise": {
            const p = Math.min(1, phasePx / SMALL_RISE)
            y = baseY + (smallTopY - baseY) * p
            phasePx += stepPx
            if (phasePx >= SMALL_RISE) {
              phase = "small_fall"
              phasePx = 0
            }
            break
          }

          case "small_fall": {
            const p = Math.min(1, phasePx / SMALL_FALL)
            y = smallTopY + (baseY - smallTopY) * p
            phasePx += stepPx
            if (phasePx >= SMALL_FALL) {
              phase = "baseline_after_small"
              phasePx = 0
            }
            break
          }

          case "baseline_after_small":
            y = baseY
            phasePx += stepPx
            if (phasePx >= BASELINE_AFTER_SMALL) {
              phase = "tiny_dip"
              phasePx = 0
            }
            break

          case "tiny_dip": {
            const p = Math.min(1, phasePx / TINY_DIP_LEN)
            y = baseY + (dipY - baseY) * p
            phasePx += stepPx
            if (phasePx >= TINY_DIP_LEN) {
              phase = "big_rise"
              phasePx = 0
            }
            break
          }

          case "big_rise": {
            const p = Math.min(1, phasePx / BIG_RISE)
            y = baseY + (bigTopY - baseY) * p
            phasePx += stepPx
            if (phasePx >= BIG_RISE) {
              phase = "big_fall"
              phasePx = 0
            }
            break
          }

          case "big_fall": {
            const p = Math.min(1, phasePx / BIG_FALL)
            y = bigTopY + (baseY - bigTopY) * p
            phasePx += stepPx
            if (phasePx >= BIG_FALL) {
              phase = "noise"
              phasePx = 0
            }
            break
          }

          case "noise": {
            const p = Math.min(1, phasePx / NOISE_LEN)
            const env = Math.sin(Math.PI * p)
            const amp = height * NOISE_AMP * env
            const core = Math.sin(2 * Math.PI * NOISE_WAVES * p)
            const jitter = (Math.random() - 0.5) * 0.004 * height
            y = baseY + amp * core + jitter

            phasePx += stepPx
            if (phasePx >= NOISE_LEN) {
              resetCycle()
              y = baseY
            }
            break
          }
        }

        const nextX = x + stepPx
        if (nextX >= width) {
          const over = nextX - width
          ctx.lineTo(width, y)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(0, y)
          x = over % width
          ctx.lineTo(x, y)
        } else {
          x = nextX
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
      ctx.closePath()
      raf = requestAnimationFrame(frame)
    }

    const prefill = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      let px = 0
      let py = height / 2
      let localPhase: Phase = "baseline1"
      let localPhasePx = 0

      const baseY = height / 2
      const smallTopY = baseY - height * SMALL_AMP
      const bigTopY = baseY - height * BIG_AMP
      const dipY = baseY + height * TINY_DIP_AMP

      ctx.beginPath()
      ctx.lineWidth = LINE_WIDTH
      ctx.lineJoin = "round"
      ctx.lineCap = "round"
      ctx.strokeStyle = STROKE
      ctx.moveTo(px, py)

      while (px < width) {
        switch (localPhase) {
          case "baseline1":
            py = baseY
            localPhasePx += 1
            if (localPhasePx >= BASELINE1_LEN) {
              localPhase = "small_rise"
              localPhasePx = 0
            }
            break

          case "small_rise": {
            const p = Math.min(1, localPhasePx / SMALL_RISE)
            py = baseY + (smallTopY - baseY) * p
            localPhasePx += 1
            if (localPhasePx >= SMALL_RISE) {
              localPhase = "small_fall"
              localPhasePx = 0
            }
            break
          }

          case "small_fall": {
            const p = Math.min(1, localPhasePx / SMALL_FALL)
            py = smallTopY + (baseY - smallTopY) * p
            localPhasePx += 1
            if (localPhasePx >= SMALL_FALL) {
              localPhase = "baseline_after_small"
              localPhasePx = 0
            }
            break
          }

          case "baseline_after_small":
            py = baseY
            localPhasePx += 1
            if (localPhasePx >= BASELINE_AFTER_SMALL) {
              localPhase = "tiny_dip"
              localPhasePx = 0
            }
            break

          case "tiny_dip": {
            const p = Math.min(1, localPhasePx / TINY_DIP_LEN)
            py = baseY + (dipY - baseY) * p
            localPhasePx += 1
            if (localPhasePx >= TINY_DIP_LEN) {
              localPhase = "big_rise"
              localPhasePx = 0
            }
            break
          }

          case "big_rise": {
            const p = Math.min(1, localPhasePx / BIG_RISE)
            py = baseY + (bigTopY - baseY) * p
            localPhasePx += 1
            if (localPhasePx >= BIG_RISE) {
              localPhase = "big_fall"
              localPhasePx = 0
            }
            break
          }

          case "big_fall": {
            const p = Math.min(1, localPhasePx / BIG_FALL)
            py = bigTopY + (baseY - bigTopY) * p
            localPhasePx += 1
            if (localPhasePx >= BIG_FALL) {
              localPhase = "noise"
              localPhasePx = 0
            }
            break
          }

          case "noise": {
            const p = Math.min(1, localPhasePx / NOISE_LEN)
            const env = Math.sin(Math.PI * p)
            const amp = height * NOISE_AMP * env
            const core = Math.sin(2 * Math.PI * NOISE_WAVES * p)
            const jitter = 0
            py = baseY + amp * core + jitter
            localPhasePx += 1
            if (localPhasePx >= NOISE_LEN) {
              localPhase = "baseline1"
              localPhasePx = 0
            }
            break
          }
        }

        px += 1
        ctx.lineTo(px, py)
      }

      ctx.stroke()
      ctx.closePath()

      x = Math.max(0, width - 2)
      y = py
      resetCycle()
    }

    const start = () => {
      if (raf) cancelAnimationFrame(raf)
      lastTs = 0
      raf = requestAnimationFrame(frame)
    }

    const onVis = () => {
      paused = document.visibilityState !== "visible"
      if (!paused) {
        lastTs = 0
      }
    }

    onMounted(() => {
      resize()
      start()
      document.addEventListener("visibilitychange", onVis, { passive: true })
      window.addEventListener("resize", resize, { passive: true })
    })
    onBeforeUnmount(() => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVis)
    })

    return { canvasEl }
  },
})
</script>
