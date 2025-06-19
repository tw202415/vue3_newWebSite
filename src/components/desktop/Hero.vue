<template>
  <section id="home" class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <!-- Gradient Mesh -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
      
      <!-- Floating Particles -->
      <div class="absolute inset-0">
        <div
          v-for="i in 50"
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
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <!-- Content -->
        <div class="animate-fade-in-up">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
            <Zap :size="16" class="text-blue-400 mr-2" />
            <span class="text-blue-300 text-sm font-medium">AI驅動的智能集運</span>
          </div>

          <h1 class="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {{ t('hero.title') }}
            </span>
          </h1>
          
          <p class="text-xl text-blue-300 font-semibold mb-4 animate-glow">
            {{ t('hero.subtitle') }}
          </p>
          
          <p class="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
            {{ t('hero.description') }}
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="text-center">
              <div class="text-2xl font-bold text-white mb-1">99.9%</div>
              <div class="text-sm text-gray-400">準時送達率</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white mb-1">24H</div>
              <div class="text-sm text-gray-400">極速處理</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white mb-1">50+</div>
              <div class="text-sm text-gray-400">服務國家</div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span class="relative z-10">{{ t('hero.cta.primary') }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button class="group relative px-8 py-4 border-2 border-blue-500/50 text-blue-300 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-blue-500/20">
              {{ t('hero.cta.secondary') }}
            </button>
          </div>
        </div>

        <!-- 3D Illustration -->
        <div class="relative animate-fade-in-right">
          <!-- Main Container -->
          <div class="relative">
            <!-- Holographic Display -->
            <div class="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-2xl">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div class="text-blue-300 text-sm">AI Dashboard</div>
              </div>

              <!-- 3D Truck Animation -->
              <div class="relative h-64 flex items-center justify-center mb-6">
                <div class="relative transform-gpu animate-float-3d">
                  <Truck :size="120" class="text-blue-400 drop-shadow-2xl" />
                  <!-- Glow Effect -->
                  <div class="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-150"></div>
                </div>
                
                <!-- Floating Elements -->
                <div class="absolute top-4 left-4 bg-green-400/20 text-green-300 px-3 py-1 rounded-lg text-sm font-medium animate-pulse">
                  即時追蹤
                </div>
                <div class="absolute bottom-4 right-4 bg-purple-400/20 text-purple-300 px-3 py-1 rounded-lg text-sm font-medium animate-pulse" style="animation-delay: 0.5s;">
                  AI優化
                </div>
                <div class="absolute top-1/2 right-0 bg-blue-400/20 text-blue-300 px-3 py-1 rounded-lg text-sm font-medium animate-pulse" style="animation-delay: 1s;">
                  區塊鏈驗證
                </div>
              </div>

              <!-- Progress Bars -->
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm text-gray-300 mb-2">
                    <span>運送進度</span>
                    <span>87%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-progress" style="width: 87%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm text-gray-300 mb-2">
                    <span>AI處理效率</span>
                    <span>95%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-progress" style="width: 95%; animation-delay: 0.5s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Cards -->
            <div class="absolute -top-6 -right-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30 animate-float" style="animation-delay: 1s;">
              <div class="flex items-center space-x-2">
                <Shield :size="20" class="text-green-400" />
                <span class="text-green-300 text-sm font-medium">區塊鏈安全</span>
              </div>
            </div>

            <div class="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 animate-float" style="animation-delay: 2s;">
              <div class="flex items-center space-x-2">
                <Cpu :size="20" class="text-purple-400" />
                <span class="text-purple-300 text-sm font-medium">AI智能</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown :size="24" class="text-white/60" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Truck, Zap, Shield, Cpu, ChevronDown } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-3d {
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-10px) rotateY(10deg); }
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

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
}

@keyframes progress {
  from { width: 0%; }
  to { width: var(--progress-width, 100%); }
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

.animate-fade-in-right {
  animation: fade-in-right 0.8s ease-out forwards;
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
  background-size: 50px 50px;
  width: 100%;
  height: 100%;
}
</style>