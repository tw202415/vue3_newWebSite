<template>
  <div id="app" class="min-h-screen">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useI18n } from '@/composables/useI18n';

// Initialize composables

const { initLanguage } = useI18n();

onMounted(() => {
  initLanguage();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  background: var(--primary-gradient);
  transition: background 0.5s;
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-bounce-subtle {
  animation: bounceSubtle 3s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSubtle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-light);
}

::-webkit-scrollbar-thumb {
  background: var(--color-bg-gray-dark);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-bg-gray-medium);
}

.dark ::-webkit-scrollbar-track {
  background: var(--color-bg-dark);
}

.dark ::-webkit-scrollbar-thumb {
  background: var(--color-bg-gray);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: var(--color-bg-gray-light);
}
#app {
  /* 保持透明，避免覆蓋 body 主題背景 */
  background: transparent;
}

</style>