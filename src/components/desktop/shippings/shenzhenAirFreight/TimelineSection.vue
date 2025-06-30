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
        <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
           {{ item.item }}
        </span>
        <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs[index] }">
          +
        </span>
      </button>
      <div v-if="index === 0">
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-gray-200 font-bold mt-2">{{ t(`shipping.routes.countries.menu3.subtitle1`) }}</h2>
            <h2 class="text-gray-200 font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text6`) }} 15:30 {{ t(`shipping.routes.countries.menu3.text2`) }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.shipping') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.arrival') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in dateItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.dateStr }}</td>
                  <td class="p-4 text-gray-400">{{ item.dateEnd }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-gray-200 font-bold mt-2">{{ t(`shipping.routes.countries.menu3.subtitle1`) }}</h2>
            <h2 class="text-gray-200 font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text6`) }} 15:30 {{ t(`shipping.routes.countries.menu3.text3`) }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.shipping') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu3.arrival') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in dateItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.dateStr }}</td>
                  <td class="p-4 text-gray-400">{{ item.dateEnd }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
          <p class="text-cyan-400 mt-2 font-bold">{{ t('shipping.routes.countries.menu3.subtitle2') }}</p>
          <p class="mt-2 text-gray-400">{{ t('shipping.routes.notice') }}</p>
          <ul class="mt-2 text-gray-400 flex flex-wrap gap-4">
            <li v-for="n in 6" :key="n" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13l2.293-2.293a1 1 0 01.707-.293H17a1 1 0 01.707.293L21 13m-18 0v6a2 2 0 002 2h14a2 2 0 002-2v-6m-18 0h18" />
                <circle cx="7.5" cy="19.5" r="1.5" />
                <circle cx="16.5" cy="19.5" r="1.5" />
              </svg>
              {{ t(`shipping.routes.countries.menu3.deliveryWay.row${n}`) }}
            </li>
          </ul>
          <p class="mt-2 text-cyan-400 font-bold">{{ t('shipping.routes.countries.menu3.subtitle3') }}</p>
          <p class="mt-2 text-cyan-400 font-bold">{{ t('shipping.routes.countries.menu3.subtitle4') }}</p>
        </div>
      </div>
      <div v-if="index === 1">
        <div v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-gray-200 font-bold mt-2">{{ t(`shipping.routes.countries.menu3.text4`) }}</h2>
          </div>
          <p class="mt-2 text-gray-400">{{ t(`shipping.routes.countries.menu3.text5`) }}</p>
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
      t('shipping.routes.countries.menu3.content1.row1'),
      t('shipping.routes.countries.menu3.content1.row2'),
      t('shipping.routes.countries.menu3.content1.row3'),
      t('shipping.routes.countries.menu3.content1.row4'),
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
    dateStr: t('shipping.routes.countries.menu3.monday'),
    dateEnd: t('shipping.routes.countries.menu3.wednesday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.tuesday'),
    dateEnd: t('shipping.routes.countries.menu3.thursday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.wednesday'),
    dateEnd: t('shipping.routes.countries.menu3.friday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.thursday'),
    dateEnd: t('shipping.routes.countries.menu3.saturday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.friday'),
    dateEnd: t('shipping.routes.countries.menu3.monday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.saturday'),
    dateEnd: t('shipping.routes.countries.menu3.monday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.sunday'),
    dateEnd: t('shipping.routes.countries.menu3.tuesday')
  }
])

const dateItems2 = ref([
  {
    dateStr: t('shipping.routes.countries.menu3.monday'),
    dateEnd: t('shipping.routes.countries.menu3.thursday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.tuesday'),
    dateEnd: t('shipping.routes.countries.menu3.friday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.wednesday'),
    dateEnd: t('shipping.routes.countries.menu3.saturday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.thursday'),
    dateEnd: t('shipping.routes.countries.menu3.sunday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.friday'),
    dateEnd: t('shipping.routes.countries.menu3.monday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.saturday'),
    dateEnd: t('shipping.routes.countries.menu3.tuesday')
  },
  {
    dateStr: t('shipping.routes.countries.menu3.sunday'),
    dateEnd: t('shipping.routes.countries.menu3.wednesday')
  }
])

const openFaqs = ref(Array(items.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

</script>