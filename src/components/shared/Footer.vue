<template>
  <footer id="footer" class="bg-white text-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <img src="https://work.elf.com.tw/images/logo.png" alt="Logo" class="align-middle object-contain" style="width:30%;height:auto;" />
          </div>
          <p class="text-gray-600 mb-4 max-w-md">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.links.services') }}</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.key">
              <a
                :href="link.href"
                class="text-gray-600 hover:text-orange-500 transition-colors duration-200"
              >
                {{ t(`footer.links.${link.key}`) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('contact.title') }}</h3>
          <div class="space-y-2 text-gray-600 text-sm">
            <p>{{ t('footer.info.phone') }}: (02) 8201-7020</p>
            <p>{{ t('footer.info.fax') }}: (02) 8201-7030</p>
            <p>{{ t('footer.info.address') }}</p>
            <p>{{ t('footer.info.businessHour') }}</p>
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
  { key: 'service1', href: '/itt' },
  { key: 'service2', href: '/privacy' },
  { key: 'service3', href: '/prohibited' },
  { key: 'service4', href: '/airBan' },
  { key: 'service5', href: '/shipCalc' },
  { key: 'service6', href: '/proxyCalc' },
];
</script>