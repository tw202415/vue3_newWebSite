<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <Truck :size="28" class="text-primary-400" />
            <span class="text-xl font-bold">{{ t('footer.company') }}</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            {{ t('footer.description') }}
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <component :is="social.icon" :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.links.services') }}</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.key">
              <a
                :href="link.href"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {{ t(`footer.links.${link.key}`) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('contact.title') }}</h3>
          <div class="space-y-2">
            <p class="text-gray-300 text-sm">+886-2-1234-5678</p>
            <p class="text-gray-300 text-sm">service@elfa-shipping.com</p>
            <p class="text-gray-300 text-sm">台北市信義區信義路五段7號</p>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p class="text-gray-400 text-sm">
          © 2025 {{ t('footer.company') }}. {{ t('footer.copyright') }}.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Truck, Facebook, Instagram, MessageCircle } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  { name: 'Line', icon: MessageCircle, url: 'https://line.me' }
];

const quickLinks = [
  { key: 'services', href: '#services' },
  { key: 'pricing', href: '#pricing' },
  { key: 'tracking', href: '#tracking' },
  { key: 'faq', href: '#faq' }
];
</script>