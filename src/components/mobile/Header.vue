<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <Truck :size="24" class="text-primary-600" />
          <span class="text-lg font-bold text-gray-900 dark:text-white">一路發</span>
        </router-link>

        <!-- Right Actions -->
        <div class="flex items-center space-x-2">
          <!-- 搜尋按鈕 -->
          <button
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Search :size="18" />
          </button>
          
          <!-- 通知按鈕 -->
          <button
            class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Bell :size="18" />
            <!-- 通知小紅點 -->
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Truck, Search, Bell } from 'lucide-vue-next'
</script>