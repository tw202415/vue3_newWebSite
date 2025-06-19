<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <Globe :size="18" />
      <span class="text-sm font-medium">{{ currentLanguage === 'zh-TW' ? '繁中' : 'EN' }}</span>
      <ChevronDown :size="16" :class="{ 'rotate-180': isOpen }" class="transition-transform duration-200" />
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <button
        @click="selectLanguage('zh-TW')"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg transition-colors duration-200"
        :class="{ 'bg-primary-50 dark:bg-primary-900': currentLanguage === 'zh-TW' }"
      >
        繁體中文
      </button>
      <button
        @click="selectLanguage('en-US')"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors duration-200"
        :class="{ 'bg-primary-50 dark:bg-primary-900': currentLanguage === 'en-US' }"
      >
        English
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Globe, ChevronDown } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import type { Language } from '@/types';

const { currentLanguage, setLanguage } = useI18n();
const isOpen = ref(false);

const selectLanguage = (lang: Language) => {
  setLanguage(lang);
  isOpen.value = false;
};
</script>