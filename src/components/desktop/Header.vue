<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-2">
            <img src="https://work.elf.com.tw/images/logo.png" alt="Logo" class="align-middle object-contain" style="width:30%;height:auto;" />
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/shopping"
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.shopping') }}
          </router-link>
          <a
            href="#shipping"
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.shipping') }}
          </a>
          <a
            href="#contact"
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.contact') }}
          </a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <router-link
            to="/cart"
            class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <ShoppingCart :size="20" />
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartItemsCount }}
            </span>
          </router-link>

          <!-- 主題色切換按鈕 -->
          <button
            @click="setTheme('blue')"
            :class="['px-2 py-1 rounded text-white font-semibold transition-colors', currentTheme === 'blue' ? 'bg-[var(--primary-color)]' : 'bg-gray-400']"
            style="margin-right:2px;"
          >
            科技藍
          </button>
          <button
            @click="setTheme('orange')"
            :class="['px-2 py-1 rounded text-white font-semibold transition-colors', currentTheme === 'orange' ? 'bg-[var(--primary-color)]' : 'bg-gray-400']"
          >
            科技橘
          </button>

          <LanguageToggle />
          
          <!-- User Menu or Login Button -->
          <UserMenu v-if="isAuthenticated" />
          <button
            v-else
            @click="showAuthModal = true"
            class="bg-var(--color-primary) hover:bg-primary-700 text-var(--color-white) px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            {{ t('auth.login.title') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <AuthModal :is-open="showAuthModal" @close="showAuthModal = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Truck, ShoppingCart } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';
import LanguageToggle from '@/components/shared/LanguageToggle.vue';
import UserMenu from '@/components/shared/UserMenu.vue';
import AuthModal from '@/components/shared/AuthModal.vue';
import '@/assets/theme.css';

const { t } = useI18n();
const { items } = useCart();
const { isAuthenticated, initAuth } = useAuth();

const showAuthModal = ref(false);

const cartItemsCount = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity, 0);
});

const currentTheme = ref('blue');
function setTheme(theme: 'blue' | 'orange') {
  // 先移除所有 theme- 類class
  document.body.className = document.body.className
    .split(' ')
    .filter(c => !c.startsWith('theme-'))
    .join(' ');
  document.body.classList.add('theme-' + theme);
  currentTheme.value = theme;
}

onMounted(() => {
  initAuth();
  // 預設主題
  setTheme('blue');
});
</script>