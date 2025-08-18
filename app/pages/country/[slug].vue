<template>
  <div class="min-h-screen bg-white">
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-4">
              <h1 class="text-4xl font-bold text-gray-900 tracking-tight">{{ getCountriesData?.country }}</h1>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Last Updated</div>
            <div class="text-gray-700 font-medium">{{ formattedDate }}</div>
          </div>
        </div>
        <div class="mt-6 flex items-center space-x-6">
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-500 uppercase tracking-wide font-medium">Economic Pulse Score</div>
            <div class="flex items-center space-x-2">
              <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" :style="{ width: '53%' }" />
              </div>
              <span class="text-2xl font-bold text-orange-500">53</span>
              <span class="text-gray-400 font-medium">/100</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full border border-green-200">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-sm font-medium text-green-700">Market Open</span>
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
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Economic Overview</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Text Summary -->
            <div class="lg:col-span-2">
              <p class="text-gray-600 leading-relaxed text-lg mb-4">
                Germany continues to experience economic slowdown. Inflation has stabilized at 3.1%, but remains above the ECB's target
                (2%), so the interest rate stays high at 4.5%.
              </p>
              <p class="text-gray-600 leading-relaxed text-lg mb-4">
                Business activity is weakening — PMI fell below 50, indicating contraction in manufacturing and services. Stock market
                dipped, reflecting lower growth expectations.
              </p>
              <p class="text-gray-600 leading-relaxed text-lg mb-4">
                Unemployment remains moderate, but job growth has stalled, especially in industry. Euro is stable, showing no major capital
                flight.
              </p>
              <p class="text-gray-600 leading-relaxed text-lg">
                Real estate remains expensive, but price growth is slowing. With weak GDP and high rates, the market may face a correction.
              </p>
            </div>

            <!-- Key Highlights -->
            <div class="space-y-4">
              <div class="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div class="text-sm font-medium text-orange-700 mb-1">Key Highlight</div>
                <div class="text-lg font-bold text-orange-800">Inflation Above Target</div>
                <div class="text-sm text-orange-600">Interest rate stays high to counter inflation</div>
              </div>
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div class="text-sm font-medium text-blue-700 mb-1">PMI Indicator</div>
                <div class="text-lg font-bold text-blue-800">Below 50</div>
                <div class="text-sm text-blue-600">Signals contraction in manufacturing</div>
              </div>
            </div>
          </div>

          <!-- Causes & Implications -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-800">Likely Causes:</h3>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Weak external demand (especially from China)</li>
                <li>High energy and import costs</li>
                <li>Structural dependence on pressured manufacturing sector</li>
                <li>Strict ECB policy suppressing investments</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-800">Implications:</h3>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Investors:</strong> Low yield environment, cautious bond/real estate growth</li>
                <li><strong>Businesses:</strong> High costs, low demand — better to focus on exports or B2B</li>
                <li><strong>Relocation:</strong> Great infrastructure, but expensive. No growth boom expected</li>
              </ul>
            </div>
          </div>

          <!-- Outlook -->
          <div class="mt-6 text-sm text-gray-700 border-t border-gray-100 pt-4">
            <strong>12-Month Outlook:</strong> Stability: High / Growth: Low / Investment Attractiveness: Neutral / Risks: Stagnation
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Macroeconomic Indicators</h2>
            <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Live Data</div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Interest Rate</h3>
                <div class="flex items-center space-x-1 text-red-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">+0.25</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">4.5%</p>
              <p class="text-xs text-gray-500">ECB Policy Rate</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Inflation (CPI)</h3>
                <div class="flex items-center space-x-1 text-green-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">-0.4</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">3.1%</p>
              <p class="text-xs text-gray-500">Year-over-year</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Unemployment</h3>
                <div class="flex items-center space-x-1 text-green-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">-0.2</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">5.7%</p>
              <p class="text-xs text-gray-500">Seasonally adjusted</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">PMI</h3>
                <div class="flex items-center space-x-1 text-red-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">-1.8</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">47.2</p>
              <p class="text-xs text-gray-500">Manufacturing</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">EUR/USD</h3>
                <div class="flex items-center space-x-1 text-green-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">+0.02</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">1.08</p>
              <p class="text-xs text-gray-500">Exchange rate</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">10Y Bond Yield</h3>
                <div class="flex items-center space-x-1 text-red-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">+0.1</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">2.3%</p>
              <p class="text-xs text-gray-500">Government bonds</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">GDP per Capita</h3>
                <div class="flex items-center space-x-1 text-green-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="text-xs font-medium">+2.1%</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">$50,800</p>
              <p class="text-xs text-gray-500">Nominal USD</p>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">GDP Growth</h3>
                <div class="flex items-center space-x-1 text-yellow-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span class="text-xs font-medium">0.0</span>
                </div>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-1">0.3%</p>
              <p class="text-xs text-gray-500">Quarterly annualized</p>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <section>
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Real Estate</h2>
            </div>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Housing Price Index</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">142.3</span>
                  <div class="flex items-center text-green-500 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    +5.2% YoY
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Rental Yield</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">3.8%</span>
                  <div class="text-gray-500 text-xs">Berlin avg</div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Mortgage Rate</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">3.9%</span>
                  <div class="text-gray-500 text-xs">30-year fixed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Income & Taxes</h2>
            </div>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Average Wage</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">€4,200</span>
                  <div class="text-gray-500 text-xs">Monthly gross</div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Income Tax Rate</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">42%</span>
                  <div class="text-gray-500 text-xs">Top marginal</div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">VAT Rate</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">19%</span>
                  <div class="text-gray-500 text-xs">Standard rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  <path
                    d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Business & Migration</h2>
            </div>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Ease of Business</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">22/190</span>
                  <div class="text-gray-500 text-xs">World Bank rank</div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Visa Access</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">188</span>
                  <div class="text-gray-500 text-xs">countries</div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600 font-medium">Global Innovation</span>
                <div class="text-right">
                  <span class="font-bold text-gray-900 text-lg">8/132</span>
                  <div class="text-gray-500 text-xs">Innovation index</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { TheFooter } from "~/components"
import { useIncomingDataStore } from "~/store"

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
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    })

    return {
      getCountriesData,
      formattedDate,
    }
  },
})
</script>
