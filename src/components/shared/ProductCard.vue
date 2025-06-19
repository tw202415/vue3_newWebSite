<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <!-- Product Image -->
    <div class="aspect-square bg-gray-200 dark:bg-gray-700 relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      
      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col space-y-1">
        <span
          v-if="product.isHot"
          class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          🔥 熱銷
        </span>
        <span
          v-if="product.is24HShipping"
          class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          ⚡ 24H出貨
        </span>
        <span
          v-if="product.isVipOnly"
          class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          👑 VIP專屬
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        @click="toggleFavorite"
        class="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Heart
          :size="16"
          :class="isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'"
        />
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Product Name -->
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Rating & Reviews -->
      <div class="flex items-center space-x-2 mb-2">
        <div class="flex items-center">
          <Star
            v-for="i in 5"
            :key="i"
            :size="14"
            :class="i <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
          />
        </div>
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ product.rating.toFixed(1) }}
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-500">
          ({{ product.reviewCount }})
        </span>
      </div>

      <!-- Purchase Info -->
      <div class="flex items-center justify-between mb-3">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ product.purchaseCount }}人購買
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-500">
          庫存: {{ product.stock }}
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-3">
        <div>
          <span class="text-lg font-bold text-primary-600">
            {{ formatPrice(product.price, countryInfo.currency) }}
          </span>
          <span
            v-if="product.originalPrice && product.originalPrice > product.price"
            class="text-sm text-gray-500 line-through ml-2"
          >
            {{ formatPrice(product.originalPrice, countryInfo.currency) }}
          </span>
        </div>
        <div
          v-if="product.originalPrice && product.originalPrice > product.price"
          class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded"
        >
          省{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
        </div>
      </div>

      <!-- VIP Price -->
      <div
        v-if="product.vipPrice && currentUser?.isVip"
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 mb-3"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm text-yellow-800 dark:text-yellow-200">VIP專享價</span>
          <span class="font-bold text-yellow-600 dark:text-yellow-400">
            {{ formatPrice(product.vipPrice, countryInfo.currency) }}
          </span>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="handleAddToCart"
        :disabled="product.stock === 0 || (product.isVipOnly && !currentUser?.isVip)"
        class="w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            ? '缺貨中'
            : product.isVipOnly && !currentUser?.isVip
            ? '需要VIP會員'
            : '加入購物車'
        }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Heart, Star } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useCart } from '@/composables/useCart';
import type { EnhancedProduct } from '@/types';

interface Props {
  product: EnhancedProduct;
  countryInfo: {
    currency: string;
  };
}

const props = defineProps<Props>();
const { currentUser } = useAuth();
const { addItem } = useCart();

const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const formatPrice = (price: number, currency: string) => {
  const symbols = { JPY: '¥', KRW: '₩', USD: '$', EUR: '€' };
  return `${symbols[currency as keyof typeof symbols] || '$'}${price.toLocaleString()}`;
};

const handleAddToCart = () => {
  if (props.product.stock === 0) return;
  if (props.product.isVipOnly && !currentUser.value?.isVip) return;

  const price = currentUser.value?.isVip && props.product.vipPrice
    ? props.product.vipPrice
    : props.product.price;

  addItem({
    ...props.product,
    price
  });
};
</script>