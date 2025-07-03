<template>
  <div class="space-y-4">
    <div 
      v-for="(item, index) in processItems"
      :key="index"
      class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
    >
      <button 
        @click="toggleFaq(index)"
        class="w-full px-6 py-4 text-left flex justify-between items-center group"
      >
        <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
           {{ item.item }}
        </span>
        <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs[index] }">
          +
        </span>
      </button>
      <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            <span v-if="index != 2">{{ idx + 1 }}.</span><span v-html="i"></span>

        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const processItems = computed(() => [
  {
    item: t('shipping.routes.countries.menu1.item14'),
    content: [
        t('shipping.routes.countries.menu1.content12.row1'),
        t('shipping.routes.countries.menu1.content12.row2'),
        t('shipping.routes.countries.menu1.content12.row3'),
        t('shipping.routes.countries.menu1.content12.row4'),
        t('shipping.routes.countries.menu1.content12.row5'),
        t('shipping.routes.countries.menu1.content12.row6'),
        t('shipping.routes.countries.menu1.content12.row7'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu1.item12'),
    content: [
        t('shipping.routes.countries.menu1.content11.row1'),
        t('shipping.routes.countries.menu1.content11.row2'),
        t('shipping.routes.countries.menu1.content11.row3'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu1.item13'),
    content: [
        '<img alt="圖：無法辨認的快遞單範例" src="https://www.elf.com.tw/image/restriction01.png">',
    ]
  },
  {
    item: t('shipping.routes.countries.menu1.item3'),
    content: [
        t('shipping.routes.countries.menu1.content3.row1'),
        t('shipping.routes.countries.menu1.content3.row2'),
        t('shipping.routes.countries.menu1.content3.row3'),
        t('shipping.routes.countries.menu1.content3.row4'),
        t('shipping.routes.countries.menu1.content3.row5'),
    ]
  }
])

const openFaqs = ref(Array(processItems.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>