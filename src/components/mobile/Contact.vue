<template>
  <section id="contact" class="py-16 bg-white dark:bg-gray-900">
    <div class="px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('contact.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <!-- Contact Info -->
      <div class="mb-12 space-y-4">
        <div
          v-for="(info, index) in contactInfo"
          :key="info.key"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start space-x-3">
            <div class="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <component :is="info.icon" :size="20" class="text-primary-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ t(`contact.info.${info.key}`) }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ info.value }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="animate-slide-up" style="animation-delay: 0.3s">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('contact.form.name') }}
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('contact.form.email') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('contact.form.phone') }}
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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