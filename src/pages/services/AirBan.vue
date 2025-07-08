<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Main Content -->
    <main class="pb-16 md:pb-0">
      <ResponsiveComponent
        :desktop-component="DesktopAirBan"
        :mobile-component="MobileAirBan"
      />

    </main>

    <!-- Footer -->
    <Footer />

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden">
      <BottomNavigation />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from '@/composables/useI18n';

// Shared Components
import ResponsiveComponent from '@/components/shared/ResponsiveComponent.vue';
import Footer from '@/components/shared/Footer.vue';
import BottomNavigation from '@/components/mobile/BottomNavigation.vue';

// Desktop Components
import DesktopHeader from '@/components/desktop/Header.vue';
import DesktopAirBan from '@/components/desktop/services/AirBan.vue';

// Mobile Components
import MobileHeader from '@/components/mobile/Header.vue';
import MobileAirBan from '@/components/mobile/services/AirBan.vue';

// Initialize composables
const { initLanguage } = useI18n();

onMounted(() => {
  initLanguage();
});
</script>