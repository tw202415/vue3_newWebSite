<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <ResponsiveComponent
      :desktop-component="DesktopHeader"
      :mobile-component="MobileHeader"
    />

    <!-- Country Shop Content -->
    <div class="pt-16 pb-16 md:pb-0">
      <ResponsiveComponent
        :desktop-component="DesktopCountryShop"
        :mobile-component="MobileCountryShop"
        :country="country"
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
import DesktopCountryShop from '@/components/desktop/CountryShop.vue';
import MobileCountryShop from '@/components/mobile/CountryShop.vue';

interface Props {
  country: string;
}

const props = defineProps<Props>();
const { country } = props;
</script>