<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-bars text-blue-900 text-lg" />
        </div>

        <h2 class="text-2xl font-bold text-gray-900">Economic Structure</h2>
      </div>

      <div class="max-w-md mx-auto mb-12">
        <Pie :data="chartData" :options="chartOptions" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div
          v-for="sector in MOCK_DATA.economic_structure.top_sectors"
          :key="sector.title"
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {{ sector.title }}
            </h3>
            <span class="text-2xl font-bold text-gray-900"> {{ sector.value }}% </span>
          </div>

          <p class="text-sm text-gray-900 mb-4">
            {{ sector.note }}
          </p>

          <div class="space-y-2">
            <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Key Companies:</p>
            <div class="space-y-1">
              <a
                v-for="company in sector.companies"
                :key="company.name"
                :href="company.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-sm font-medium underline decoration-gray-400 transition"
                :class="[
                  sector.title === 'Manufacturing'
                    ? 'text-[#3A506B] hover:text-[#2A3A50]'
                    : sector.title === 'Information & Financial Services'
                    ? 'text-[#00796B] hover:text-[#00564D]'
                    : sector.title === 'Trade & Logistics'
                    ? 'text-[#F57C00] hover:text-[#c25f00]'
                    : 'text-gray-700 hover:text-gray-900',
                ]"
              >
                • {{ company.name }}
                <span class="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Pie } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { computed, defineComponent } from "vue"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels)

const MOCK_DATA = {
  economic_structure: {
    top_sectors: [
      {
        title: "Manufacturing",
        value: 20.8,
        note: "Germany's core export engine: includes automotive, machinery, industrial equipment, and electronics.",
        companies: [
          { name: "Volkswagen", link: "https://www.tradingview.com/symbols/XETR-VOW3/" },
          { name: "Siemens", link: "https://www.tradingview.com/symbols/XETR-SIE/" },
          { name: "Bosch (proxy via Siemens)", link: "https://www.tradingview.com/symbols/XETR-SIE/" },
        ],
      },
      {
        title: "Information & Financial Services",
        value: 16.3,
        note: "Covers IT, telecom, banking, and insurance — a growing sector driving digital transformation.",
        companies: [
          { name: "SAP", link: "https://www.tradingview.com/symbols/XETR-SAP/" },
          { name: "Deutsche Telekom", link: "https://www.tradingview.com/symbols/XETR-DTE/" },
          { name: "Deutsche Bank", link: "https://www.tradingview.com/symbols/XETR-DBK/" },
        ],
      },
      {
        title: "Trade & Logistics",
        value: 15.5,
        note: "Domestic and international trade, transport, and logistics — Germany is Europe's key freight hub.",
        companies: [
          { name: "DHL (Deutsche Post)", link: "https://www.tradingview.com/symbols/XETR-DPW/" },
          { name: "Schenker (DB proxy)", link: "https://www.tradingview.com/symbols/XETR-DB1/" },
        ],
      },
    ],
    other: {
      share: 47.4,
      note: "Includes construction, education, healthcare, public administration, agriculture, and miscellaneous services.",
    },
  },
}

export default defineComponent({
  components: {
    Pie,
  },

  setup() {
    const SECTOR_COLORS: Record<string, string> = {
      Manufacturing: "#3A506B",
      "Information & Financial Services": "#00796B",
      "Trade & Logistics": "#F57C00",
      "Other Sectors": "#9CA3AF",
    }
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            color: "#374151",
            font: { size: 12 },
          },
        },
        title: {
          display: false,
        },
        datalabels: {
          color: "#fff",
          font: {
            weight: "bold" as const,
            size: 18,
          },
          formatter: (value: number, context: any) => {
            const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)
            const percent = (value / total) * 100
            return percent.toFixed(1) + "%"
          },
        },
      },
    }

    const chartData = computed(() => {
      const labels = [...MOCK_DATA.economic_structure.top_sectors.map((s) => s.title), "Other Sectors"]
      const data = [...MOCK_DATA.economic_structure.top_sectors.map((s) => s.value), MOCK_DATA.economic_structure.other.share]
      const backgroundColor = labels.map((label) => SECTOR_COLORS[label] || "#CCCCCC")

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            borderWidth: 1,
          },
        ],
      }
    })

    return {
      MOCK_DATA,
      chartData,
      chartOptions,
    }
  },
})
</script>
