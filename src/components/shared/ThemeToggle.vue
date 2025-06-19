<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="isDark" :size="20" class="text-yellow-500" />
    <Moon v-else :size="20" class="text-gray-600 dark:text-gray-300" />
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>