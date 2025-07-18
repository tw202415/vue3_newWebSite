<template>
  <div class="bg-white min-h-screen">
    <!-- 商品圖片輪播 -->
    <div class="relative bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 商品圖片 -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover">
          </div>

          <!-- 商品資訊 -->
          <div class="space-y-6">
            <!-- 麵包屑 -->
            <nav class="flex" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2 text-sm">
                <li>
                  <router-link to="/" class="text-gray-500 hover:text-primary-600">首頁</router-link>
                </li>
                <li class="text-gray-400">/</li>
                <li>
                  <router-link :to="`/shop/${$route.params.country}`" class="text-gray-500 hover:text-primary-600">
                    {{ countryInfo.name }}商品
                  </router-link>
                </li>
                <li class="text-gray-400">/</li>
                <li class="text-gray-500">{{ product.name }}</li>
              </ol>
            </nav>

            <!-- 商品標題 -->
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
              <div class="mt-2 flex items-center">
                <div class="flex items-center">
                  <span class="text-yellow-400">★★★★★</span>
                  <span class="ml-2 text-sm text-gray-500">({{ product.reviewCount }}則評論)</span>
                </div>
                <span class="mx-2 text-gray-300">|</span>
                <span class="text-sm text-gray-500">已售出 {{ product.purchaseCount }} 件</span>
              </div>
            </div>

            <!-- 價格區塊 -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-baseline">
                <span class="text-3xl font-bold text-red-600">${{ product.price }}</span>
                <span v-if="product.originalPrice" class="ml-2 text-sm text-gray-500 line-through">${{ product.originalPrice }}</span>
                <span v-if="product.vipPrice" class="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  VIP 價 ${{ product.vipPrice }}
                </span>
              </div>
              <div v-if="product.stock > 0" class="mt-2 text-sm text-green-600">
                庫存: {{ product.stock }} 件
              </div>
              <div v-else class="mt-2 text-sm text-red-600">
                缺貨中
              </div>
            </div>

            <!-- 商品規格 -->
            <div class="space-y-4">
              <div v-if="product.specs" v-for="(options, spec) in product.specs" :key="spec" class="space-y-2">
                <h3 class="text-sm font-medium text-gray-700">{{ spec }}</h3>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="option in options" 
                    :key="option"
                    class="px-3 py-1 border rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    :class="{ 'bg-primary-100 border-primary-500 text-primary-700': selectedSpecs[spec] === option }"
                    @click="selectSpec(spec, option)"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>

              <!-- 數量選擇 -->
              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-700">數量</span>
                <div class="flex items-center border rounded-md">
                  <button 
                    @click="decreaseQuantity" 
                    class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    :disabled="quantity <= 1"
                  >
                    -
                  </button>
                  <span class="px-4 py-1">{{ quantity }}</span>
                  <button 
                    @click="increaseQuantity" 
                    class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    :disabled="quantity >= product.stock"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- 按鈕區 -->
            <div class="flex space-x-4 pt-4">
              <button 
                @click="addToCart" 
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                加入購物車
              </button>
              <button 
                @click="buyNow" 
                class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                立即購買
              </button>
            </div>

            <!-- 配送資訊 -->
            <div class="pt-4 border-t border-gray-200">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>全館滿 $1,000 免運費</span>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-600">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>預計 3-5 個工作天內出貨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品詳情 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">商品詳情</h2>
        <div class="prose max-w-none" v-html="product.description"></div>
      </div>

      <!-- 商品評價 -->
      <div class="mt-12 bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">商品評價 ({{ product.reviewCount }})</h2>
        <div class="space-y-6">
          <div v-for="review in product.reviews" :key="review.id" class="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-500">{{ review.author.charAt(0) }}</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ review.author }}</p>
                  <div class="flex items-center">
                    <span class="text-yellow-400">★★★★★</span>
                    <span class="ml-2 text-sm text-gray-500">{{ review.date }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 text-sm text-gray-600">
              {{ review.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const { t } = useI18n()

// 模擬商品資料 - 實際應該從 API 獲取
const product = ref({
  id: route.params.id as string,
  name: '商品名稱',
  price: 999,
  originalPrice: 1299,
  vipPrice: 899,
  image: 'https://via.placeholder.com/600x600',
  description: '<p>這是一個範例商品描述，可以包含詳細的商品資訊、規格、使用方法等。</p><p>這裡可以放更多的商品介紹內容...</p>',
  reviewCount: 128,
  purchaseCount: 1560,
  stock: 45,
  specs: {
    '顏色': ['紅色', '藍色', '綠色'],
    '尺寸': ['S', 'M', 'L', 'XL']
  },
  reviews: [
    {
      id: 1,
      author: '王小明',
      rating: 5,
      date: '2023-10-15',
      content: '商品品質很好，非常滿意！'
    },
    {
      id: 2,
      author: '林小華',
      rating: 4,
      date: '2023-10-10',
      content: 'CP值很高，下次還會再來購買！'
    }
  ]
})

const countryInfo = computed(() => {
  const countries = {
    japan: { name: '日本', flag: '🇯🇵', currency: 'JPY' },
    korea: { name: '韓國', flag: '🇰🇷', currency: 'KRW' },
    germany: { name: '德國', flag: '🇩🇪', currency: 'EUR' }
  }
  return countries[route.params.country as keyof typeof countries] || countries.japan
})

const quantity = ref(1)
const selectedSpecs = ref<Record<string, string>>({})

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const selectSpec = (spec: string, option: string) => {
  selectedSpecs.value[spec] = option
}

const addToCart = () => {
  // 加入購物車邏輯
  console.log('加入購物車', {
    productId: product.value.id,
    quantity: quantity.value,
    specs: selectedSpecs.value
  })
}

const buyNow = () => {
  // 直接購買邏輯
  console.log('立即購買', {
    productId: product.value.id,
    quantity: quantity.value,
    specs: selectedSpecs.value
  })
}

// 從 API 獲取商品詳情
const fetchProductDetail = async () => {
  try {
    // const response = await fetch(`/api/products/${route.params.id}`)
    // const data = await response.json()
    // product.value = data
  } catch (error) {
    console.error('獲取商品詳情失敗:', error)
  }
}

onMounted(() => {
  fetchProductDetail()
})
</script>

<style scoped>
/* 添加自定義樣式 */
.prose {
  @apply text-gray-700 leading-relaxed;
}

.prose p {
  @apply mb-4;
}

.prose h3 {
  @apply text-lg font-semibold mt-6 mb-3;
}

.prose ul {
  @apply list-disc pl-6 mb-4;
}

.prose li {
  @apply mb-1;
}
</style>