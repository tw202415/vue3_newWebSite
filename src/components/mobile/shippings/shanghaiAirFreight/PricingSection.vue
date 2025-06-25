<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-cyan-400 mb-4">{{ t('shipping.routes.countries.menu2.title') }}</h2>
    
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
           {{ item.item }}
        </span>
        <span class="text-cyan-400 text-xl transition-transform duration-300" :class="{ 'rotate-45': openFaqs[index] }">
          +
        </span>
      </button>
      <div v-if="index === 0" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in pricingItems"
                :key="index"
                class="border-b border-cyan-500/10 hover:bg-gray-800/30"
              >
                <td class="p-4 text-gray-300">{{ item.currency }}</td>
                <td class="p-4 text-gray-400">{{ item.weight }}</td>
                <td class="p-4 text-cyan-400 font-medium">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent') }}
        </p>
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content1.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
      </div>

      <div v-if="index === 1" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <h2 class="text-cyan-400 font-bold mt-2">{{ t(`shipping.routes.countries.menu2.subtitle1`) }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in pricingItems2"
                :key="index"
                class="border-b border-cyan-500/10 hover:bg-gray-800/30"
              >
                <td class="p-4 text-gray-300">{{ item.currency }}</td>
                <td class="p-4 text-gray-400">{{ item.weight }}</td>
                <td class="p-4 text-cyan-400 font-medium">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent') }}
        </p>
        <h2 class="text-cyan-400 font-bold mt-10">{{ t(`shipping.routes.countries.menu2.subtitle2`) }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
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
                <td class="p-4 text-cyan-400 font-medium">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>        
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent2') }}
        </p>
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content1.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
      </div>

      <div v-if="index === 2" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <h2 class="text-cyan-400 font-bold mt-2">{{ t(`shipping.routes.countries.menu2.subtitle3`) }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in pricingItems4"
                :key="index"
                class="border-b border-cyan-500/10 hover:bg-gray-800/30"
              >
                <td class="p-4 text-gray-300">{{ item.currency }}</td>
                <td class="p-4 text-gray-400">{{ item.weight }}</td>
                <td class="p-4 text-cyan-400 font-medium">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent3') }}
        </p>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.currency') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.weight') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.unitPrice') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in pricingItems5"
                :key="index"
                class="border-b border-cyan-500/10 hover:bg-gray-800/30"
              >
                <td class="p-4 text-gray-300">{{ item.currency }}</td>
                <td class="p-4 text-gray-400">{{ item.weight }}</td>
                <td class="p-4 text-cyan-400 font-medium">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>        
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent4') }}
        </p>
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content2.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
      </div>

      <div v-if="index === 3" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <h2 class="text-cyan-400 font-bold mt-2">{{ t(`shipping.routes.countries.menu2.subtitle4`) }}</h2>
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content3.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
      </div>

      <div v-if="index === 4" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content4.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
        </p>
      </div>

      <div v-if="index === 5" v-show="openFaqs[index]" class="p-6 pt-0 border-t border-cyan-500/20">
        <p class="mt-2 text-gray-300"> 
          {{ t('shipping.routes.countries.menu2.example') }} : {{ t('shipping.routes.countries.menu2.exampleContent2') }}
        </p>
        <p class="text-cyan-400 mt-2">{{ t('shipping.routes.countries.menu2.content1.row') }}</p>
        <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
            {{ idx + 1 }}.{{ i }}
          <div v-if="idx === 4" class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800/70 text-gray-300">
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.single') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.customsFee') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.warehouseFee') }}</th>
                <th class="p-4 text-left border-b border-cyan-500/20">{{ t('shipping.routes.countries.menu2.duty') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in pricingItems6"
                :key="index"
                class="border-b border-cyan-500/10 hover:bg-gray-800/30"
              >
                <td class="p-4 text-gray-300">{{ item.single }}</td>
                <td class="p-4 text-gray-400">{{ item.customsFee }}</td>
                <td class="p-4 text-gray-300">{{ item.warehouseFee }}</td>
                <td class="p-4 text-gray-300">{{ item.duty }}</td>
              </tr>
            </tbody>
          </table>
        </div> 
        </p>
      </div>
    </div>
  </div>
    
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
const feeResult6 = ref(null)
const feeResult7 = ref(null)

const fetchShippingFee = async () => {
  try {
    // 1kg
    const payload = {
      countryId: 1,
      actualWeight: "1",
      length: "1",
      width: "1",
      height: "1"
    }

    // 2kg
    const payload2 = {
      countryId: 1,
      actualWeight: "2",
      length: "1",
      width: "1",
      height: "1"
    }

    // 5kg
    const payload3 = {
      countryId: 1,
      actualWeight: "5",
      length: "1",
      width: "1",
      height: "1"
    }

    // 6kg
    const payload4 = {
      countryId: 1,
      actualWeight: "6",
      length: "1",
      width: "1",
      height: "1"
    }

    // 50kg
    const payload5 = {
      countryId: 1,
      actualWeight: "50",
      length: "1",
      width: "1",
      height: "1"
    }

    // 101kg
    const payload6 = {
      countryId: 1,
      actualWeight: "101",
      length: "1",
      width: "1",
      height: "1"
    }

    // 151kg
    const payload7 = {
      countryId: 1,
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
    const res6 = await calculateShippingFee(payload6)
    const res7 = await calculateShippingFee(payload7)


    feeResult.value = res
    feeResult2.value = res2
    feeResult3.value = res3
    feeResult4.value = res4
    feeResult5.value = res5
    feeResult6.value = res6
    feeResult7.value = res7
    console.log('✅ 成功接收到 feeResult:', feeResult.value)
    console.log('✅ 成功接收到 feeResult:', feeResult2.value)
    console.log('✅ 成功接收到 feeResult:', feeResult3.value)
    console.log('✅ 成功接收到 feeResult:', feeResult4.value)
    console.log('✅ 成功接收到 feeResult:', feeResult5.value)
    console.log('✅ 成功接收到 feeResult:', feeResult6.value)
    console.log('✅ 成功接收到 feeResult:', feeResult7.value)
  } catch (error) {
    console.error('🔥 API 錯誤:', error)
  }
}

onMounted(() => {
  fetchShippingFee()
})

const faqItems = computed(() => [
  {
    item: t('shipping.routes.countries.menu2.item1'),
    content: [
        t('shipping.routes.countries.menu2.content1.row1'),
        t('shipping.routes.countries.menu2.content1.row2'),
        t('shipping.routes.countries.menu2.content1.row3'),
        t('shipping.routes.countries.menu2.content1.row4'),
        t('shipping.routes.countries.menu2.content1.row5'),
        t('shipping.routes.countries.menu2.content1.row6')
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item2'),
    content: [
        t('shipping.routes.countries.menu2.content1.row1'),
        t('shipping.routes.countries.menu2.content1.row2'),
        t('shipping.routes.countries.menu2.content1.row3'),
        t('shipping.routes.countries.menu2.content1.row4'),
        t('shipping.routes.countries.menu2.content1.row5'),
        t('shipping.routes.countries.menu2.content1.row6')
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item3'),
    content: [
        t('shipping.routes.countries.menu2.content2.row1'),
        t('shipping.routes.countries.menu2.content2.row2'),
        t('shipping.routes.countries.menu2.content2.row3'),
        t('shipping.routes.countries.menu2.content2.row4'),
        t('shipping.routes.countries.menu2.content2.row5'),
        t('shipping.routes.countries.menu2.content2.row6'),
        t('shipping.routes.countries.menu2.content2.row7')
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
  {
    item: t('shipping.routes.countries.menu2.item5'),
    content: [
        t('shipping.routes.countries.menu2.content4.row1'),
        t('shipping.routes.countries.menu2.content4.row2'),
        t('shipping.routes.countries.menu2.content4.row3'),
        t('shipping.routes.countries.menu2.content4.row4'),
        t('shipping.routes.countries.menu2.content4.row5'),
    ]
  },
  {
    item: t('shipping.routes.countries.menu2.item6'),
    content: [
        t('shipping.routes.countries.menu2.content5.row1'),
        t('shipping.routes.countries.menu2.content5.row2'),
        t('shipping.routes.countries.menu2.content5.row3'),
        t('shipping.routes.countries.menu2.content5.row4'),
        t('shipping.routes.countries.menu2.content5.row5'),
        t('shipping.routes.countries.menu2.content5.row6'),
        t('shipping.routes.countries.menu2.content5.row7'),
    ]
  },

])

const openFaqs = ref(Array(faqItems.value.length).fill(false))

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
// 一般集貨
const pricingItems = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'TWD ' + feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'TWD ' + (feeResult2.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost - feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.Coin?.cost)
  },
    {
    currency: t('shipping.routes.countries.menu2.twdCharge2'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'TWD ' + feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'TWD ' + (feeResult2.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost - feeResult.value?.warehouses?.[0]?.methods?.[0]?.feesByPayment?.CreditCard?.cost)
  }
])

// 單件速遞
const pricingItems2 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'TWD ' + feeResult.value?.warehouses?.[0]?.methods?.[1]?.feesByPayment?.Coin?.cost
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'TWD ' + (feeResult2.value?.warehouses?.[0]?.methods?.[1]?.feesByPayment?.Coin?.cost - feeResult.value?.warehouses?.[0]?.methods?.[1]?.feesByPayment?.Coin?.cost)
  }
])

const pricingItems3 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    weight: t('shipping.routes.countries.menu2.firstKG'),
    price: 'TWD ' + feeResult4.value?.warehouses?.[0]?.methods?.[1]?.feesByPayment?.Coin?.cost / 6
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.secondKG'),
    price: 'TWD ' + feeResult4.value?.warehouses?.[0]?.methods?.[1]?.feesByPayment?.Coin?.cost / 6
  }
])

// 重貨cargo
const pricingItems4 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge1'),
    weight: '50-100kg',
    price: 'TWD ' + feeResult5.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.Coin?.cost / 50
  },
  {
    currency: '',
    weight: '101-150kg',
    price: 'TWD ' + feeResult6.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.Coin?.cost / 101
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.over151KG'),
    price: 'TWD ' + feeResult7.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.Coin?.cost / 151
  }
])

const pricingItems5 = computed(() => [
  {
    currency: t('shipping.routes.countries.menu2.twdCharge2'),
    weight: '50-100kg',
    price: 'TWD ' + feeResult5.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.CreditCard?.cost / 50
  },
  {
    currency: '',
    weight: '101-150kg',
    price: 'TWD ' + feeResult6.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.CreditCard?.cost / 101
  },
  {
    currency: '',
    weight: t('shipping.routes.countries.menu2.over151KG'),
    price: 'TWD ' + feeResult7.value?.warehouses?.[0]?.methods?.[2]?.feesByPayment?.CreditCard?.cost / 151
  }
])

// 大型(超重)貨物
const pricingItems6 = computed(() => [
  {
    single: t('shipping.routes.countries.menu2.price'),
    customsFee: '1800' + t('shipping.routes.countries.menu2.ntd'),
    warehouseFee: t('shipping.routes.countries.menu2.according1'),
    duty: t('shipping.routes.countries.menu2.according2')
  }
])
</script>
