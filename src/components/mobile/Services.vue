<template>
  <section id="services" class="py-16 bg-white dark:bg-gray-900">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('services.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Services List -->
      <div class="space-y-6">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start space-x-4">
            <div class="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <component :is="service.icon" :size="24" class="text-primary-600" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ t(`services.items.${service.id}.title`) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                {{ t(`services.items.${service.id}.description`) }}
              </p>
              <ul class="space-y-1">
                <li
                  v-for="(feature, idx) in service.features"
                  :key="idx"
                  class="flex items-center text-xs text-gray-600 dark:text-gray-300"
                >
                  <Check :size="12" class="text-secondary-500 mr-2 flex-shrink-0" />
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