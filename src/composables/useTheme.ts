import { ref, computed, onMounted, watch } from 'vue';
import type { Theme } from '@/types';

const theme = ref<Theme>('light');
const isDark = computed(() => theme.value === 'dark');

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      theme.value = prefersDark ? 'dark' : 'light';
    }
  };

  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme.value);
  };

  watch(theme, applyTheme, { immediate: true });

  onMounted(() => {
    initTheme();
  });

  return {
    theme: computed(() => theme.value),
    isDark,
    toggleTheme,
    setTheme,
  };
}