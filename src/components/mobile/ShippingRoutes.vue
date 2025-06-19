<template>
  <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('shipping.routes.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('shipping.routes.subtitle') }}
        </p>
      </div>

      <!-- Countries List -->
      <div class="space-y-4 mb-8">
        <div
          v-for="(country, index) in countries"
          :key="country.code"
          class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-center space-x-3">
            <div class="text-2xl">{{ country.flag }}</div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ country.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t(`shipping.routes.countries.${country.code}`) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="text-center mb-8">
        <div class="bg-primary-600 text-white p-3 rounded-full inline-block animate-bounce-subtle">
          <ArrowDown :size="20" />
        </div>
      </div>

      <!-- Taiwan Destination -->
      <div class="text-center mb-12 animate-slide-up" style="animation-delay: 0.6s">
        <div class="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-6 shadow-xl">
          <div class="text-4xl mb-3">🇹🇼</div>
          <h3 class="text-xl font-bold text-white mb-2">台灣</h3>
          <p class="text-primary-100">{{ t('shipping.routes.destination') }}</p>
        </div>
      </div>

      <!-- Shopping Links -->
      <div class="text-center">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {{ t('shopping.title') }}
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            v-for="country in shoppingCountries"
            :key="country.code"
            :to="`/shop/${country.code}`"
            class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div class="text-2xl mb-1">{{ country.flag }}</div>
            <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ country.name }}</div>
            <div class="text-xs text-primary-600 dark:text-primary-400">{{ t('shopping.browse') }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const countries = [
  { code: 'shanghai', name: '上海', flag: '🇨🇳' },
  { code: 'shenzhen', name: '深圳', flag: '🇨🇳' },
  { code: 'japan', name: '日本', flag: '🇯🇵' },
  { code: 'korea', name: '韓國', flag: '🇰🇷' },
  { code: 'usa', name: '美國', flag: '🇺🇸' },
  { code: 'germany', name: '德國', flag: '🇩🇪' }
];

const shoppingCountries = [
  { code: 'japan', name: '日本', flag: '🇯🇵' },
  { code: 'korea', name: '韓國', flag: '🇰🇷' },
  { code: 'usa', name: '美國', flag: '🇺🇸' },
  { code: 'germany', name: '德國', flag: '🇩🇪' }
];
</script>