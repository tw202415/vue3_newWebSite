<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Main Content -->
    <main class="pb-16 md:pb-0">
      <!-- Hero Section -->
      <ResponsiveComponent
        :desktop-component="DesktopHero"
        :mobile-component="MobileHero"
      />

      <!-- Shipping Routes Section -->
      <ResponsiveComponent
        :desktop-component="DesktopShippingRoutes"
        :mobile-component="MobileShippingRoutes"
      />

      <!-- Services Section -->
      <ResponsiveComponent
        :desktop-component="DesktopServices"
        :mobile-component="MobileServices"
      />

      <!-- Features Section -->
      <ResponsiveComponent
        :desktop-component="DesktopFeatures"
        :mobile-component="MobileFeatures"
      />

      <!-- Contact Section -->
      <ResponsiveComponent
        :desktop-component="DesktopContact"
        :mobile-component="MobileContact"
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
import { useTheme } from '@/composables/useTheme';
import { useI18n } from '@/composables/useI18n';

// Shared Components
import ResponsiveComponent from '@/components/shared/ResponsiveComponent.vue';
import Footer from '@/components/shared/Footer.vue';
import BottomNavigation from '@/components/mobile/BottomNavigation.vue';

// Desktop Components
import DesktopHeader from '@/components/desktop/Header.vue';
import DesktopHero from '@/components/desktop/Hero.vue';
import DesktopShippingRoutes from '@/components/desktop/ShippingRoutes.vue';
import DesktopServices from '@/components/desktop/Services.vue';
import DesktopFeatures from '@/components/desktop/Features.vue';
import DesktopContact from '@/components/desktop/Contact.vue';

// Mobile Components
import MobileHeader from '@/components/mobile/Header.vue';
import MobileHero from '@/components/mobile/Hero.vue';
import MobileShippingRoutes from '@/components/mobile/ShippingRoutes.vue';
import MobileServices from '@/components/mobile/Services.vue';
import MobileFeatures from '@/components/mobile/Features.vue';
import MobileContact from '@/components/mobile/Contact.vue';

// Initialize composables
const { theme } = useTheme();
const { initLanguage } = useI18n();

onMounted(() => {
  initLanguage();
});
</script>