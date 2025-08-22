<template>
  <section class="mb-8">
    <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center space-x-3 mb-8">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-people-group text-blue-900 text-lg" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Migration & Openness</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ MOCK_DATA.migration_and_openness.language_barrier.title }}
          </h3>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold to-gray-900">
              {{ MOCK_DATA.migration_and_openness.language_barrier.value }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            {{ MOCK_DATA.migration_and_openness.language_barrier.desc }}
          </p>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <p class="text-xs text-blue-700 font-medium">
              <strong>Note:</strong> {{ MOCK_DATA.migration_and_openness.language_barrier.note }}
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ MOCK_DATA.migration_and_openness.foreigner_access.title }}
          </h3>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold to-gray-900">
              {{ MOCK_DATA.migration_and_openness.foreigner_access.value }}
            </span>
          </div>
          <p class="text-sm text-gray-600">
            {{ MOCK_DATA.migration_and_openness.foreigner_access.desc }}
          </p>
        </div>

        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ MOCK_DATA.migration_and_openness.legalization_difficulty.title }}
          </h3>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold to-gray-900">
              {{ MOCK_DATA.migration_and_openness.legalization_difficulty.value }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-4">
            {{ MOCK_DATA.migration_and_openness.legalization_difficulty.desc }}
          </p>
          <div class="space-y-2">
            <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Requirements:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li v-for="(req, i) in MOCK_DATA.migration_and_openness.legalization_difficulty.requirements" :key="i">• {{ req }}</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ MOCK_DATA.migration_and_openness.citizenship_wait.title }}
          </h3>
          <div class="flex items-baseline space-x-1 mb-3">
            <span class="text-3xl font-bold text-gray-900">
              {{ MOCK_DATA.migration_and_openness.citizenship_wait.value }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-4">
            {{ MOCK_DATA.migration_and_openness.citizenship_wait.desc }}
          </p>
          <div class="space-y-2">
            <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Requirements:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li v-for="(req, i) in MOCK_DATA.migration_and_openness.citizenship_wait.requirements" :key="i">• {{ req }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ MOCK_DATA.migration_and_openness.residence_permit.title }}
        </h3>

        <!-- Value + desc -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-300 w-fit mb-3">
              <span class="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                {{ MOCK_DATA.migration_and_openness.residence_permit.value }}
              </span>
            </div>
            <p class="text-sm text-blue-900 leading-relaxed">
              {{ MOCK_DATA.migration_and_openness.residence_permit.desc }}
            </p>
          </div>
        </div>

        <!-- Pathways -->
        <div class="pt-4 border-t border-blue-200 mt-4">
          <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Available Pathways</p>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li
              v-for="(path, i) in MOCK_DATA.migration_and_openness.residence_permit.requirements"
              :key="i"
              v-html="highlightStrong(path)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const MOCK_DATA = {
  migration_and_openness: {
    language_barrier: {
      title: "Language Barrier",
      value: "Moderate",
      desc: "English is widely spoken in cities and among professionals, but German is essential for bureaucracy, healthcare, and most services.",
      note: "A2–B1 German level often required for integration.",
    },
    residence_permit: {
      title: "Residence Permit",
      value: "Yes",
      desc: "Germany offers residence permits through freelance, employment, or investment pathways.",
      requirements: [
        "Freelancers (Freiberufler) with clients or income proof",
        "Skilled workers with job offer or Blue Card eligibility",
        "Entrepreneurs with viable business plans and capital",
        "Investors meeting minimum capital requirements (~€250k)",
      ],
    },
    legalization_difficulty: {
      title: "Legalization Process Difficulty",
      value: "Moderate",
      desc: "Requires paperwork, local registration, and sometimes proof of income or client contracts. Processing may take 2–4 months.",
      requirements: [
        "Local address registration (Anmeldung)",
        "Health insurance coverage",
        "Proof of stable income or client contracts",
        "German tax ID (Steuer-ID)",
        "Potential business plan submission",
      ],
    },
    foreigner_access: {
      title: "Access to Banking & Business for Foreigners",
      value: "Medium",
      desc: "Opening a bank account usually requires proof of local address and tax ID. Business registration is available but can be bureaucratic.",
    },
    citizenship_wait: {
      title: "Time to Citizenship",
      value: "5–8 years",
      desc: "Depends on residency duration, language level, and integration.",
      requirements: [
        "5–8 years of continuous legal residence",
        "B1-level German language certificate",
        "Stable income and financial independence",
        "Clean criminal record",
        "Passed integration or naturalization test",
        "Willingness to uphold constitutional values",
      ],
    },
  },
}

export default defineComponent({
  setup() {
    const highlightStrong = (text: string) => {
      return text.replace(/^([^()]+)\s/, "<strong>$1</strong> ")
    }

    return {
      MOCK_DATA,
      highlightStrong,
    }
  },
})
</script>
