<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Shopping Mall Content -->
    <div class="pt-16 pb-16 md:pb-0">
      <ResponsiveComponent
        :desktop-component="DesktopShoppingMall"
        :mobile-component="MobileShoppingMall"
      />
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden">
      <BottomNavigation />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResponsiveComponent from '@/components/shared/ResponsiveComponent.vue';
import Footer from '@/components/shared/Footer.vue';
import BottomNavigation from '@/components/mobile/BottomNavigation.vue';
import DesktopHeader from '@/components/desktop/Header.vue';
import MobileHeader from '@/components/mobile/Header.vue';
import DesktopShoppingMall from '@/components/desktop/ShoppingMall.vue';
import MobileShoppingMall from '@/components/mobile/ShoppingMall.vue';
</script>