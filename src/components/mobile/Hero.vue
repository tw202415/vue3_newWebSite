<template>
  <section id="home" class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center pt-16">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <!-- Gradient Mesh -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
      
      <!-- Floating Particles -->
      <div class="absolute inset-0">
        <div
          v-for="i in 30"
          :key="i"
          class="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: (3 + Math.random() * 4) + 's'
          }"
        ></div>
      </div>

      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="grid-pattern"></div>
      </div>
    </div>

    <div class="relative px-4 sm:px-6 py-12 w-full">
      <div class="text-center animate-fade-in-up">
        <!-- Badge -->
        <div class="inline-flex items-center px-3 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
          <Zap :size="14" class="text-blue-400 mr-2" />
          <span class="text-blue-300 text-xs font-medium">AI驅動智能集運</span>
        </div>

        <!-- Mobile Holographic Display -->
        <div class="mb-8 animate-fade-in-scale">
          <div class="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 mx-auto max-w-sm border border-blue-500/20 shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div class="text-blue-300 text-xs">AI Dashboard</div>
            </div>

            <!-- 3D Truck Animation -->
            <div class="relative h-32 flex items-center justify-center mb-4">
              <div class="relative transform-gpu animate-float-3d">
                <Truck :size="80" class="text-blue-400 drop-shadow-2xl" />
                <!-- Glow Effect -->
                <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-150"></div>
              </div>
              
              <!-- Floating Elements -->
              <div class="absolute top-2 left-2 bg-green-400/20 text-green-300 px-2 py-1 rounded text-xs font-medium animate-pulse">
                即時
              </div>
              <div class="absolute bottom-2 right-2 bg-purple-400/20 text-purple-300 px-2 py-1 rounded text-xs font-medium animate-pulse" style="animation-delay: 0.5s;">
                AI
              </div>
            </div>

            <!-- Progress Bar -->
            <div>
              <div class="flex justify-between text-xs text-gray-300 mb-2">
                <span>運送進度</span>
                <span>87%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full animate-progress" style="width: 87%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {{ t('hero.title') }}
          </span>
        </h1>
        
        <p class="text-lg text-blue-300 font-semibold mb-3 animate-glow">
          {{ t('hero.subtitle') }}
        </p>
        
        <p class="text-gray-300 mb-8 px-4 leading-relaxed">
          {{ t('hero.description') }}
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
          <div class="text-center">
            <div class="text-xl font-bold text-white mb-1">99.9%</div>
            <div class="text-xs text-gray-400">準時率</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-bold text-white mb-1">24H</div>
            <div class="text-xs text-gray-400">極速</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-bold text-white mb-1">50+</div>
            <div class="text-xs text-gray-400">國家</div>
          </div>
        </div>
        
        <div class="space-y-3 px-4">
          <button class="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span class="relative z-10">{{ t('hero.cta.primary') }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button class="w-full border-2 border-blue-500/50 text-blue-300 hover:text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-blue-500/20">
            {{ t('hero.cta.secondary') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown :size="20" class="text-white/60" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Truck, Zap, ChevronDown } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
}

@keyframes float-3d {
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-8px) rotateY(10deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
  50% { text-shadow: 0 0 25px rgba(59, 130, 246, 0.8); }
}

@keyframes progress {
  from { width: 0%; }
  to { width: 87%; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-3d {
  animation: float-3d 4s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-scale {
  animation: fade-in-scale 0.8s ease-out forwards;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-progress {
  animation: progress 2s ease-out forwards;
}

.grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  width: 100%;
  height: 100%;
}
</style>