<template>
  <section class="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
      <div class="absolute inset-0 opacity-10">
        <div class="tech-grid"></div>
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
          <Cpu :size="16" class="text-blue-400 mr-2" />
          <span class="text-blue-300 text-sm font-medium">下一代技術</span>
        </div>
        <h2 class="text-4xl font-bold mb-4">
          <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {{ t('features.title') }}
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          運用最先進的AI、區塊鏈和物聯網技術，為您提供前所未有的集運體驗
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="group animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Icon Container -->
            <div class="relative mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                <component :is="feature.icon" :size="32" class="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <!-- Floating Particles -->
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-400/60 rounded-full animate-ping"></div>
            </div>

            <h3 class="text-xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
              {{ t(`features.items.${feature.id}.title`) }}
            </h3>
            
            <p class="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {{ t(`features.items.${feature.id}.description`) }}
            </p>

            <!-- Tech Indicators -->
            <div class="mt-6 flex items-center space-x-2">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
              </div>
              <span class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                {{ feature.tech }}
              </span>
            </div>

            <!-- Hover Effect Lines -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <button class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
          <span class="relative z-10">探索更多技術</span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <ArrowRight :size="20" class="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Zap, Eye, Headphones, Cpu, ArrowRight } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const features = [
  { 
    id: 'secure', 
    icon: Shield,
    tech: 'Blockchain Security'
  },
  { 
    id: 'fast', 
    icon: Zap,
    tech: 'AI Optimization'
  },
  { 
    id: 'transparent', 
    icon: Eye,
    tech: 'IoT Tracking'
  },
  { 
    id: 'support', 
    icon: Headphones,
    tech: 'AI Assistant'
  }
];
</script>

<style scoped>
.tech-grid {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  width: 100%;
  height: 100%;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}
</style>