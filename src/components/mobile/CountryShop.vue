<template>
  <section class="py-16">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="text-6xl mb-4">{{ countryInfo.flag }}</div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ countryInfo.name }}{{ t('shopping.shop.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t(`shopping.countries.${country}.description`) }}
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-8 space-y-4">
        <!-- Categories -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('shopping.categories.title') }}
          </h2>
          <div class="flex overflow-x-auto space-x-3 pb-2">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'flex-shrink-0 p-3 rounded-lg border-2 transition-all duration-200',
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-700'
              ]"
            >
              <div class="text-xl mb-1">{{ category.icon }}</div>
              <div class="text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {{ t(`shopping.categories.${category.id}`) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-2">
          <button
            @click="showHotOnly = !showHotOnly"
            :class="[
              'px-3 py-1 rounded-full text-sm border transition-colors duration-200',
              showHotOnly
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            🔥 熱銷
          </button>
          <button
            @click="show24HOnly = !show24HOnly"
            :class="[
              'px-3 py-1 rounded-full text-sm border transition-colors duration-200',
              show24HOnly
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            ⚡ 24H
          </button>
          <button
            v-if="isAuthenticated && currentUser?.isVip"
            @click="showVipOnly = !showVipOnly"
            :class="[
              'px-3 py-1 rounded-full text-sm border transition-colors duration-200',
              showVipOnly
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            👑 VIP
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <!-- Product Image -->
          <div class="aspect-square bg-gray-200 dark:bg-gray-700 relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            
            <!-- Badges -->
            <div class="absolute top-1 left-1 flex flex-col space-y-1">
              <span
                v-if="product.isHot"
                class="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-medium"
              >
                🔥
              </span>
              <span
                v-if="product.is24HShipping"
                class="bg-green-500 text-white text-xs px-1 py-0.5 rounded font-medium"
              >
                ⚡
              </span>
              <span
                v-if="product.isVipOnly"
                class="bg-yellow-500 text-white text-xs px-1 py-0.5 rounded font-medium"
              >
                👑
              </span>
            </div>

            <!-- Favorite Button -->
            <button class="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1">
              <Heart :size="12" class="text-gray-400" />
            </button>
          </div>

          <!-- Product Info -->
          <div class="p-3">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm line-clamp-2">
              {{ product.name }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center space-x-1 mb-2">
              <div class="flex items-center">
                <Star
                  v-for="i in 5"
                  :key="i"
                  :size="10"
                  :class="i <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">
                {{ product.rating.toFixed(1) }}
              </span>
            </div>

            <!-- Purchase Info -->
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {{ product.purchaseCount }}人購買 · 庫存{{ product.stock }}
            </div>

            <!-- Price -->
            <div class="mb-2">
              <span class="text-sm font-bold text-primary-600">
                {{ formatPrice(product.price, countryInfo.currency) }}
              </span>
              <span
                v-if="product.originalPrice && product.originalPrice > product.price"
                class="text-xs text-gray-500 line-through ml-1"
              >
                {{ formatPrice(product.originalPrice, countryInfo.currency) }}
              </span>
            </div>

            <!-- VIP Price -->
            <div
              v-if="product.vipPrice && currentUser?.isVip"
              class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-1 mb-2"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-yellow-800 dark:text-yellow-200">VIP價</span>
                <span class="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                  {{ formatPrice(product.vipPrice, countryInfo.currency) }}
                </span>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button
              @click="handleAddToCart(product)"
              :disabled="product.stock === 0 || (product.isVipOnly && !currentUser?.isVip)"
              class="w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="[
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500'
                  : product.isVipOnly && !currentUser?.isVip
                  ? 'bg-yellow-100 text-yellow-600 border border-yellow-300'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              ]"
            >
              {{
                product.stock === 0
                  ? '缺貨'
                  : product.isVipOnly && !currentUser?.isVip
                  ? '需VIP'
                  : '加入購物車'
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-8">
        <button class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
          {{ t('shopping.loadMore') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Heart, Star } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'
import { useAuth } from '@/composables/useAuth'
import type { EnhancedProduct } from '@/types'

interface Props {
  country: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const { addItem } = useCart()
const { isAuthenticated, currentUser, initAuth } = useAuth()

const selectedCategory = ref('all')
const showHotOnly = ref(false)
const show24HOnly = ref(false)
const showVipOnly = ref(false)

const countryInfo = computed(() => {
  const countries = {
    japan: { name: '日本', flag: '🇯🇵', currency: 'JPY' },
    korea: { name: '韓國', flag: '🇰🇷', currency: 'KRW' },
    germany: { name: '德國', flag: '🇩🇪', currency: 'EUR' }
  }
  return countries[props.country as keyof typeof countries] || countries.japan
})

const categories = [
  { id: 'all', icon: '🛍️' },
  { id: 'fashion', icon: '👕' },
  { id: 'beauty', icon: '💄' },
  { id: 'electronics', icon: '📱' },
  { id: 'food', icon: '🍜' },
  { id: 'books', icon: '📚' },
  { id: 'home', icon: '🏠' }
]

// Enhanced mock products data
const products = ref<EnhancedProduct[]>([
  {
    id: '1',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
  {
    id: '2',
    name: '韓國人氣面膜組合',
    price: 2500,
    originalPrice: 3000,
    vipPrice: 2200,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.6,
    reviewCount: 89,
    purchaseCount: 445,
    stock: 23,
    isHot: false,
    is24HShipping: true,
    isVipOnly: false
  },
  {
    id: '3',
    name: 'VIP專屬限量電子產品',
    price: 15000,
    originalPrice: 18000,
    vipPrice: 13500,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    country: props.country,
    rating: 4.9,
    reviewCount: 234,
    purchaseCount: 67,
    stock: 8,
    isHot: true,
    is24HShipping: false,
    isVipOnly: true
  },
  {
    id: '4',
    name: '特色零食大禮包',
    price: 800,
    originalPrice: 1000,
    vipPrice: 720,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'food',
    country: props.country,
    rating: 4.3,
    reviewCount: 78,
    purchaseCount: 234,
    stock: 0,
    isHot: false,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '5',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '6',
    name: '日本限定櫻花護手霜套裝ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
    price: 1800000000000000000000000000000000000000000000000000000000000000,
    originalPrice: 2200000000000000000000000000000000000000000000000000000000000000,
    vipPrice: 1600000000000000000000000000000000000000000000000000000000000000,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '7',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '8',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '9',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '10',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '11',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '12',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '13',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '14',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '15',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '16',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '17',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '18',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '19',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '20',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '21',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '22',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '23',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '24',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '25',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '26',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '27',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '28',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '29',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
    {
    id: '30',
    name: '日本限定櫻花護手霜套裝',
    price: 1800,
    originalPrice: 2200,
    vipPrice: 1600,
    image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beauty',
    country: props.country,
    rating: 4.8,
    reviewCount: 156,
    purchaseCount: 892,
    stock: 45,
    isHot: true,
    is24HShipping: true,
    isVipOnly: false
  },
])

const filteredProducts = computed(() => {
  let filtered = products.value

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Hot products filter
  if (showHotOnly.value) {
    filtered = filtered.filter(product => product.isHot)
  }

  // 24H shipping filter
  if (show24HOnly.value) {
    filtered = filtered.filter(product => product.is24HShipping)
  }

  // VIP only filter
  if (showVipOnly.value) {
    filtered = filtered.filter(product => product.isVipOnly)
  }

  return filtered
})

const formatPrice = (price: number, currency: string) => {
  const symbols = { JPY: '¥', KRW: '₩', USD: '$', EUR: '€' }
  return `${symbols[currency as keyof typeof symbols] || '$'}${price.toLocaleString()}`
}

const handleAddToCart = (product: EnhancedProduct) => {
  if (product.stock === 0) return
  if (product.isVipOnly && !currentUser.value?.isVip) return

  const price = currentUser.value?.isVip && product.vipPrice
    ? product.vipPrice
    : product.price

  addItem({
    ...product,
    price
  })
}

onMounted(() => {
  initAuth()
})
</script>