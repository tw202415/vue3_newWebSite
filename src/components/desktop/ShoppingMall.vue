<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('shopping.mall.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ t('shopping.mall.subtitle') }}
        </p>
      </div>

      <!-- Country Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <router-link
          v-for="country in countries"
          :key="country.code"
          :to="`/shop/${country.code}`"
          class="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="text-center">
            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ country.flag }}
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ country.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ t(`shopping.countries.${country.code}.description`) }}
            </p>
            <div class="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg font-medium">
              {{ t('shopping.browse') }}
            </div>
          </div>
        </router-link>
      </div>

      <!-- Features -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {{ t('shopping.features.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            class="text-center animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="feature.icon" :size="32" class="text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ t(`shopping.features.${feature.id}.title`) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t(`shopping.features.${feature.id}.description`) }}
            </p>
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
  { code: 'germany', name: '德國', flag: '🇩🇪' }
];

const features = [
  { id: 'authentic', icon: Shield },
  { id: 'convenient', icon: ShoppingBag },
  { id: 'shipping', icon: Truck }
];
</script>