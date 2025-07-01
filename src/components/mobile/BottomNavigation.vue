<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white  border-t border-gray-200  safe-area-pb">
    <div class="grid grid-cols-5 h-16">
      <!-- 首頁 -->
      <router-link
        to="/"
        class="flex flex-col items-center justify-center space-y-1 transition-colors duration-200"
        :class="isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'"
      >
        <Home :size="20" />
        <span class="text-xs font-medium">{{ t('nav.home') }}</span>
      </router-link>

      <!-- 代購商城 -->
      <router-link
        to="/shopping"
        class="flex flex-col items-center justify-center space-y-1 transition-colors duration-200"
        :class="isActive('/shopping') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'"
      >
        <ShoppingBag :size="20" />
        <span class="text-xs font-medium">{{ t('nav.shopping') }}</span>
      </router-link>

      <!-- 服務項目 -->
      <button
        to="/shipping"
        @click="scrollToServices"
        class="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 text-gray-500 dark:text-gray-400"
      >
        <Truck :size="20" />
        <span class="text-xs font-medium">{{ t('nav.shipping') }}</span>
      </button>

      <!-- 購物車 -->
      <router-link
        to="/cart"
        class="relative flex flex-col items-center justify-center space-y-1 transition-colors duration-200"
        :class="isActive('/cart') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'"
      >
        <ShoppingCart :size="20" />
        <span class="text-xs font-medium">{{ t('cart.title') }}</span>
        <span
          v-if="cartItemsCount > 0"
          class="absolute -top-1 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
        </span>
      </router-link>

      <!-- 更多 -->
      <button
        @click="showMoreMenu = !showMoreMenu"
        class="flex flex-col items-center justify-center space-y-1 transition-colors duration-200 text-gray-500 dark:text-gray-400"
      >
        <MoreHorizontal :size="20" />
        <span class="text-xs font-medium">更多</span>
      </button>
    </div>

    <!-- 更多選單 -->
    <div
      v-if="showMoreMenu"
      class="absolute bottom-16 right-0 w-48 bg-white dark:bg-gray-800 rounded-tl-lg shadow-lg border border-gray-200 "
    >
      <div class="py-2">
        <!-- 會員登入/用戶資訊 -->
        <div v-if="!isAuthenticated" class="px-4 py-3 border-b border-gray-200 ">
          <button
            @click="showAuthModal = true; showMoreMenu = false"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ t('auth.login.title') }}
          </button>
        </div>
        <div v-else class="px-4 py-3 border-b border-gray-200 ">
          <div class="flex items-center space-x-3">
            <img
              :src="currentUser?.avatar"
              :alt="currentUser?.name"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ currentUser?.name }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ currentUser?.isVip ? 'VIP會員' : '一般會員' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 功能選項 -->
        <button
          @click="scrollToContact"
          class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3"
        >
          <MessageCircle :size="18" />
          <span>{{ t('nav.contact') }}</span>
        </button>
        <button
          class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3"
        >
          <Calculator :size="18" />
          <span>{{ t('nav.quote') }}</span>
        </button>
        
        <!-- 會員功能 -->
        <div v-if="isAuthenticated">
          <div class="border-t border-gray-200  my-2"></div>
          <button
            class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3"
          >
            <User :size="18" />
            <span>個人資料</span>
          </button>
          <button
            class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3"
          >
            <Package :size="18" />
            <span>我的訂單</span>
          </button>
          <button
            v-if="!currentUser?.isVip"
            @click="upgradeToVip; showMoreMenu = false"
            class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3 text-yellow-600 dark:text-yellow-400"
          >
            <Crown :size="18" />
            <span>升級VIP</span>
          </button>
          <button
            @click="handleLogout"
            class="w-full px-4 py-3 text-left hover:bg-gray-100  transition-colors duration-200 flex items-center space-x-3 text-red-600 dark:text-red-400"
          >
            <LogOut :size="18" />
            <span>登出</span>
          </button>
        </div>
        
        <!-- 設定選項 -->
        <div class="border-t border-gray-200  my-2"></div>
        <div class="px-4 py-2 flex items-center justify-between">
          <span class="text-sm text-gray-600 ">主題</span>
          
        </div>
        <div class="px-4 py-2 flex items-center justify-between">
          <span class="text-sm text-gray-600 ">語言</span>
          <LanguageToggle />
        </div>
      </div>
    </div>

    <!-- 背景遮罩 -->
    <div
      v-if="showMoreMenu"
      @click="showMoreMenu = false"
      class="fixed inset-0 bg-black bg-opacity-20 -z-10"
    ></div>

    <!-- Auth Modal -->
    <AuthModal :is-open="showAuthModal" @close="showAuthModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Home, 
  ShoppingBag, 
  Truck, 
  ShoppingCart, 
  MoreHorizontal, 
  MessageCircle, 
  Calculator,
  User,
  Package,
  Crown,
  LogOut
} from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useCart } from '@/composables/useCart'
import { useAuth } from '@/composables/useAuth'
import LanguageToggle from '@/components/shared/LanguageToggle.vue'
import AuthModal from '@/components/shared/AuthModal.vue'

const { t } = useI18n()
const { items } = useCart()
const { isAuthenticated, currentUser, logout, upgradeToVip, initAuth } = useAuth()
const route = useRoute()
const router = useRouter()
const showMoreMenu = ref(false)
const showAuthModal = ref(false)

const cartItemsCount = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity, 0)
})

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const scrollToServices = () => {
  if (route.path !== '/') {
    router.push('/')
    setTimeout(() => {
      const element = document.getElementById('services')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  } else {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  showMoreMenu.value = false
}

const scrollToContact = () => {
  if (route.path !== '/') {
    router.push('/')
    setTimeout(() => {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  } else {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  showMoreMenu.value = false
}

const handleLogout = () => {
  logout()
  showMoreMenu.value = false
}

onMounted(() => {
  initAuth()
})
</script>

<style scoped>
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>