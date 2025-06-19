<template>
  <section id="services" class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('services.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start space-x-4">
            <div class="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
              <component :is="service.icon" :size="32" class="text-primary-600" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ t(`services.items.${service.id}.title`) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                {{ t(`services.items.${service.id}.description`) }}
              </p>
              <ul class="space-y-2">
                <li
                  v-for="(feature, idx) in service.features"
                  :key="idx"
                  class="flex items-center text-sm text-gray-600 dark:text-gray-300"
                >
                  <Check :size="16" class="text-secondary-500 mr-2" />
                  {{ t(`services.items.${service.id}.features.${idx}`) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Truck, ShoppingCart, Package, FileCheck, Check } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const services = [
  {
    id: 'shipping',
    icon: Truck,
    features: ['feature1', 'feature2', 'feature3', 'feature4']
  },
  {
    id: 'shopping',
    icon: ShoppingCart,
    features: ['feature1', 'feature2', 'feature3', 'feature4']
  },
  {
    id: 'consolidation',
    icon: Package,
    features: ['feature1', 'feature2', 'feature3', 'feature4']
  },
  {
    id: 'customs',
    icon: FileCheck,
    features: ['feature1', 'feature2', 'feature3', 'feature4']
  }
];
</script>