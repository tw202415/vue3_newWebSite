<template>
  <div class="space-y-4">
    <div 
      v-for="(item, index) in processItems"
      :key="index"
      class="bg-gray-800/50 rounded-lg shadow-lg shadow-cyan-500/10 overflow-hidden"
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
      <div v-show="openFaqs[index]" class="p-6 pt-0">
        <p class="mt-2 text-white" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
        <a class="text-cyan-500 hover:text-cyan-300 underline transition-colors duration-200" href="https://portal.sw.nat.gov.tw/APGQ/LoginFree?request_locale=zh_TW&breadCrumbs=JTdCJTIyYnJlYWRDcnVtYnMlMjIlM0ElNUIlN0IlMjJuYW1lJTIyJTNBJTIyJUU1JTg1JThEJUU4JUFEJTg5JUU2JTlGJUE1JUU4JUE5JUEyJUU2JTlDJThEJUU1JThCJTk5JTIyJTJDJTIydXJsJTIyJTNBJTIyJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMiVFNyVBOCU4NSVFNSU4OSU4NyVFNyVBOCU4NSVFNyU4RSU4NyVFNiU5RiVBNSVFOCVBOSVBMiUyMiUyQyUyMnVybCUyMiUzQSUyMmNoYW5nZU1lbnVVcmwyKCclRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTYlOUYlQTUlRTglQTklQTInJTJDJ0FQR1FfNycpJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMihHQzQxMyklRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTYlQjglODUlRTglQTElQTglRTMlODAlODFFQ0ZBJUU2JTk3JUE5JUU2JTk0JUI2JUU2JUI4JTg1JUU1JTk2JUFFJUU1JThGJThBJUU2JUFEJUI3JUU2JUFDJUExJUU3JUE4JTg1JUU1JTg5JTg3JUU0JUJGJUFFJUU2JUFEJUEzJUU4JUIzJTg3JUU2JTk2JTk5JTIyJTJDJTIydXJsJTIyJTNBJTIyb3Blbk1lbnUoJyUyRkFQR1ElMkZHQzQxMycpJTIyJTdE" v-if="index === 1">{{ t(`shipping.routes.countries.menu1.content2.row7`) }}</a>
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
    item: t('shipping.routes.countries.menu1.item8'),
    content: [
        t('shipping.routes.countries.menu1.content1.row1'),
        t('shipping.routes.countries.menu1.content1.row2'),
        t('shipping.routes.countries.menu1.content1.row3'),
        t('shipping.routes.countries.menu1.content1.row4'),
        t('shipping.routes.countries.menu1.content1.row5'),
        t('shipping.routes.countries.menu1.content1.row6'),
        t('shipping.routes.countries.menu1.content1.row7'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu1.item9'),
    content: [
        t('shipping.routes.countries.menu1.content7.row1'),
        t('shipping.routes.countries.menu1.content7.row2'),
        t('shipping.routes.countries.menu1.content7.row3'),
        t('shipping.routes.countries.menu1.content7.row4'),
        t('shipping.routes.countries.menu1.content7.row5'),
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