<template>
  <div class="min-h-screen bg-white transition-colors duration-300">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Main Content -->
    <main class="pb-16 md:pb-0">
      <ResponsiveComponent
        :desktop-component="DesktopShippingPortland"
        :mobile-component="MobileShippingPortland"
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
import DesktopShippingPortland from '@/components/desktop/shippings/Portland.vue';

// Mobile Components
import MobileHeader from '@/components/mobile/Header.vue';
import MobileShippingPortland from '@/components/mobile/shippings/Portland.vue';

// Initialize composables
const { initLanguage } = useI18n();

onMounted(() => {
  initLanguage();
});
</script>