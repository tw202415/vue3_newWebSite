<template>
  <section class="py-16">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('cart.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('cart.subtitle') }}
        </p>
      </div>

      <div v-if="items.length === 0" class="text-center py-12">
        <ShoppingCart :size="48" class="text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ t('cart.empty.title') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ t('cart.empty.description') }}
        </p>
        <router-link
          to="/shopping"
          class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {{ t('cart.empty.action') }}
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <!-- Cart Items -->
        <div class="space-y-3">
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
          >
            <div class="flex items-center space-x-3">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-12 h-12 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm">{{ item.name }}</h3>
                <p class="text-xs text-gray-600 dark:text-gray-300">{{ item.country }}</p>
                <div class="font-semibold text-primary-600 text-sm">
                  ${{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                >
                  <Minus :size="12" />
                </button>
                <span class="w-6 text-center text-sm font-medium">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                >
                  <Plus :size="12" />
                </button>
              </div>
            </div>
            <div class="mt-3 text-right">
              <button
                @click="removeItem(item.id)"
                class="text-red-500 hover:text-red-700 text-xs"
              >
                {{ t('cart.remove') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sticky bottom-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {{ t('cart.summary') }}
          </h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">{{ t('cart.subtotal') }}</span>
              <span class="font-medium">${{ total.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">{{ t('cart.shipping') }}</span>
              <span class="font-medium">{{ t('cart.calculated') }}</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-2">
              <div class="flex justify-between font-semibold">
                <span>{{ t('cart.total') }}</span>
                <span>${{ total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
            {{ t('cart.checkout') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ShoppingCart, Plus, Minus } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import { useCart } from '@/composables/useCart';

const { t } = useI18n();
const { items, updateQuantity, removeItem } = useCart();

const total = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});
</script>