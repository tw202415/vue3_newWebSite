<template>
  <div class="space-y-4">
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
        <p v-for="(i, idx) in item.answer" class="text-gray-400 mt-2 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-1 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
          <span v-html="i"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const faqItems = computed(() => [
  {
    question: t('shipping.routes.countries.menu4.title1'),
    answer: [
      t('shipping.routes.countries.menu4.content.row1'),
      t('shipping.routes.countries.menu4.content.row2'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title2'),
    answer: [
      t('shipping.routes.countries.menu4.content.row3'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title3'),
    answer: [
      t('shipping.routes.countries.menu4.content.row4'),
      t('shipping.routes.countries.menu4.content.row5'),
      t('shipping.routes.countries.menu4.content.row6'),
      t('shipping.routes.countries.menu4.content.row7'),
      t('shipping.routes.countries.menu4.content.row8'),
      t('shipping.routes.countries.menu4.content.row9'),
      t('shipping.routes.countries.menu4.content.row10'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title4'),
    answer: [
      t('shipping.routes.countries.menu4.content.row11'),
      t('shipping.routes.countries.menu4.content.row12'),
      t('shipping.routes.countries.menu4.content.row13') + '<img alt="圖：無法辨認的快遞單範例" src="https://www.elf.com.tw/image/subpage-QA/SH-04.jpg">',
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title5'),
    answer: [
      t('shipping.routes.countries.menu4.content.row14'),
      t('shipping.routes.countries.menu4.content.row15'),
    ]
  }
])

const openFaqs = ref(Array(faqItems.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>