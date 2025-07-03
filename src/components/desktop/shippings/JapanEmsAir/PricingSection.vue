<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title7') }}</h2>
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

        <!-- 空運運費表 (日幣計費) -->             
        <div v-if="index === 0" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-cyan-400 font-bold mt-2">{{ t('shipping.routes.countries.menu2.item19') }}{{ t('shipping.routes.countries.menu2.subtitle7') }}</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}/KG</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.jpyFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.weight }}</td>
                  <td class="p-4 text-gray-400">{{ item.jpyFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>
      </div>
    </div>

    <!-- 付款方式 -->
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title8') }}</h2>
    <div class="space-y-4">
      <div 
        v-for="(item, index) in items2"
        :key="index"
        class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
      >
        <button 
          @click="toggleFaq2(index)"
          class="w-full px-6 py-4 text-left flex justify-between items-center group"
        >
          <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
            {{ item.item }}
          </span>
          <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs2[index] }">
            +
          </span>
        </button>  
        <div v-show="openFaqs2[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>  
        </div>             
      </div>
    </div>
    
    <!-- 附加服務 -->
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title3') }}</h2>
    <div class="space-y-4">
      <div 
        v-for="(item, index) in items3"
        :key="index"
        class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
      >
        <button 
          @click="toggleFaq3(index)"
          class="w-full px-6 py-4 text-left flex justify-between items-center group"
        >
          <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
            {{ item.item }}
          </span>
          <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs3[index] }">
            +
          </span>
        </button>                 
        <div v-if="index === 0" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.explain') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.packagingFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems2"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.currency }}</td>
                  <td class="p-4 text-gray-400">{{ item.explain }}</td>
                  <td class="p-4 text-gray-400">{{ item.packagingFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-gray-300"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent16') }}{{ t('shipping.routes.countries.menu2.webRate') }}{{  t('shipping.routes.countries.menu2.payType1') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            <span>{{ idx + 1 }}.{{ i }}</span>
          </p>
        </div>

        <div v-if="index === 1" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.packingFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems3"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.currency }}</td>
                  <td class="p-4 text-gray-400">{{ item.weight }}</td>
                  <td class="p-4 text-gray-400">{{ item.packingFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-gray-300"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent17') }}{{ t('shipping.routes.countries.menu2.webRate') }}{{  t('shipping.routes.countries.menu2.payType1') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>
        
        <div v-if="index === 2" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.type') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.maxLength') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.maxVolume') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.size') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.boxWeight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.boxUnit') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems4"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.type }}</td>
                  <td class="p-4 text-gray-400">{{ item.maxLength }}</td>
                  <td class="p-4 text-gray-400">{{ item.maxVolume }}</td>
                  <td class="p-4 text-gray-400">{{ item.size }}</td>
                  <td class="p-4 text-gray-400">{{ item.boxWeight }}</td>
                  <td class="p-4 text-gray-400">{{ item.boxUnit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-gray-300"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent18') }}{{ t('shipping.routes.countries.menu2.webRate') }}{{  t('shipping.routes.countries.menu2.payType1') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>

        <div v-if="index === 3" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.time') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.storeFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems5"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300">{{ item.currency }}</td>
                  <td class="p-4 text-gray-400">{{ item.time }}</td>
                  <td class="p-4 text-gray-400">{{ item.storeFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-gray-300"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent14') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
          </p>
        </div>
      </div>
    </div>  

    <!-- 應付費用 -->
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title9') }}</h2>
    <div class="space-y-4">
      <div 
        v-for="(item, index) in items4"
        :key="index"
        class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
      >
        <button 
          @click="toggleFaq4(index)"
          class="w-full px-6 py-4 text-left flex justify-between items-center group"
        >
          <span class="font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
            {{ item.item }}
          </span>
          <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs3[index] }">
            +
          </span>
        </button>                 
        <div v-if="index === 0" v-show="openFaqs4[index]" class="p-6 pt-0 border-t border-cyan-500/20">
            <h2 class="text-cyan-400 font-bold mt-2">{{ t('shipping.routes.countries.menu2.subtitle6') }}</h2>
        </div>

      </div>
    </div>   

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()


// 空運運費表(日幣計費)
const items = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item19'),
    content: [
        t('shipping.routes.countries.menu2.content23.row1'),
        t('shipping.routes.countries.menu2.content23.row2'),
        t('shipping.routes.countries.menu2.content23.row3'),
    ]
  },
])

// 付款方式
const items2 = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item7'),
    content: [
        t('shipping.routes.countries.menu2.content24.row1'),
        t('shipping.routes.countries.menu2.content24.row2'),
        t('shipping.routes.countries.menu2.content24.row3'),
    ]
  },
])

// 附加服務
const items3 = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item20'),
    content: [
        t('shipping.routes.countries.menu2.content25.row1'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item21'),
    content: [
        t('shipping.routes.countries.menu2.content26.row1'),
        t('shipping.routes.countries.menu2.content26.row2'),
        t('shipping.routes.countries.menu2.content26.row3'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item22'),
    content: [
        t('shipping.routes.countries.menu2.content27.row1'),
        t('shipping.routes.countries.menu2.content27.row2'),
        t('shipping.routes.countries.menu2.content27.row3'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item14'),
    content: [
        t('shipping.routes.countries.menu2.content28.row1'),
        t('shipping.routes.countries.menu2.content28.row2'),
    ]
  },
])

// 應付費用
const items4 = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item23'),
    content: [
    ]
  },
])

const openFaqs = ref(Array(items.value.length).fill(false))
const openFaqs2 = ref(Array(items2.value.length).fill(false))
const openFaqs3 = ref(Array(items3.value.length).fill(false))
const openFaqs4 = ref(Array(items4.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
const toggleFaq2 = (index) => {
  openFaqs2.value[index] = !openFaqs2.value[index]
}
const toggleFaq3 = (index) => {
  openFaqs3.value[index] = !openFaqs3.value[index]
}
const toggleFaq4 = (index) => {
  openFaqs4.value[index] = !openFaqs4.value[index]
}

// 日本官方EMS空運運費表
const pricingItems = computed(() => [
  { weight: '0.5', jpyFee: '1450' },
  { weight: '0.6', jpyFee: '1600' },
  { weight: '0.7', jpyFee: '1750' },
  { weight: '0.8', jpyFee: '1900' },
  { weight: '0.9', jpyFee: '2050' },
  { weight: '1', jpyFee: '2200' },
  { weight: '1.25', jpyFee: '2500' },
  { weight: '1.5', jpyFee: '2800' },
  { weight: '1.75', jpyFee: '3100' },
  { weight: '2', jpyFee: '3400' },
  { weight: '2.5', jpyFee: '3900' },
  { weight: '3', jpyFee: '4400' },
  { weight: '3.5', jpyFee: '4900' },
  { weight: '4', jpyFee: '5400' },
  { weight: '4.5', jpyFee: '5900' },
  { weight: '5', jpyFee: '6400' },
  { weight: '5.5', jpyFee: '6900' },
  { weight: '6', jpyFee: '7400' },
  { weight: '7', jpyFee: '8200' },
  { weight: '8', jpyFee: '9000' },
  { weight: '9', jpyFee: '9800' },
  { weight: '10', jpyFee: '10600' },
  { weight: '11', jpyFee: '11400' },
  { weight: '12', jpyFee: '12200' },
  { weight: '13', jpyFee: '13000' },
  { weight: '14', jpyFee: '13800' },
  { weight: '15', jpyFee: '14600' },
  { weight: '16', jpyFee: '15400' },
  { weight: '17', jpyFee: '16200' },
  { weight: '18', jpyFee: '17000' },
  { weight: '19', jpyFee: '17800' },
  { weight: '20', jpyFee: '18600' },
  { weight: '21', jpyFee: '19400' },
  { weight: '22', jpyFee: '20200' },
  { weight: '23', jpyFee: '21000' },
  { weight: '24', jpyFee: '21800' },
  { weight: '25', jpyFee: '22600' },
  { weight: '26', jpyFee: '23400' },
  { weight: '27', jpyFee: '24200' },
  { weight: '28', jpyFee: '25000' },
  { weight: '29', jpyFee: '25800' },
  { weight: '30', jpyFee: '26600' },
])

// 代收包裹
const pricingItems2 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.jpyCharge2'),
    explain: t('shipping.routes.countries.menu2.handlingFee'),
    packagingFee: t('shipping.routes.countries.menu2.every100JPY'),
  },
])

// 合併包裹
const pricingItems3 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.jpyCharge2'),
    weight: t('shipping.routes.countries.menu2.mergePackage'),
    packingFee: t('shipping.routes.countries.menu2.every100JPY'),
  },
])

// 專用紙箱
const pricingItems4 = computed(() => [
  { type: '1' + t('shipping.routes.countries.menu2.boxNo'),
    maxLength: 60.5,
    maxVolume: 30,
    size: '60.5*47.5*58.5',
    boxWeight: 1.62,
    boxUnit: 508,
  },
  { type: '2' + t('shipping.routes.countries.menu2.boxNo'),
    maxLength: 60.5,
    maxVolume: 25,
    size: '60.5*47.5*49.0',
    boxWeight: 1.47,
    boxUnit: 485,
  },
  { type: '3' + t('shipping.routes.countries.menu2.boxNo'),
    maxLength: 57.0,
    maxVolume: 20,
    size: '57.0*43.5*45.0	',
    boxWeight: 1.27,
    boxUnit: 450,
  },
  { type: '4' + t('shipping.routes.countries.menu2.boxNo'),
    maxLength: 52.5,
    maxVolume: 15,
    size: '52.5*40.5*39.0',
    boxWeight: 1.05,
    boxUnit: 405,
  },
  { type: '5' + t('shipping.routes.countries.menu2.boxNo'),
    maxLength: 48.0,
    maxVolume: 10,
    size: t('shipping.routes.countries.menu2.randomSize'),
    boxWeight: 0.84,
    boxUnit: 360,
  },
])

// 存倉時間
const pricingItems5 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.jpyCharge2'),
    time: t('shipping.routes.countries.menu2.free20'),
    storeFee: t('shipping.routes.countries.menu2.free'),
  },
  {
    currency: '',
    time: t('shipping.routes.countries.menu2.over20'),
    storeFee: '50JPY',
  }
])
</script>