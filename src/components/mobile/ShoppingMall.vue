<template>
  <section class="py-16">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('shopping.mall.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('shopping.mall.subtitle') }}
        </p>
      </div>

      <!-- Country Selection -->
      <div class="space-y-4 mb-12">
        <router-link
          v-for="country in countries"
          :key="country.code"
          :to="`/shop/${country.code}`"
          class="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-center space-x-4">
            <div class="text-4xl">{{ country.flag }}</div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {{ country.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {{ t(`shopping.countries.${country.code}.description`) }}
              </p>
              <div class="text-primary-600 dark:text-primary-400 text-sm font-medium">
                {{ t('shopping.browse') }} →
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Features -->
      <div>
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {{ t('shopping.features.title') }}
        </h2>
        <div class="space-y-4">
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex items-start space-x-3">
              <div class="bg-gradient-to-br from-primary-500 to-secondary-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <component :is="feature.icon" :size="20" class="text-white" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ t(`shopping.features.${feature.id}.title`) }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t(`shopping.features.${feature.id}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ShoppingBag, Shield, Truck } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const countries = [
  { code: 'japan', name: '日本', flag: '🇯🇵' },
  { code: 'korea', name: '韓國', flag: '🇰🇷' },
  { code: 'usa', name: '美國', flag: '🇺🇸' },
  { code: 'germany', name: '德國', flag: '🇩🇪' }
];

const features = [
  { id: 'authentic', icon: Shield },
  { id: 'convenient', icon: ShoppingBag },
  { id: 'shipping', icon: Truck }
];
</script>