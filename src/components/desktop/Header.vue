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
            class="whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/shopping"
            class="whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.shopping') }}
          </router-link>
          <router-link
            to="/"
            @click="scrollToShipping"
            class="whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.shipping') }}
          </router-link>

          <router-link
            to="/"
            @click="scrollToContact"
            class="whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
          >
            {{ t('nav.contact') }}
          </router-link>

          <router-link
            to="/cart"
            class="whitespace-nowrap flex items-center space-x-1 p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <div class="relative">
              <ShoppingCart :size="20" />
              <span
                v-if="cartItemsCount > 0"
                class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartItemsCount }}
              </span>
            </div>
            <span>{{ t('cart.title') }}</span>
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">


          <!-- 主題色切換按鈕 - 僅在首頁顯示 -->
          <button
            v-if="isHomePage"
            @click="toggleTheme"
            :class="['whitespace-nowrap px-4 py-1 rounded text-white font-semibold transition-colors', currentTheme === 'blue' ? 'bg-[var(--primary-color)]' : 'bg-[var(--primary-color)]']"
          >
            {{ currentTheme === 'blue' ? '科技藍' : '科技橘' }}
          </button>
        
          <LanguageToggle />
          
          <!-- User Menu or Login Button -->
          <UserMenu v-if="isAuthenticated" />
          <button
            v-else
            @click="showAuthModal = true"
            class="whitespace-nowrap bg-var(--color-primary) hover:bg-primary-700 text-var(--color-white) px-6 py-2 rounded-lg font-medium transition-colors duration-200"
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
import { useRoute, useRouter } from 'vue-router';
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
const route = useRoute();
const router = useRouter();

// 滾動到集貨介紹
const scrollToShipping = (event) => {
  // 如果在首頁
  if (route.path === '/') {
    setTimeout(() => {
      const element = document.getElementById('shipping');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById('shipping');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  }
};

// 滾動到聯絡我們
const scrollToContact = (event) => {
  // 如果在首頁
  if (route.path === '/') {
    setTimeout(() => {
      const element = document.getElementById('footer');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById('footer');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  }
};

// 檢查當前是否為首頁
const isHomePage = computed(() => route.path === '/');
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

function toggleTheme() {
  const newTheme = currentTheme.value === 'blue' ? 'orange' : 'blue';
  setTheme(newTheme);
}

onMounted(() => {
  initAuth();
  // 預設主題
  setTheme('blue');
});
</script>