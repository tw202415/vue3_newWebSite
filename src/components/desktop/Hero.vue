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
      <div class="items-center w-full">
        <!-- Content -->
        <div class="animate-fade-in-up">
          <!-- Badge -->
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div class="flex-1">
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
            </div>
            <!-- 公告 -->
            <div class="flex-shrink-0 w-full lg:w-96">
              <div class="bg-white/5 border border-white/10 rounded-lg p-6 text-gray-200">
                <Announcement />
              </div>
            </div>
          </div>



          <!-- REASON TO CHOOSE US -->
          <h1 class="text-6xl lg:text-6xl font-bold mb-6 leading-tight flex items-center justify-center">REASON TO CHOOSE US</h1>
          <div class="gap-6 mb-8 flex items-center justify-center">
          <ul class="rea-space flex gap-24 list-none p-0 m-0">
            <li class="rea-circel" v-for="(reason, index) in reasons" :key="index">
              <div class="text-center">
                <div class="text-sm text-gray-400">{{ reason.label }}</div>
                <div class="text-2xl font-bold text-white mb-1">{{ formatNumber(reason.value) }}</div>
                <div class="text-sm text-gray-400">{{ reason.unit }}</div>
              </div>
            </li>
          </ul>
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
import { ref, onMounted } from "vue";
import { getAboutUsReasons } from "@/apis/CMSAPI";
import Announcement from "@/components/News/Announcement.vue";

const { t } = useI18n();

const reasons = ref([])

const reasonMeta = [
  { label: "至今成立", unit: "年" },
  { label: "累積會員", unit: "人" },
  { label: "每天快遞", unit: "件" },
  { label: "到貨時間", unit: "天" },
  { label: "全球集貨站", unit: "個" }
]

// 加入格式化：有些值是字串（像 "3-5"）就不要加千分位
const formatNumber = (val) => {
  const num = Number(val)
  return isNaN(num) ? val : num.toLocaleString("en-US")
}

onMounted(async () => {
  try {
    const data = await getAboutUsReasons()
    console.log(data)
    const keys = ["reason1", "reason2", "reason3", "reason4", "reason5"]
    const values = keys.map(k => data[k] ?? 0)

    reasons.value = reasonMeta.map((meta, index) => ({
      ...meta,
      value: values[index]
    }))
    console.log(reasons)
  } catch (err) {
    console.error("取得 reason 資料失敗：", err.message)
  }
})







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