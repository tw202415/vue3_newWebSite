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
        :desktop-component="DesktopShipCalc"
        :mobile-component="MobileShipCalc"
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
import DesktopShipCalc from '@/components/desktop/services/ShipCalc.vue';

// Mobile Components
import MobileHeader from '@/components/mobile/Header.vue';
import MobileShipCalc from '@/components/mobile/services/ShipCalc.vue';

// Initialize composables
const { initLanguage } = useI18n();

onMounted(() => {
  initLanguage();
});
</script>