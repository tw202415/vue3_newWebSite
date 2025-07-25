<template>
  <div class="space-y-6">
      <div class="space-y-4">
    <div 
      v-for="(item, index) in items"
      :key="index"
      class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
    >
      <button 
        @click="toggleFaq(index)"
        class="w-full px-6 py-4 text-left flex justify-between items-center group"
      >
        <span class="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
           {{ item.item }}
        </span>
        <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs[index] }">
          +
        </span>
      </button>
      <div v-if="index === 0">
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-white font-bold mt-2">{{ t(`shipping.routes.countries.menu3.subtitle1`) }}</h2>
            <h2 class="text-white font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text7`) }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.sunday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.monday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.tuesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.wednesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.thursday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.friday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.saturday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.sunday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.monday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.tuesday') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in dateItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.declaraction }}</td>
                  <td class="p-4 text-white">{{ item.depature }}</td>
                  <td class="p-4 text-white">{{ item.arrivalPort }}</td>
                  <td class="p-4 text-white">{{ item.clearance }}</td>
                  <td class="p-4 text-white">{{ item.awaiting }}</td>
                  <td class="p-4 text-white">{{ item.awaiting }}</td>
                  <td class="p-4 text-white">{{ item.provider }}</td>
                  <td class="p-4 text-white">{{ item.delivered }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-white font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text8`) }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.tuesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.wednesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.thursday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.friday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.saturday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.sunday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.monday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.tuesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.wednesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.thursday') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in dateItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.declaraction }}</td>
                  <td class="p-4 text-white">{{ item.depature }}</td>
                  <td class="p-4 text-white">{{ item.transit }}</td>
                  <td class="p-4 text-white">{{ item.arrivalPort }}</td>
                  <td class="p-4 text-white">{{ item.clearance }}</td>
                  <td class="p-4 text-white">{{ item.provider }}</td>
                  <td class="p-4 text-white">{{ item.delivered }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-white font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text8`) }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.friday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.saturday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.sunday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.monday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.tuesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.wednesday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.thursday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.friday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.saturday') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.sunday') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in dateItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.shipping }}</td>
                  <td class="p-4 text-white">{{ item.declaraction }}</td>
                  <td class="p-4 text-white">{{ item.depature }}</td>
                  <td class="p-4 text-white">{{ item.arrivalPort }}</td>
                  <td class="p-4 text-white">{{ item.clearance }}</td>
                  <td class="p-4 text-white">{{ item.provider }}</td>
                  <td class="p-4 text-white">{{ item.delivered }}</td>
                  <td class="p-4 text-white">{{ item.delivered }}</td>
                  <td class="p-4 text-white">{{ item.awaiting }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
          <p class="text-cyan-400 mt-2 font-bold">{{ t('shipping.routes.countries.menu3.subtitle2') }}</p>
          <p class="mt-2 text-white font-bold">{{ t('shipping.routes.countries.menu3.subtitle6') }}</p>
          <ul class="mt-2 text-white flex flex-wrap gap-4">
            <li v-for="n in 6" :key="n" class="flex items-center gap-2">
              <template v-if="n !== 4 && n !== 6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13l2.293-2.293a1 1 0 01.707-.293H17a1 1 0 01.707.293L21 13m-18 0v6a2 2 0 002 2h14a2 2 0 002-2v-6m-18 0h18" />
                  <circle cx="7.5" cy="19.5" r="1.5" />
                  <circle cx="16.5" cy="19.5" r="1.5" />
                </svg>
                {{ t(`shipping.routes.countries.menu3.deliveryWay.row${n}`) }}
              </template> 
            </li>
          </ul>
          <p class="mt-2 text-cyan-400 font-bold">{{ t('shipping.routes.countries.menu3.subtitle3') }}</p>
          <p class="mt-2 text-cyan-400 font-bold">{{ t('shipping.routes.countries.menu3.subtitle4') }}</p>
        </div>
      </div>
      <div v-if="index === 1">
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-white font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text4`) }}</h2>
          </div>
          <p class="mt-2 text-white">{{ t(`shipping.routes.countries.menu3.text5`) }}</p>
        </div>
      </div>
    </div>
  </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
onMounted(() => {
})

const items = computed(() => [
  {
    item: t('shipping.routes.countries.menu3.item1'),
    content: [
      t('shipping.routes.countries.menu3.content2.row1'),
      t('shipping.routes.countries.menu3.content2.row2'),
      t('shipping.routes.countries.menu3.content2.row3'),
      t('shipping.routes.countries.menu3.content2.row4'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu3.item3'),
    content: [
        
    ]
  }
])

const dateItems = ref([
  {
    shipping: t('shipping.routes.countries.menu3.shipping'),
    declaraction: t('shipping.routes.countries.menu3.declaraction'),
    depature: t('shipping.routes.countries.menu3.depature'),
    arrivalPort: t('shipping.routes.countries.menu3.arrivalPort'),
    clearance: t('shipping.routes.countries.menu3.clearance'),
    awaiting: t('shipping.routes.countries.menu3.awaiting'),
    provider: t('shipping.routes.countries.menu3.provider'),
    delivered: t('shipping.routes.countries.menu3.delivered'),
    transit: t('shipping.routes.countries.menu3.transit'),
  },
])

const openFaqs = ref(Array(items.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

</script>