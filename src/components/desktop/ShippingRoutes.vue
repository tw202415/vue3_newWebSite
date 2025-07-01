<template>
  <section class="py-10 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
      <!-- Animated Network Lines -->
      <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M100,200 Q500,100 900,300" stroke="url(#lineGradient)" stroke-width="2" fill="none" class="animate-draw-line">
          <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M100,400 Q500,300 900,500" stroke="url(#lineGradient)" stroke-width="2" fill="none" class="animate-draw-line" style="animation-delay: 1s;">
          <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M100,600 Q500,500 900,700" stroke="url(#lineGradient)" stroke-width="2" fill="none" class="animate-draw-line" style="animation-delay: 2s;">
          <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 運費試算 -->
      <FreightCalculator />
      <!-- 代購試算 -->
      <DaiguoCalculator />

      <!-- 全球集運服務 -->
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
          <Globe :size="16" class="text-blue-400 mr-2" />
          <span class="text-blue-300 text-sm font-medium">全球智能網絡</span>
        </div>
        <h2 class="text-4xl font-bold mb-4">
          <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {{ t('shipping.routes.title') }}
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          {{ t('shipping.routes.subtitle') }}
        </p>
      </div>
      <div class="relative mb-16">
        <!-- Countries Grid with 3D Effect -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <router-link
            v-for="(country, index) in countries"
            :key="country.code"
            :to="`/${country.code}`"
            class="group animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer">
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Country Flag with 3D Effect -->
              <div class="relative text-center">
                <div class="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                  {{ country.flag }}
                </div>
                
                <!-- Holographic Ring -->
                <div class="absolute inset-0 rounded-full border-2 border-blue-400/30 scale-150 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                
                <h3 class="font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                  {{ country.name }}
                </h3>
                
                <div class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {{ t(`shipping.routes.countries.${country.code}`) }}
                </div>

                <!-- Status Indicator -->
                <div class="mt-3 flex items-center justify-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-xs text-green-400">線上</span>
                </div>
              </div>

              <!-- Hover Effect Lines -->
              <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </router-link>
        </div>

      </div>

      <!-- 海外代購 -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-white mb-8">
          <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {{ t('shopping.title') }}
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="country in shoppingCountries"
            :key="country.code"
            :to="`/shop/${country.code}`"
            class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative text-center">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{{ country.flag }}</div>
              <div class="font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{{ country.name }}</div>
              <div class="text-sm text-blue-400 mt-1 group-hover:text-blue-300 transition-colors duration-300">{{ t('shopping.browse') }}</div>
            </div>

            <!-- Hover Effect Arrow -->
            <div class="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight :size="16" class="text-blue-400" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight, Globe } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import FreightCalculator from '@/components/desktop/FreightCalculator.vue';
import DaiguoCalculator from '@/components/desktop/DaiguoCalculator.vue';
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n();

const route = useRoute()
const router = useRouter()

const countries = [
  { code: 'shanghaiAirFreight', name: '中國', flag: '🇨🇳'},
  { code: 'shenzhenAirFreight', name: '中國', flag: '🇨🇳'},
  { code: 'shenzhenSeaExpress', name: '中國', flag: '🇨🇳'},
  { code: 'japan', name: '日本', flag: '🇯🇵'},
  { code: 'korea', name: '韓國', flag: '🇰🇷'},
  { code: 'japanEmsAir', name: '日本', flag: '🇯🇵'},
  { code: 'japanEmsSea', name: '日本', flag: '🇯🇵'},
  { code: 'usa', name: '美國', flag: '🇺🇸'},
  { code: 'usa2', name: '美國', flag: '🇺🇸'},
  { code: 'germany', name: '德國', flag: '🇩🇪'},
];

const shoppingCountries = [
  { code: 'japan', name: '日本', flag: '🇯🇵', menuId: '4', subId: '12' },
  { code: 'korea', name: '韓國', flag: '🇰🇷', menuId: '4', subId: '14' },
  { code: 'germany', name: '德國', flag: '🇩🇪', menuId: '4', subId: '16' }
];

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes flow {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg) scale(1.5); }
  to { transform: rotate(360deg) scale(1.5); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg) scale(2); }
  to { transform: rotate(0deg) scale(2); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-flow {
  animation: flow 2s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 6s linear infinite;
}
</style>