<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <!-- 頂部導航 -->
    <MobileHeader 
      :title="t('shipping.routes.countries.shenzhenAirFreight')"
      class="sticky top-0 z-50"
    />

    <!-- 標籤導航 -->
    <div class="sticky top-14 z-40 bg-gray-800 border-b border-cyan-500/20 px-4">
      <div class="flex overflow-x-auto scrollbar-hide space-x-2 py-2">
        <button
          v-for="menu in menus"
          :key="menu.id"
          @click="activeTab = menu.id"
          class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
          :class="{
            'bg-cyan-400/10 text-cyan-400': activeTab === menu.id,
            'text-gray-300 hover:bg-gray-700/50': activeTab !== menu.id
          }"
        >
          {{ menu.title }}
        </button>
      </div>
    </div>

    <!-- 內容區 -->
    <div class="p-4">
      <div v-show="activeTab === 'process'">
        <!-- 集運流程 -->
        <ResponsiveComponent
          :desktop-component="DesktopProcessSection"
          :mobile-component="MobileProcessSection"
        />
      </div>
      
      <div v-show="activeTab === 'pricing'">
        <!-- 運費說明 -->
        <ResponsiveComponent
          :desktop-component="DesktopPricingSection"
          :mobile-component="MobilePricingSection"
        />
      </div>
      
      <div v-show="activeTab === 'timeline'">
        <!-- 運送時間 -->
        <ResponsiveComponent
          :desktop-component="DesktopTimelineSection"
          :mobile-component="MobileTimelineSection"
        />
      </div>
      
      <div v-show="activeTab === 'faq'">
        <!-- 常見問題 -->
        <ResponsiveComponent
          :desktop-component="DesktopFaqSection"
          :mobile-component="MobileFaqSection"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import MobileHeader from '@/components/mobile/Header.vue'
import ResponsiveComponent from '@/components/shared/ResponsiveComponent.vue'

const { t } = useI18n()

//桌面
import DesktopProcessSection from '@/components/desktop/shippings/shenzhenAirFreight/ProcessSection.vue'
import DesktopPricingSection from '@/components/desktop/shippings/shenzhenAirFreight/PricingSection.vue'
import DesktopTimelineSection from '@/components/desktop/shippings/shenzhenAirFreight/TimelineSection.vue'
import DesktopFaqSection from '@/components/desktop/shippings/shenzhenAirFreight/FaqSection.vue'

//手機
import MobileProcessSection from '@/components/mobile/shippings/shenzhenAirFreight/ProcessSection.vue'
import MobilePricingSection from '@/components/mobile/shippings/shenzhenAirFreight/PricingSection.vue'
import MobileTimelineSection from '@/components/mobile/shippings/shenzhenAirFreight/TimelineSection.vue'
import MobileFaqSection from '@/components/mobile/shippings/shenzhenAirFreight/FaqSection.vue'

const activeTab = ref('process') // 默认激活第一个标签

const menus = computed(() => [
  { id: 'process', title: t('shipping.routes.menu1') },
  { id: 'pricing', title: t('shipping.routes.menu2') },
  { id: 'timeline', title: t('shipping.routes.menu3') },
  { id: 'faq', title: t('shipping.routes.menu4') }
])

const currentTitle = computed(() => {
  const menu = menus.value.find(m => m.id === activeTab.value)
  return menu ? menu.title : ''
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
