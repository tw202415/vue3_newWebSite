<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.timeline.title') }}</h2>
    
    <div class="relative">
      <div class="absolute left-4 h-full w-0.5 bg-cyan-400/30"></div>
      
      <div 
        v-for="(item, index) in timelineItems"
        :key="index"
        class="relative pl-12 pb-8"
      >
        <div class="absolute left-0 w-8 h-8 rounded-full bg-cyan-400/80 flex items-center justify-center">
          <span class="text-gray-900 font-bold">{{ index + 1 }}</span>
        </div>
        <div class="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <h3 class="text-lg font-bold text-gray-200 mb-2">{{ item.title }}</h3>
          <p class="text-gray-400">{{ item.description }}</p>
          <p class="text-cyan-400 mt-2">{{ item.duration }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const timelineItems = ref([
  {
    title: t('shipping.timeline.step1.title'),
    description: t('shipping.timeline.step1.description'),
    duration: t('shipping.timeline.step1.duration')
  },
  {
    title: t('shipping.timeline.step2.title'),
    description: t('shipping.timeline.step2.description'),
    duration: t('shipping.timeline.step2.duration')
  },
  {
    title: t('shipping.timeline.step3.title'),
    description: t('shipping.timeline.step3.description'),
    duration: t('shipping.timeline.step3.duration')
  }
])
</script>