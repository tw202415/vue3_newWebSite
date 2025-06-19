import { ref, onMounted, onUnmounted } from 'vue';
import type { DeviceType } from '@/types';

const screenWidth = ref(0);

export function useDevice() {
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  const device: DeviceType = {
    get isMobile() {
      return screenWidth.value < 768;
    },
    get isTablet() {
      return screenWidth.value >= 768 && screenWidth.value < 1024;
    },
    get isDesktop() {
      return screenWidth.value >= 1024;
    }
  };

  onMounted(() => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  return {
    device,
    screenWidth,
  };
}