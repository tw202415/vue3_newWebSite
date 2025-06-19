<template>
  <section id="contact" class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('contact.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="animate-slide-up">
          <div class="space-y-8">
            <div
              v-for="(info, index) in contactInfo"
              :key="info.key"
              class="flex items-start space-x-4"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                <component :is="info.icon" :size="24" class="text-primary-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ t(`contact.info.${info.key}`) }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ info.value }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="animate-slide-up" style="animation-delay: 0.3s">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('contact.form.name') }}
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('contact.form.phone') }}
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.email') }}
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('contact.form.message') }}
              </label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              {{ t('contact.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Phone, Mail, MapPin, Clock } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const contactInfo = [
  {
    key: 'phone',
    icon: Phone,
    value: '+886-2-1234-5678'
  },
  {
    key: 'email',
    icon: Mail,
    value: 'service@elfa-shipping.com'
  },
  {
    key: 'address',
    icon: MapPin,
    value: '台北市信義區信義路五段7號'
  },
  {
    key: 'hours',
    icon: Clock,
    value: '週一至週五 09:00-18:00'
  }
];

const submitForm = () => {
  console.log('Form submitted:', form);
  // Handle form submission
};
</script>