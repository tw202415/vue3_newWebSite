<template>
  <div class="min-h-screen">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Cart Content -->
    <div class="pt-16 pb-16 md:pb-0">
      <ResponsiveComponent
        :desktop-component="DesktopRegister"
        :mobile-component="MobileRegister"
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
import DesktopRegister from '@/components/desktop/Register.vue';
import MobileRegister from '@/components/mobile/Register.vue';
</script>