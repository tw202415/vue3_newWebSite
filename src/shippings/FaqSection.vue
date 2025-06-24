<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold text-cyan-400 mb-6">{{ t('shipping.faq.title') }}</h2>
    
    <div 
      v-for="(item, index) in faqItems"
      :key="index"
      class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
    >
      <button 
        @click="toggleFaq(index)"
        class="w-full px-6 py-4 text-left flex justify-between items-center group"
      >
        <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
          {{ item.question }}
        </span>
        <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs[index] }">
          +
        </span>
      </button>
      <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <p class="text-gray-400">{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const faqItems = ref([
  {
    question: t('shipping.faq.q1'),
    answer: t('shipping.faq.a1')
  },
  {
    question: t('shipping.faq.q2'),
    answer: t('shipping.faq.a2')
  },
  {
    question: t('shipping.faq.q3'),
    answer: t('shipping.faq.a3')
  }
])

const openFaqs = ref(Array(faqItems.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>