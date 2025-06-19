<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('cart.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('cart.subtitle') }}
        </p>
      </div>

      <div v-if="items.length === 0" class="text-center py-12">
        <ShoppingCart :size="64" class="text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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

      <div v-else class="space-y-6">
        <!-- Cart Items -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ t('cart.items') }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ item.country }}</p>
                </div>
                <div class="flex items-center space-x-3">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  >
                    <Minus :size="16" />
                  </button>
                  <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  >
                    <Plus :size="16" />
                  </button>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    ${{ (item.price * item.quantity).toLocaleString() }}
                  </div>
                  <button
                    @click="removeItem(item.id)"
                    class="text-red-500 hover:text-red-700 text-sm"
                  >
                    {{ t('cart.remove') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ t('cart.summary') }}
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">{{ t('cart.subtotal') }}</span>
              <span class="font-medium">${{ total.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">{{ t('cart.shipping') }}</span>
              <span class="font-medium">{{ t('cart.calculated') }}</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div class="flex justify-between text-lg font-semibold">
                <span>{{ t('cart.total') }}</span>
                <span>${{ total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <button class="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
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