<template>
  <div class="min-h-screen bg-white" v-if="getCountriesData">
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <!-- Country name + last updated at -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-4">
              <h1 class="text-4xl font-bold text-gray-900 tracking-tight">{{ getCountriesData?.country }}</h1>
              <span class="text-sm text-gray-600 font-medium tracking-wide bg-gray-100 rounded px-2 py-1">
                {{ MOCK_DATA.header.currency.short }} - {{ MOCK_DATA.header.currency.name }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Last Updated</div>
            <div class="text-gray-700 font-medium">{{ formattedDate }}</div>
          </div>
        </div>

        <!-- Economy score + status -->
        <div class="mt-6 flex items-center space-x-6">
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Economic Pulse Score</div>
            <div class="flex items-center space-x-2">
              <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :class="{
                    'bg-gradient-to-r from-red-500 to-red-600': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                    'bg-gradient-to-r from-orange-400 to-orange-500': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                    'bg-gradient-to-r from-yellow-300 to-yellow-400': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                    'bg-gradient-to-r from-green-400 to-green-500': MOCK_DATA.header.score.status === 'STABLE',
                    'bg-gradient-to-r from-emerald-500 to-emerald-600': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
                  }"
                  :style="{ width: MOCK_DATA.header.score.value + '%' }"
                />
              </div>
              <span
                class="text-2xl font-bold"
                :class="{
                  'text-red-500': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                  'text-orange-500': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                  'text-yellow-500': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                  'text-green-500': MOCK_DATA.header.score.status === 'STABLE',
                  'text-emerald-500': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
                }"
              >
                {{ MOCK_DATA.header.score.value }}
              </span>
              <span class="text-gray-400 font-medium">/100</span>
            </div>
          </div>

          <div
            class="flex items-center space-x-2 px-3 py-1 rounded-full border"
            :class="{
              'bg-red-50 border-red-200': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
              'bg-orange-50 border-orange-200': MOCK_DATA.header.score.status === 'HIGH_TENSION',
              'bg-yellow-50 border-yellow-200': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
              'bg-green-50 border-green-200': MOCK_DATA.header.score.status === 'STABLE',
              'bg-emerald-50 border-emerald-200': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
            }"
          >
            <span
              class="w-2 h-2 rounded-full animate-pulse"
              :class="{
                'bg-red-500': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                'bg-orange-400': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                'bg-yellow-400': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                'bg-green-400': MOCK_DATA.header.score.status === 'STABLE',
                'bg-emerald-500': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
              }"
            ></span>
            <span
              class="text-sm font-medium uppercase tracking-wide"
              :class="{
                'text-red-700': MOCK_DATA.header.score.status === 'CRITICAT_RISK',
                'text-orange-700': MOCK_DATA.header.score.status === 'HIGH_TENSION',
                'text-yellow-700': MOCK_DATA.header.score.status === 'MODERATE_TENSION',
                'text-green-700': MOCK_DATA.header.score.status === 'STABLE',
                'text-emerald-700': MOCK_DATA.header.score.status === 'STRONG_GROWTH',
              }"
            >
              {{ MOCK_DATA.header.score.status.replaceAll("_", " ") }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="flex justify-center py-10 rounded-lg bg-slate-300">
      <div class="relative w-96 h-72 overflow-hidden flex-shrink-0">
        <div
          class="absolute inset-0"
          :style="{
            maskImage: `url('/masks/country_${getCountriesData?.country_iso}.svg')`,
            maskRepeat: getCountriesData?.mask_repeat,
            maskSize: getCountriesData?.mask_size,
            maskPosition: getCountriesData?.mask_position,

            WebkitMaskImage: `url('/masks/country_${getCountriesData?.country_iso}.svg')`,
            WebkitMaskRepeat: getCountriesData?.webkit_mask_repeat,
            WebkitMaskSize: getCountriesData?.webkit_mask_size,
            WebkitMaskPosition: getCountriesData?.webkit_mask_position,
          }"
        >
          <div
            class="w-full h-full"
            :style="{
              backgroundImage: `url('/flags/flag_${getCountriesData?.country_iso}.svg')`,
              backgroundSize: getCountriesData?.background_size,
              backgroundPosition: getCountriesData?.background_position,
              backgroundRepeat: getCountriesData?.background_repeat,
            }"
          />
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-globe text-blue-900 text-lg" />
            </div>

            <h2 class="text-2xl font-bold text-gray-900">Economic Overview</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Text Summary -->
            <div class="lg:col-span-2">
              <p class="text-gray-600 leading-relaxed text-lg mb-4" v-for="(value, index) in MOCK_DATA.overview.summary" :key="index">
                {{ value }}
              </p>
            </div>

            <!-- Key Highlights -->
            <div class="space-y-4">
              <!-- Highlight Card -->
              <div
                v-for="(item, index) in MOCK_DATA.overview.highlights"
                :key="index"
                class="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200"
              >
                <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">Economic Signal</div>
                <div class="text-xl font-semibold text-blue-900 mb-1 leading-snug">
                  {{ item.title }}
                </div>
                <div class="text-sm text-blue-900 leading-relaxed">
                  {{ item.subtitle }}
                </div>
              </div>
            </div>
          </div>

          <!-- Causes & Implications -->
          <div class="flex flex-col gap-6 mt-8">
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-800">Likely Causes:</h3>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li v-for="(value, index) in MOCK_DATA.overview.causes" :key="index">{{ value }}</li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-800">Implications:</h3>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Investors:</strong> {{ MOCK_DATA.overview.implications.investors }}</li>
                <li><strong>Businesses:</strong> {{ MOCK_DATA.overview.implications.businesses }}</li>
                <li><strong>Relocation:</strong> {{ MOCK_DATA.overview.implications.relocation }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-sack-dollar text-blue-900 text-lg" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Income & Standard of Living</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(item, index) in MOCK_DATA.income_and_standard_of_living"
              :key="index"
              class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.title }}</h3>
              </div>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">
                  <template v-if="item.from && item.to"> {{ item.unit }}{{ item.from }} – {{ item.unit }}{{ item.to }} </template>
                  <template v-else> {{ item.unit }}{{ item.to }} </template>
                </span>
                <span v-if="item.period" class="text-sm text-gray-500">/ {{ item.period }}</span>
              </div>

              <div
                class="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 max-w-xs -top-2 left-1/2 -translate-x-1/2 -translate-y-full shadow-lg whitespace-normal text-left"
              >
                {{ item.desc }}
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-scale-balanced text-blue-900 text-lg" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Taxes & Conditions for Business</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">
                {{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.title }}
              </h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.from
                  }}{{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.unit }} -
                  {{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.to
                  }}{{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.unit }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ MOCK_DATA.taxes_and_conditions_for_business.personal_income_tax.desc }}</p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">
                {{ MOCK_DATA.taxes_and_conditions_for_business.corporate_tax.title }}
              </h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.corporate_tax.value
                  }}{{ MOCK_DATA.taxes_and_conditions_for_business.corporate_tax.unit }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ MOCK_DATA.taxes_and_conditions_for_business.corporate_tax.desc }}</p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">{{ MOCK_DATA.taxes_and_conditions_for_business.vat.title }}</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.vat.from }}{{ MOCK_DATA.taxes_and_conditions_for_business.vat.unit }} -
                  {{ MOCK_DATA.taxes_and_conditions_for_business.vat.to }}{{ MOCK_DATA.taxes_and_conditions_for_business.vat.unit }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ MOCK_DATA.taxes_and_conditions_for_business.vat.desc }}</p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">
                {{ MOCK_DATA.taxes_and_conditions_for_business.business_setup.title }}
              </h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-orange-500">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.business_setup.value }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ MOCK_DATA.taxes_and_conditions_for_business.business_setup.desc }}</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.title }}</h3>
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <span class="text-2xl font-bold text-orange-600">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.value }}
                </span>
                <p class="text-sm text-gray-600 mt-3">
                  {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.desc }}
                </p>
              </div>
            </div>
            <div class="bg-orange-100 border-l-4 border-orange-400 p-4 mt-4 rounded">
              <p class="text-sm text-orange-700 font-medium">
                <strong>Note:</strong> {{ MOCK_DATA.taxes_and_conditions_for_business.tax_benefits.note }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Real Estate</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Average Price (Capital)</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">$5,800</span>
                <span class="text-sm text-gray-500">/m²</span>
              </div>
              <p class="text-sm text-gray-600">Housing price per square meter in the capital city (e.g. Berlin)</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Average Price (Regional)</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">$3,100</span>
                <span class="text-sm text-gray-500">/m²</span>
              </div>
              <p class="text-sm text-gray-600">Average housing cost per m² outside major cities</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Price Change YoY</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-red-600">-1.5%</span>
              </div>
              <p class="text-sm text-gray-600">Annual change in housing prices. Positive = growth, negative = decline</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Rental Yield</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">3.6%</span>
              </div>
              <p class="text-sm text-gray-600">Gross return on residential property before taxes and expenses</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                <path
                  d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Migration & Openness</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Language Barrier</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-orange-500">Moderate</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">
                English is widely spoken in cities and among professionals, but German is essential for bureaucracy, healthcare, and most
                services.
              </p>
              <div class="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                <p class="text-xs text-orange-700 font-medium"><strong>Note:</strong> A2–B1 German level often required for integration.</p>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Access to Banking & Business for Foreigners</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-yellow-600">Medium</span>
              </div>
              <p class="text-sm text-gray-600">
                Opening a bank account usually requires proof of local address and tax ID. Business registration is available but can be
                bureaucratic.
              </p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Legalization Process Difficulty</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-orange-500">Moderate</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">
                Requires paperwork, local registration, and sometimes proof of income or client contracts. Processing may take 2–4 months.
              </p>
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Requirements:</p>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li>• Local address registration (Anmeldung)</li>
                  <li>• Health insurance coverage</li>
                  <li>• Proof of stable income or client contracts</li>
                  <li>• German tax ID (Steuer-ID)</li>
                  <li>• Potential business plan submission</li>
                </ul>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Time to Citizenship</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">5–8 years</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">Depends on residency duration, language level, and integration.</p>
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Requirements:</p>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li>• 5–8 years of continuous legal residence</li>
                  <li>• B1-level German language certificate</li>
                  <li>• Stable income and financial independence</li>
                  <li>• Clean criminal record</li>
                  <li>• Passed integration or naturalization test</li>
                  <li>• Willingness to uphold constitutional values</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Residence Permit</h3>
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <span class="text-2xl font-bold text-blue-600">Yes</span>
                <p class="text-sm text-gray-600 mt-3">
                  Germany offers residence permits through freelance, employment, or investment pathways.
                </p>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Available Pathways:</p>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>• <strong>Freelancers (Freiberufler)</strong> with clients or income proof</li>
                <li>• <strong>Skilled workers</strong> with job offer or Blue Card eligibility</li>
                <li>• <strong>Entrepreneurs</strong> with viable business plans and capital</li>
                <li>• <strong>Investors</strong> meeting minimum capital requirements (~€250k)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Infrastructure</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Internet (Speed & Cost)</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-2xl font-bold text-gray-900">100–250 Mbps</span>
              </div>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-lg font-bold text-cyan-600">~€35</span>
                <span class="text-sm text-gray-500">/month</span>
              </div>
              <p class="text-sm text-gray-600">
                Fast and widely available fixed broadband. 5G in major cities. Average cost around €35/month.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Electricity Reliability</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-green-600">Very High</span>
              </div>
              <p class="text-sm text-gray-600">Stable and uninterrupted power supply, outages are rare.</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Access to Healthcare</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-blue-600">Universal</span>
              </div>
              <p class="text-sm text-gray-600">
                Germany offers a universal healthcare system. Private insurance available. Quality is high.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Banking Access</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-purple-600">High</span>
              </div>
              <p class="text-sm text-gray-600">
                Widespread ATM and branch access. Digital banks also available. Some bureaucracy for foreigners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-chart-line text-blue-900 text-lg" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Macroeconomic Indicators</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(item, index) in MOCK_DATA.macroeconomic"
              :key="index"
              class="relative group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.title }}</h3>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">{{ item.value }}</p>

              <div
                class="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 max-w-xs -top-2 left-1/2 -translate-x-1/2 -translate-y-full shadow-lg whitespace-normal text-left"
              >
                {{ item.desc }}
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-coins text-blue-900 text-lg"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Currency Exchange Rates</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(item, index) in MOCK_DATA.currency_exchange"
              :key="index"
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ item.pair }}</h3>
              </div>
              <p class="text-2xl font-bold text-gray-900 mb-1">
                1 {{ item.pair.split("/")[0] }} = {{ item.value }} {{ item.pair.split("/")[1] }}
              </p>
              <p class="text-xs text-gray-500">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                  fillRule="evenodd"
                  d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Economic Structure</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900">Manufacturing</h3>
                <span class="text-2xl font-bold text-blue-600">20.8%</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">
                Germany's core export engine: includes automotive, machinery, industrial equipment, and electronics.
              </p>
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Companies:</p>
                <div class="space-y-1">
                  <a
                    href="https://www.tradingview.com/symbols/XETR-VOW3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    • Volkswagen
                  </a>
                  <a
                    href="https://www.tradingview.com/symbols/XETR-SIE/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    • Siemens
                  </a>
                  <a
                    href="https://www.tradingview.com/symbols/XETR-SIE/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    • Bosch (proxy via Siemens)
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900">Information & Financial Services</h3>
                <span class="text-2xl font-bold text-green-600">16.3%</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">
                Covers IT, telecom, banking, and insurance — a growing sector driving digital transformation.
              </p>
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Companies:</p>
                <div class="space-y-1">
                  <a
                    href="https://www.tradingview.com/symbols/XETR-SAP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-green-600 hover:text-green-800 underline"
                  >
                    • SAP
                  </a>
                  <a
                    href="https://www.tradingview.com/symbols/XETR-DTE/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-green-600 hover:text-green-800 underline"
                  >
                    • Deutsche Telekom
                  </a>
                  <a
                    href="https://www.tradingview.com/symbols/XETR-DBK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-green-600 hover:text-green-800 underline"
                  >
                    • Deutsche Bank
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-900">Trade & Logistics</h3>
                <span class="text-2xl font-bold text-purple-600">15.5%</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">
                Domestic and international trade, transport, and logistics — Germany is Europe's key freight hub.
              </p>
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Companies:</p>
                <div class="space-y-1">
                  <a
                    href="https://www.tradingview.com/symbols/XETR-DPW/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-purple-600 hover:text-purple-800 underline"
                  >
                    • DHL (Deutsche Post)
                  </a>
                  <a
                    href="https://www.tradingview.com/symbols/XETR-DB1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-xs text-purple-600 hover:text-purple-800 underline"
                  >
                    • Schenker (DB proxy)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-bold text-gray-900">Other Sectors</h3>
              <span class="text-2xl font-bold text-gray-700">47.4%</span>
            </div>
            <p class="text-sm text-gray-600">
              Includes construction, education, healthcare, public administration, agriculture, and miscellaneous services.
            </p>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Society & Politics</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Population</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-gray-900">84 million</span>
              </div>
              <p class="text-sm text-gray-600">Total number of residents in Germany</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Population Growth</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-green-600">0.2% YoY</span>
              </div>
              <p class="text-sm text-gray-600">Annual change in total population</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Birth Rate</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-orange-600">1.4</span>
                <span class="text-sm text-gray-500">per woman</span>
              </div>
              <p class="text-sm text-gray-600">Average number of children per woman</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Corruption Perception Index</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-blue-600">79</span>
                <span class="text-sm text-gray-500">/ 100</span>
              </div>
              <p class="text-sm text-gray-600">Transparency International score (higher = cleaner)</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Political Stability & Democracy</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-green-600">High</span>
              </div>
              <p class="text-sm text-gray-600">Stable government, strong democratic institutions, low risk of unrest</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4">Urbanization Level</h3>
              <div class="flex items-baseline space-x-1 mb-3">
                <span class="text-3xl font-bold text-purple-600">78%</span>
              </div>
              <p class="text-sm text-gray-600">Percentage of population living in cities</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { TheFooter } from "~/components"
import { useIncomingDataStore } from "~/store"

enum ScoreStatusEnum {
  CRITICAT_RISK = "CRITICAT_RISK",
  HIGH_TENSION = "HIGH_TENSION",
  MODERATE_TENSION = "MODERATE_TENSION",
  STABLE = "STABLE",
  STRONG_GROWTH = "STRONG_GROWTH",
}

const MOCK_DATA = {
  header: {
    currency: {
      name: "Euro",
      short: "EUR",
    },
    last_updated: "2025-08-20",
    score: {
      value: 85,
      status: ScoreStatusEnum.STABLE,
    },
  },
  overview: {
    summary: [
      "Prices are still rising faster than they should. The cost of living is going up, and loans remain expensive because the central bank is trying to control inflation.",
      "Factories and businesses are slowing down. Companies are making and selling less than before, and investors are feeling cautious about the future.",
      "Unemployment is not very high, but job growth has stopped. Especially in industrial areas, it's getting harder to find new work.",
      "Housing is still expensive, but prices are no longer rising quickly. Many experts think the real estate market could cool down or even drop a bit.",
    ],
    highlights: [
      {
        title: "Prices are still high",
        subtitle: "The cost of living remains elevated, and loans are expensive",
      },
      {
        title: "Housing stays expensive",
        subtitle: "Property prices are high, and affordability is falling",
      },
    ],
    causes: [
      "Energy costs are still high after the shocks of 2022, making it harder for factories to stay competitive.",
      "The European Central Bank raised interest rates to fight inflation, which made borrowing more expensive.",
      "Exports to other countries have slowed down, especially to China and the U.S.",
      "Consumers are spending less because prices are high and they’re unsure about the future.",
    ],
    implications: {
      investors: "This is not the best time for short-term profits, but stable companies may still offer long-term value.",
      businesses: "Small and mid-sized businesses may struggle with high costs and slow demand. Export-oriented firms are hit hardest.",
      relocation: "Germany remains a solid choice for relocation, but expect higher living costs and slower job markets in some regions.",
    },
  },
  macroeconomic: [
    {
      title: "Interest Rate (ECB Main Refinancing)",
      value: "2.15%",
      desc: "European Central Bank main refinancing rate applied to Germany",
    },
    {
      title: "Inflation (CPI, Germany)",
      value: "2.0%",
      desc: "Year-on-year consumer price growth",
    },
    {
      title: "Unemployment Rate",
      value: "3.7%",
      desc: "OECD estimate for May 2025",
    },
    {
      title: "Manufacturing PMI",
      value: "49.1",
      desc: "July 2025; below 50 signals contraction",
    },
    {
      title: "10‑Year Bond Yield",
      value: "2.72%",
      desc: "Germany 10-year government bund yield",
    },
    {
      title: "GDP Growth (2025 forecast)",
      value: "0.4%",
      desc: "Expected real GDP growth for 2025",
    },
    {
      title: "GDP per Capita (Nominal)",
      value: "$55,900",
      desc: "Annual income per person (US$)",
    },
    {
      title: "Nominal GDP",
      value: "$4.66T",
      desc: "Total economic output in USD",
    },
    {
      title: "GDP by PPP",
      value: "$6.16T",
      desc: "GDP adjusted by purchasing power parity",
    },
  ],
  currency_exchange: [
    {
      pair: "EUR/USD",
      value: "1.165",
      desc: "Euro to US Dollar (ECB reference rate)",
    },
    {
      pair: "EUR/GBP",
      value: "0.865",
      desc: "Euro to British Pound (ECB reference rate)",
    },
    {
      pair: "EUR/CHF",
      value: "0.950",
      desc: "Euro to Swiss Franc (approximate mid-market)",
    },
    {
      pair: "EUR/PLN",
      value: "4.45",
      desc: "Euro to Polish Zloty (approximate mid-market)",
    },
    {
      pair: "EUR/JPY",
      value: "159.0",
      desc: "Euro to Japanese Yen (approximate mid-market)",
    },
    {
      pair: "EUR/CNY",
      value: "7.80",
      desc: "Euro to Chinese Yuan (approximate mid-market)",
    },
  ],
  income_and_standard_of_living: [
    {
      title: "Minimum Wage (gross)",
      from: "",
      to: "2,200",
      unit: "€",
      period: "month",
      desc: "Legal minimum before taxes",
    },
    {
      title: "Average Net Salary",
      from: "2,800",
      to: "3,300",
      unit: "€",
      period: "month",
      desc: "Estimated take‑home pay after deductions",
    },
    {
      title: "Living Wage (estimated)",
      from: "1,600",
      to: "1,800",
      unit: "€",
      period: "month",
      desc: "Approximate monthly expenses for basic living",
    },
  ],
  taxes_and_conditions_for_business: {
    personal_income_tax: {
      title: "Personal Income Tax",
      desc: "Higher income = higher tax. Top rate applies from ~€278K/year",
      from: 14,
      to: 45,
      unit: "%",
    },
    corporate_tax: {
      title: "Corporate Tax (Total)",
      desc: "Includes corporate tax, trade tax, and solidarity surcharge",
      value: 30,
      unit: "%",
    },
    vat: {
      title: "VAT (Value-Added Tax)",
      desc: "Lower rate for essentials (food, books); standard for most goods",
      from: 7,
      to: 19,
      unit: "%",
    },
    tax_benefits: {
      title: "Tax Benefits",
      value: "Limited",
      desc: "Germany offers partial tax relief for freelancers: exemption from trade tax (Gewerbesteuer), but no broader incentives.",
      note: "Applies mainly to those officially registered as 'Freiberufler'.",
    },
    business_setup: {
      title: "Business Setup Difficulty",
      desc: "Not very hard, but paperwork and local offices are involved",
      value: "Moderate",
    },
  },
  real_estate: {
    capital_price: {
      title: "Average Price (Capital)",
      desc: "Housing price per square meter in the capital city (e.g. Berlin)",
      value: 5800,
      unit: "$/m²",
    },
    regional_price: {
      title: "Average Price (Regional)",
      desc: "Average housing cost per m² outside major cities",
      value: 3100,
      unit: "$/m²",
    },
    price_change_yoy: {
      title: "Price Change YoY",
      desc: "Annual change in housing prices. Positive = growth, negative = decline",
      value: -1.5,
      unit: "%",
    },
    rental_yield: {
      title: "Rental Yield",
      desc: "Gross return on residential property before taxes and expenses",
      value: 3.6,
      unit: "%",
    },
  },
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
  infrastructure: {
    internet: {
      title: "Internet (Speed & Cost)",
      value: "100–250 Mbps / ~€35",
      desc: "Fast and widely available fixed broadband. 5G in major cities. Average cost around €35/month.",
    },
    electricity: {
      title: "Electricity Reliability",
      value: "Very High",
      desc: "Stable and uninterrupted power supply, outages are rare.",
    },
    healthcare: {
      title: "Access to Healthcare",
      value: "Universal",
      desc: "Germany offers a universal healthcare system. Private insurance available. Quality is high.",
    },
    banking_access: {
      title: "Banking Access",
      value: "High",
      desc: "Widespread ATM and branch access. Digital banks also available. Some bureaucracy for foreigners.",
    },
  },
  economic_structure: {
    top_sectors: [
      {
        name: "Manufacturing",
        share: 20.8,
        desc: "Germany's core export engine: includes automotive, machinery, industrial equipment, and electronics.",
        companies: [
          { name: "Volkswagen", link: "https://www.tradingview.com/symbols/XETR-VOW3/" },
          { name: "Siemens", link: "https://www.tradingview.com/symbols/XETR-SIE/" },
          { name: "Bosch (proxy via Siemens)", link: "https://www.tradingview.com/symbols/XETR-SIE/" },
        ],
      },
      {
        name: "Information & Financial Services",
        share: 16.3,
        desc: "Covers IT, telecom, banking, and insurance — a growing sector driving digital transformation.",
        companies: [
          { name: "SAP", link: "https://www.tradingview.com/symbols/XETR-SAP/" },
          { name: "Deutsche Telekom", link: "https://www.tradingview.com/symbols/XETR-DTE/" },
          { name: "Deutsche Bank", link: "https://www.tradingview.com/symbols/XETR-DBK/" },
        ],
      },
      {
        name: "Trade & Logistics",
        share: 15.5,
        desc: "Domestic and international trade, transport, and logistics — Germany is Europe's key freight hub.",
        companies: [
          { name: "DHL (Deutsche Post)", link: "https://www.tradingview.com/symbols/XETR-DPW/" },
          { name: "Schenker (DB proxy)", link: "https://www.tradingview.com/symbols/XETR-DB1/" },
        ],
      },
    ],

    other: {
      share: 47.4,
      desc: "Includes construction, education, healthcare, public administration, agriculture, and miscellaneous services.",
    },
  },
  society_and_politics: {
    population: {
      title: "Population",
      value: "84 million",
      desc: "Total number of residents in Germany",
    },
    population_growth: {
      title: "Population Growth",
      value: "0.2% YoY",
      desc: "Annual change in total population",
    },
    birth_rate: {
      title: "Birth Rate",
      value: "1.4 per woman",
      desc: "Average number of children per woman",
    },
    corruption_index: {
      title: "Corruption Perception Index",
      value: "79 / 100",
      desc: "Transparency International score (higher = cleaner)",
    },
    political_stability: {
      title: "Political Stability & Democracy",
      value: "High",
      desc: "Stable government, strong democratic institutions, low risk of unrest",
    },
    urbanization: {
      title: "Urbanization Level",
      value: "78%",
      desc: "Percentage of population living in cities",
    },
  },
}

export default defineComponent({
  components: {
    TheFooter,
  },

  setup() {
    const incomingDataStore = useIncomingDataStore()
    const route = useRoute()
    const slug = route.params.slug

    const getCountriesData = computed(() => incomingDataStore.getCountriesData?.find((item) => item.slug === slug))
    const formattedDate = computed(() => {
      return new Date(MOCK_DATA.header.last_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    })

    return {
      getCountriesData,
      formattedDate,
      MOCK_DATA,
    }
  },
})
</script>
