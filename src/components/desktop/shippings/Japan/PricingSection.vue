<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title') }}</h2>
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
        <div v-if="index === 0" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-cyan-400 font-bold mt-2">{{ t('shipping.routes.countries.menu2.item7') }} :</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.weight }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="overflow-x-auto">
            <h2 class="text-cyan-400 font-bold mt-2">{{ t('shipping.routes.countries.menu2.item8') }} :</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems2"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.weight }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-white"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ exampleCalc(0, 0, 1, 'Coin') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>

        <div v-if="index === 1" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <h2 class="text-cyan-400 font-bold mt-2">{{ t(`shipping.routes.countries.menu2.subtitle5`) }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems3"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.weight }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems4"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.weight }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>

        <div v-if="index === 2" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <h2 class="text-cyan-400 font-bold mt-2">{{ t(`shipping.routes.countries.menu2.subtitle4`) }}</h2>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>
      </div>
    </div>

    <!-- 兩種付款方式 -->
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title2') }}</h2>
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
          <span class="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
            {{ item.item }}
          </span>
          <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs2[index] }">
            +
          </span>
        </button>  
        <div v-show="openFaqs2[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
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
          <span class="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
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
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.explain') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.packagingFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems5"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.explain }}</td>
                  <td class="p-4">{{ item.packagingFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-white"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent12') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
            <span>{{ idx + 1 }}.{{ i }}</span>
          </p>
        </div>

        <div v-if="index === 1" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice2') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              <span v-if="idx <= 3">{{ idx + 1 }}.{{ i }}</span>
          </p> 
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems6"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.weight }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              <span v-if="idx > 3">{{ idx - 3 }}.{{ i }}</span>
          </p>
        </div>
        
        <div v-if="index === 2" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.behalf') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems9"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.behalf }}</td>
                  <td class="p-4">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-white"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent13') }}{{ t('shipping.routes.countries.menu2.webRate') }}{{  t('shipping.routes.countries.menu2.payType1') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>

        <div v-if="index === 3" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.type') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.simple') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.formal') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems11"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.type }}</td>
                  <td class="p-4">60NTD</td>
                  <td class="p-4">300NTD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
            <p class="mt-2 text-white" v-for="(i, idx) in item.content">
                <div v-if="idx !== 4">{{ idx + 1 }}.{{ i }}</div>
                <div v-else>{{ idx + 1 }}.<a class="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200" href="https://portal.sw.nat.gov.tw/APGQ/LoginFree?request_locale=zh_TW&breadCrumbs=JTdCJTIyYnJlYWRDcnVtYnMlMjIlM0ElNUIlN0IlMjJuYW1lJTIyJTNBJTIyJUU1JTg1JThEJUU4JUFEJTg5JUU2JTlGJUE1JUU4JUE5JUEyJUU2JTlDJThEJUU1JThCJTk5JTIyJTJDJTIydXJsJTIyJTNBJTIyJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMiVFNyVBOCU4NSVFNSU4OSU4NyVFNyVBOCU4NSVFNyU4RSU4NyVFNiU5RiVBNSVFOCVBOSVBMiUyMiUyQyUyMnVybCUyMiUzQSUyMmNoYW5nZU1lbnVVcmwyKCclRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTYlOUYlQTUlRTglQTklQTInJTJDJ0FQR1FfNycpJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMihHQzQxMyklRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTYlQjglODUlRTglQTElQTglRTMlODAlODFFQ0ZBJUU2JTk3JUE5JUU2JTk0JUI2JUU2JUI4JTg1JUU1JTk2JUFFJUU1JThGJThBJUU2JUFEJUI3JUU2JUFDJUExJUU3JUE4JTg1JUU1JTg5JTg3JUU0JUJGJUFFJUU2JUFEJUEzJUU4JUIzJTg3JUU2JTk2JTk5JTIyJTJDJTIydXJsJTIyJTNBJTIyb3Blbk1lbnUoJyUyRkFQR1ElMkZHQzQxMycpJTIyJTdEJTJDJTdEJTJDJTdEJTVEJTJDJTIycGF0aFVybCUyMiUzQSUyMiUyM01FTlVfQVBHUSUyQyUyM01FTlVfQVBHUV83JTJDJTJGQVBHUSUyRkdDNDEzJTIyJTdE">{{ t(`shipping.routes.countries.menu1.content2.row7`) }}</a></div>
            </p>
        </div>

        <div v-if="index === 4" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.insurance') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">≤5,000</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">≤10,000</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">>15,000</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">>20,000</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">>25,000</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">>30,000</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems12"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.rate }}</td>
                  <td class="p-4">1.5%</td>
                  <td class="p-4">2%</td>
                  <td class="p-4">2.5%</td>
                  <td class="p-4">3%</td>
                  <td class="p-4">4%</td>
                  <td class="p-4">5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
        </div>

        <div v-if="index === 5" v-show="openFaqs3[index]" class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-white">
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.time') }}</th>
                  <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.storeFee') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in pricingItems13"
                  :key="index"
                  class="text-white border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4">{{ item.currency }}</td>
                  <td class="p-4">{{ item.time }}</td>
                  <td class="p-4">{{ item.storeFee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-swhite"> 
            {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent14') }}
          </p>
          <p class="text-cyan-400 mt-2">{{ t('shipping.routes.notice') }}</p>
          <p class="mt-2 text-white" v-for="(i, idx) in item.content">
              {{ idx + 1 }}.{{ i }}
          </p>
          
        </div>
        
      </div>
    </div>    
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title4') }}</h2>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { getCalculatorNotice,calculateShippingFee  } from '@/apis/CMSAPI'

const { t } = useI18n()
const feeResult = ref(null)
const feeResult2 = ref(null)
const feeResult3 = ref(null)
const feeResult4 = ref(null)
const feeResult5 = ref(null)

const fetchShippingFee = async () => {
  try {
    // 1kg
    const payload = {
      countryId: 2,
      actualWeight: "1",
      length: "1",
      width: "1",
      height: "1"
    }

    // 2kg
    const payload2 = {
      countryId: 2,
      actualWeight: "2",
      length: "1",
      width: "1",
      height: "1"
    }

    // 50kg
    const payload3 = {
      countryId: 2,
      actualWeight: "50",
      length: "1",
      width: "1",
      height: "1"
    }

    // 101kg
    const payload4 = {
      countryId: 2,
      actualWeight: "101",
      length: "1",
      width: "1",
      height: "1"
    }

    // 151kg
    const payload5 = {
      countryId: 2,
      actualWeight: "151",
      length: "1",
      width: "1",
      height: "1"
    }
    const res = await calculateShippingFee(payload)
    const res2 = await calculateShippingFee(payload2)
    const res3 = await calculateShippingFee(payload3)
    const res4 = await calculateShippingFee(payload4)
    const res5 = await calculateShippingFee(payload5)


    feeResult.value = res.data.data
    feeResult2.value = res2.data.data
    feeResult3.value = res3.data.data
    feeResult4.value = res4.data.data
    feeResult5.value = res5.data.data
    console.log('✅ 成功接收到 feeResult:', feeResult.value)
    console.log('✅ 成功接收到 feeResult:', feeResult2.value)
    console.log('✅ 成功接收到 feeResult:', feeResult3.value)
    console.log('✅ 成功接收到 feeResult:', feeResult4.value)
    console.log('✅ 成功接收到 feeResult:', feeResult5.value)
  } catch (error) {
    console.error('🔥 API 錯誤:', error)
  }
}

onMounted(() => {
  fetchShippingFee()
})

// 範例計算
function exampleCalc(warehouse, method, weight, feesByPayment) {
  let firstPrice = 0
  let secondPrice = 0
  firstPrice = feeResult.value?.warehouses?.[warehouse]?.methods?.[method]?.feesByPayment?.Coin?.cost
  secondPrice = feeResult2.value?.warehouses?.[warehouse]?.methods?.[method]?.feesByPayment?.Coin?.cost - firstPrice
  return t(`shipping.routes.countries.menu2.exampleContent11`) + `${firstPrice}+${secondPrice}+${secondPrice}+(5-3)*196=${firstPrice + secondPrice + secondPrice + (5-3)*196}` + t(`shipping.routes.countries.menu2.payType1`)
}

// 多種運費計價方案
const items = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item1'),
    content: [
        t('shipping.routes.countries.menu2.content18.row1'),
        t('shipping.routes.countries.menu2.content18.row2'),
        t('shipping.routes.countries.menu2.content18.row3'),
        t('shipping.routes.countries.menu2.content18.row4'),
        t('shipping.routes.countries.menu2.content18.row5'),
        t('shipping.routes.countries.menu2.content18.row6'),
        t('shipping.routes.countries.menu2.content18.row7')
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item3'),
    content: [
        t('shipping.routes.countries.menu2.content19.row1'),
        t('shipping.routes.countries.menu2.content19.row2'),
        t('shipping.routes.countries.menu2.content19.row3'),
        t('shipping.routes.countries.menu2.content19.row4'),
        t('shipping.routes.countries.menu2.content19.row5'),
        t('shipping.routes.countries.menu2.content19.row6'),
        t('shipping.routes.countries.menu2.content19.row7'),
        t('shipping.routes.countries.menu2.content19.row8')
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item4'),
    content: [
        t('shipping.routes.countries.menu2.content3.row1'),
        t('shipping.routes.countries.menu2.content3.row2'),
        t('shipping.routes.countries.menu2.content3.row3'),
        t('shipping.routes.countries.menu2.content3.row4'),
        t('shipping.routes.countries.menu2.content3.row5'),
    ]
  },
])

// 兩種付款方式
const items2 = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item7'),
    content: [
        t('shipping.routes.countries.menu2.content20.row1'),
        t('shipping.routes.countries.menu2.content20.row2'),
        t('shipping.routes.countries.menu2.content20.row3'),
        t('shipping.routes.countries.menu2.content20.row4'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item8'),
    content: [
        t('shipping.routes.countries.menu2.content7.row1'),
        t('shipping.routes.countries.menu2.content7.row2'),
        t('shipping.routes.countries.menu2.content7.row3'),
    ]
  },
])

// 附加服務
const items3 = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item16'),
    content: [
        t('shipping.routes.countries.menu2.content21.row1'),
        t('shipping.routes.countries.menu2.content21.row2'),
        t('shipping.routes.countries.menu2.content21.row3'),
        t('shipping.routes.countries.menu2.content21.row4'),
        t('shipping.routes.countries.menu2.content21.row5'),
        t('shipping.routes.countries.menu2.content21.row6'),
        t('shipping.routes.countries.menu2.content21.row7'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item17'),
    content: [
        t('shipping.routes.countries.menu2.content22.row1'),
        t('shipping.routes.countries.menu2.content22.row2'),
        t('shipping.routes.countries.menu2.content22.row3'),
        t('shipping.routes.countries.menu2.content22.row4'),
        t('shipping.routes.countries.menu2.content9.row1'),
        t('shipping.routes.countries.menu2.content9.row2'),
        t('shipping.routes.countries.menu2.content9.row3'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item10'),
    content: [
        t('shipping.routes.countries.menu2.content10.row1'),
        t('shipping.routes.countries.menu2.content10.row2'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item12'),
    content: [
        t('shipping.routes.countries.menu2.content12.row1'),
        t('shipping.routes.countries.menu2.content12.row2'),
        t('shipping.routes.countries.menu2.content12.row3'),
        t('shipping.routes.countries.menu2.content12.row4'),
        t('shipping.routes.countries.menu2.content12.row5'),
        t('shipping.routes.countries.menu2.content12.row6'),
        t('shipping.routes.countries.menu2.content12.row7'),
        t('shipping.routes.countries.menu2.content12.row8'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item13'),
    content: [
        t('shipping.routes.countries.menu2.content13.row1'),
        t('shipping.routes.countries.menu2.content13.row2'),
        t('shipping.routes.countries.menu2.content13.row3'),
        t('shipping.routes.countries.menu2.content13.row4'),
        t('shipping.routes.countries.menu2.content13.row5'),
        t('shipping.routes.countries.menu2.content13.row6'),
        t('shipping.routes.countries.menu2.content13.row7'),
        t('shipping.routes.countries.menu2.content13.row8'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item14'),
    content: [
        t('shipping.routes.countries.menu2.content14.row1'),
        t('shipping.routes.countries.menu2.content14.row2'),
        t('shipping.routes.countries.menu2.content14.row3'),
        t('shipping.routes.countries.menu2.content14.row4'),
    ]
  },
])



const openFaqs = ref(Array(items.value.length).fill(false))
const openFaqs2 = ref(Array(items2.value.length).fill(false))
const openFaqs3 = ref(Array(items3.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
const toggleFaq2 = (index) => {
  openFaqs2.value[index] = !openFaqs2.value[index]
}
const toggleFaq3 = (index) => {
  openFaqs3.value[index] = !openFaqs3.value[index]
}

// 一般集貨
const pricingItems = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge3'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'NTD ' + feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'NTD ' + (feeResult2.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost - feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost)
  },
    {
    currency: t('shipping.routes.countries.menu2.twdCharge4'),
    weight: t('shipping.routes.countries.menu2.volumetricCharge'),
    price: 'NTD 196'
  },
])

const pricingItems2 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge3'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'NTD ' + feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'NTD ' + (feeResult2.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost - feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost)
  },
    {
    currency: t('shipping.routes.countries.menu2.twdCharge4'),
    weight: t('shipping.routes.countries.menu2.volumetricCharge'),
    price: 'NTD 200'
  },
])

// 重貨cargo
const pricingItems3 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    weight: '50-100kg',
    price: 'NTD ' + feeResult3.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.Coin?.cost / 50
  },
  {
    currency: '',
    weight: '101-150kg',
    price: 'NTD ' + feeResult4.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.Coin?.cost / 101
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.over151KG'),
    price: 'NTD ' + feeResult5.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.Coin?.cost / 151
  }
])

const pricingItems4 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge2'),
    weight: '50-100kg',
    price: 'NTD ' + feeResult3.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.CreditCard?.cost / 50
  },
  {
    currency: '',
    weight: '101-150kg',
    price: 'NTD ' + feeResult4.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.CreditCard?.cost / 101
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.over151KG'),
    price: 'NTD ' + feeResult5.value?.warehouses?.[0]?.methods?.[3]?.feesByPayment?.CreditCard?.cost / 151
  }
])

// 拆箱重新打包
const pricingItems5 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    explain: t('shipping.routes.countries.menu2.forPackage'),
    packagingFee: t('shipping.routes.countries.menu2.perPackage'),
  }
])

// 轉寄日本境內
const pricingItems6 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.jpyCharge1'),
    weight: t('shipping.routes.countries.menu2.under5KG'),
    price: 'JPY 250',
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.over6KG'),
    price: 'JPY 50',
  }
])

// 代墊運費
const pricingItems9 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.jpyCharge2'),
    behalf: t('shipping.routes.countries.menu2.cod'),
    price: t('shipping.routes.countries.menu2.serviceFee'),
  },
  {
    currency: '',
    behalf: t('shipping.routes.countries.menu2.actualCost'),
    price: 'JPY 300',
  }
])

// 商業報關
const pricingItems11 = computed(() => [
  {
    type: t('shipping.routes.countries.menu2.serviceFee'),
    simple: t('shipping.routes.countries.menu2.simple'),
    formal: t('shipping.routes.countries.menu2.formal'),
  }
])

// 運輸保險
const pricingItems12 = computed(() => [
  {
    rate: t('shipping.routes.countries.menu2.rate'),
  }
])

// 存倉時間
const pricingItems13 = computed(() => [
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