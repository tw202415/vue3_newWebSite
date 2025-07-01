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
          {{ index + 1 }}.{{ item.question }}
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
      t('shipping.routes.countries.menu4.content.row14') + '<img alt="圖：淘寶查詢運單號碼範例圖" src="https://www.elf.com.tw/image/subpage-QA/SH-05-1.png">',
      t('shipping.routes.countries.menu4.content.row15') + '<img alt="圖：阿里巴巴查詢運單號碼範例圖" src="https://www.elf.com.tw/image/subpage-QA/SH-05-2.png">',
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title6'),
    answer: [
      t('shipping.routes.countries.menu4.content.row16'),
      t('shipping.routes.countries.menu4.content.row17'),
      t('shipping.routes.countries.menu4.content.row18'),
      t('shipping.routes.countries.menu4.content.row19'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title7'),
    answer: [
      t('shipping.routes.countries.menu4.content.row20'),
      t('shipping.routes.countries.menu4.content.row21'),
      t('shipping.routes.countries.menu4.content.row22'),
      t('shipping.routes.countries.menu4.content.row23'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title8'),
    answer: [
      t('shipping.routes.countries.menu4.content.row24'),
      t('shipping.routes.countries.menu4.content.row25'),
      t('shipping.routes.countries.menu4.content.row26'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title9'),
    answer: [
      t('shipping.routes.countries.menu4.content.row27'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title10'),
    answer: [
      t('shipping.routes.countries.menu4.content.row28'),
      t('shipping.routes.countries.menu4.content.row29'),
      t('shipping.routes.countries.menu4.content.row30'),
      t('shipping.routes.countries.menu4.content.row31'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title11'),
    answer: [
      t('shipping.routes.countries.menu4.content.row32'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title12'),
    answer: [
      t('shipping.routes.countries.menu4.content.row33'),
      t('shipping.routes.countries.menu4.content.row34'),
      t('shipping.routes.countries.menu4.content.row35'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title13'),
    answer: [
      t('shipping.routes.countries.menu4.content.row36'),
      t('shipping.routes.countries.menu4.content.row37'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title14'),
    answer: [
      t('shipping.routes.countries.menu4.content.row38'),
      t('shipping.routes.countries.menu4.content.row39'),
      t('shipping.routes.countries.menu4.content.row40'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title15'),
    answer: [
      t('shipping.routes.countries.menu4.content.row41'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title16'),
    answer: [
      t('shipping.routes.countries.menu4.content.row42'),
      t('shipping.routes.countries.menu4.content.row43'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title17'),
    answer: [
      t('shipping.routes.countries.menu4.content.row44'),
      t('shipping.routes.countries.menu4.content.row45'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title18'),
    answer: [
      t('shipping.routes.countries.menu4.content.row46'),
      t('shipping.routes.countries.menu4.content.row47'),
      t('shipping.routes.countries.menu4.content.row48'),
      t('shipping.routes.countries.menu4.content.row49'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title19'),
    answer: [
      t('shipping.routes.countries.menu4.content.row50'),
      t('shipping.routes.countries.menu4.content.row51'),
      t('shipping.routes.countries.menu4.content.row52'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title20'),
    answer: [
      t('shipping.routes.countries.menu4.content.row53'),
      t('shipping.routes.countries.menu4.content.row54'),
      t('shipping.routes.countries.menu4.content.row55'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title21'),
    answer: [
      t('shipping.routes.countries.menu4.content.row56'),
      t('shipping.routes.countries.menu4.content.row57'),
      t('shipping.routes.countries.menu4.content.row58'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title22'),
    answer: [
      t('shipping.routes.countries.menu4.content.row59'),
      t('shipping.routes.countries.menu4.content.row60'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title23'),
    answer: [
      t('shipping.routes.countries.menu4.content.row61'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title24'),
    answer: [
      t('shipping.routes.countries.menu4.content.row62'),
      t('shipping.routes.countries.menu4.content.row63'),
      t('shipping.routes.countries.menu4.content.row64'),
      t('shipping.routes.countries.menu4.content.row65'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title25'),
    answer: [
      t('shipping.routes.countries.menu4.content.row66'),
      t('shipping.routes.countries.menu4.content.row67'),
      t('shipping.routes.countries.menu4.content.row68'),
      t('shipping.routes.countries.menu4.content.row69'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title26'),
    answer: [
      t('shipping.routes.countries.menu4.content.row70'),
      t('shipping.routes.countries.menu4.content.row71'),
      t('shipping.routes.countries.menu4.content.row72'),
      t('shipping.routes.countries.menu4.content.row73'),
      t('shipping.routes.countries.menu4.content.row74'),
      t('shipping.routes.countries.menu4.content.row75'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title27'),
    answer: [
      t('shipping.routes.countries.menu4.content.row76'),
      t('shipping.routes.countries.menu4.content.row77'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title28'),
    answer: [
      t('shipping.routes.countries.menu4.content.row78'),
      t('shipping.routes.countries.menu4.content.row79'),
      t('shipping.routes.countries.menu4.content.row80'),
      t('shipping.routes.countries.menu4.content.row81'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title29'),
    answer: [
      t('shipping.routes.countries.menu4.content.row82'),
      t('shipping.routes.countries.menu4.content.row83'),
      t('shipping.routes.countries.menu4.content.row84'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title30'),
    answer: [
      t('shipping.routes.countries.menu4.content.row85'),
    ]
  },
  {
    question: t('shipping.routes.countries.menu4.title31'),
    answer: [
      t('shipping.routes.countries.menu4.content.row86'),
    ]
  },

])
 
const openFaqs = ref(Array(faqItems.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>