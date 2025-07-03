<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="text-8xl mb-4">{{ countryInfo.flag }}</div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ countryInfo.name }}{{ t('shopping.shop.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ t(`shopping.countries.${country}.description`) }}
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-12 space-y-6">
        <!-- Categories -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('shopping.categories.title') }}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'p-4 rounded-lg border-2 transition-all duration-200',
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
              ]"
            >
              <div class="text-2xl mb-2">{{ category.icon }}</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ t(`shopping.categories.${category.id}`) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <button
            @click="showHotOnly = !showHotOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              showHotOnly
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            🔥 熱銷商品
          </button>
          <button
            @click="show24HOnly = !show24HOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              show24HOnly
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            ⚡ 24H出貨
          </button>
          <button
            v-if="isAuthenticated && currentUser?.isVip"
            @click="showVipOnly = !showVipOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              showVipOnly
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            👑 VIP專屬
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :country-info="countryInfo"
        />
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <button class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          {{ t('shopping.loadMore') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { useAuth } from '@/composables/useAuth';
import ProductCard from '@/components/shared/ProductCard.vue';
import type { EnhancedProduct } from '@/types';

interface Props {
  country: string;
}

const props = defineProps<Props>();
const { t } = useI18n();
const { isAuthenticated, currentUser, initAuth } = useAuth();

const selectedCategory = ref('all');
const showHotOnly = ref(false);
const show24HOnly = ref(false);
const showVipOnly = ref(false);

const countryInfo = computed(() => {
  const countries = {
    japan: { name: '日本', flag: '🇯🇵', currency: 'JPY' },
    korea: { name: '韓國', flag: '🇰🇷', currency: 'KRW' },
    germany: { name: '德國', flag: '🇩🇪', currency: 'EUR' }
  };
  return countries[props.country as keyof typeof countries] || countries.japan;
});

const categories = [
  { id: 'all', icon: '🛍️' },
  { id: 'fashion', icon: '👕' },
  { id: 'beauty', icon: '💄' },
  { id: 'electronics', icon: '📱' },
  { id: 'food', icon: '🍜' },
  { id: 'books', icon: '📚' },
  { id: 'home', icon: '🏠' }
];

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
]);

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  // Hot products filter
  if (showHotOnly.value) {
    filtered = filtered.filter(product => product.isHot);
  }

  // 24H shipping filter
  if (show24HOnly.value) {
    filtered = filtered.filter(product => product.is24HShipping);
  }

  // VIP only filter
  if (showVipOnly.value) {
    filtered = filtered.filter(product => product.isVipOnly);
  }

  return filtered;
});

onMounted(() => {
  initAuth();
});
</script>