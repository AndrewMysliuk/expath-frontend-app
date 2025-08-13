import { onMounted, onBeforeUnmount, ref, watch, type Ref } from "vue"
import { PulseRenderer } from "@/utils"
import type { WaveParams } from "@/utils"
import { MetricStatusEnum } from "~/types"

export function usePulseRenderer(params: Ref<WaveParams>, status: Ref<MetricStatusEnum>) {
  const canvasEl = ref<HTMLCanvasElement | null>(null)
  const renderer = new PulseRenderer({
    height: 220,
    lineWidth: 1.4,
    whiteOutRatio: 0.01,
    fadeOutRatio: 0.08,
  })

  let attached = false

  const doAttach = async () => {
    if (attached) return
    const el = canvasEl.value
    if (!el) return

    await nextTick()
    renderer.updateFromWaveParams(params.value)
    renderer.attach(el)
    attached = true
  }

  onMounted(() => {
    if (status.value !== MetricStatusEnum.UNKNOWN) {
      void doAttach()
    } else {
      const stop = watch(
        status,
        (s) => {
          if (s !== MetricStatusEnum.UNKNOWN) {
            void doAttach()
            stop()
          }
        },
        { flush: "post" }
      )
    }
  })

  watch(
    params,
    (p) => {
      if (!attached) return
      renderer.updateFromWaveParams(p)
    },
    { deep: true }
  )

  onBeforeUnmount(() => {
    renderer.detach()
    attached = false
  })

  return { canvasEl }
}
