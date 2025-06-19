<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <img
        :src="currentUser?.avatar"
        :alt="currentUser?.name"
        class="w-8 h-8 rounded-full object-cover"
      />
      <div class="hidden md:block text-left">
        <div class="text-sm font-medium text-gray-900 dark:text-white">
          {{ currentUser?.name }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ currentUser?.isVip ? 'VIP會員' : '一般會員' }}
        </div>
      </div>
      <ChevronDown :size="16" :class="{ 'rotate-180': isOpen }" class="transition-transform duration-200" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[55]"
    >
      <!-- User Info -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <img
            :src="currentUser?.avatar"
            :alt="currentUser?.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ currentUser?.name }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ currentUser?.email }}
            </div>
            <div class="flex items-center space-x-2 mt-1">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  currentUser?.isVip
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                ]"
              >
                {{ currentUser?.isVip ? 'VIP會員' : '一般會員' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-2">
        <button
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
        >
          <User :size="18" />
          <span>個人資料</span>
        </button>
        <button
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
        >
          <Package :size="18" />
          <span>我的訂單</span>
        </button>
        <button
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
        >
          <Heart :size="18" />
          <span>我的收藏</span>
        </button>
        <button
          v-if="!currentUser?.isVip"
          @click="handleUpgradeToVip"
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3 text-yellow-600 dark:text-yellow-400"
        >
          <Crown :size="18" />
          <span>升級VIP</span>
        </button>
        <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <button
          @click="handleLogout"
          class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3 text-red-600 dark:text-red-400"
        >
          <LogOut :size="18" />
          <span>登出</span>
        </button>
      </div>
    </div>

    <!-- Background Overlay -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-[54]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, User, Package, Heart, Crown, LogOut } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';

const { currentUser, logout, upgradeToVip } = useAuth();
const isOpen = ref(false);

const handleLogout = () => {
  logout();
  isOpen.value = false;
};

const handleUpgradeToVip = () => {
  upgradeToVip();
  isOpen.value = false;
};
</script>