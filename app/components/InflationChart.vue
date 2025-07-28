<template>
  <div class="w-full max-w-xl mx-auto mt-8 h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { Line } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js"
import type { ChartOptions } from "chart.js"

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default defineComponent({
  name: "InflationChart",
  components: { Line },

  props: {
    dataPoints: {
      type: Array as () => number[],
      required: true,
    },
    labels: {
      type: Array as () => string[],
      required: true,
    },
  },

  setup(props) {
    const chartData = computed(() => {
      return {
        labels: props.labels,
        datasets: [
          {
            label: "Inflation Rate (%)",
            data: props.dataPoints,
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      }
    })

    const chartOptions: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          ticks: {
            callback: (tickValue: number | string) => {
              const val = Number(tickValue)
              return isNaN(val) ? "" : `${val.toFixed(1)}%`
            },
          },
        },
      },
    }

    return {
      chartData,
      chartOptions,
    }
  },
})
</script>
