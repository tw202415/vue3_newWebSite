<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex overflow-x-auto h-screen pt-16">
      <!-- 左側科技感菜單 -->
      <div class="w-64 bg-gray-800 border-r border-cyan-500/20">
        <div class="p-4 border-b border-cyan-500/20">
          <h2 class="text-xl font-mono font-bold text-cyan-400 tracking-wider">
            {{ t('shipping.routes.countries.germany') }}
          </h2>
        </div>
        <nav class="mt-4">
          <button
            v-for="(menu, index) in menus"
            :key="index"
            @click="activeTab = menu.id"
            class="w-full text-left px-4 py-3 font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50 transition-all duration-300 border-l-4 border-transparent"
            :class="{
              '!border-cyan-400 bg-gray-700/70 text-white': activeTab === menu.id
            }"
          >
            <span class="flex items-center">
              <span class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              {{ menu.title }}
            </span>
          </button>
        </nav>
      </div>

      <!-- 右側內容區 -->
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <!-- 頂部標題 -->
        <header class="bg-gray-800/80 backdrop-blur-sm p-6 border-b border-cyan-500/20">
          <h1 class="text-2xl font-bold text-cyan-400 font-mono tracking-wider">
            {{ currentTitle }}
          </h1>
        </header>

        <main class="p-6">
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
          
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import ResponsiveComponent from '@/components/shared/ResponsiveComponent.vue'

//桌面
import DesktopProcessSection from '@/components/desktop/shippings/Germany/ProcessSection.vue'
import DesktopPricingSection from '@/components/desktop/shippings/Germany/PricingSection.vue'
import DesktopTimelineSection from '@/components/desktop/shippings/Germany/TimelineSection.vue'

//手機
import MobileProcessSection from '@/components/mobile/shippings/Germany/ProcessSection.vue'
import MobilePricingSection from '@/components/mobile/shippings/Germany/PricingSection.vue'
import MobileTimelineSection from '@/components/mobile/shippings/Germany/TimelineSection.vue'

const { t } = useI18n()

const activeTab = ref('process')

const menus = computed(() => [
  { id: 'process', title: t('shipping.routes.menu1') },
  { id: 'pricing', title: t('shipping.routes.menu2') },
  { id: 'timeline', title: t('shipping.routes.menu3') },
])

const currentTitle = computed(() => {
  const menu = menus.value.find(m => m.id === activeTab.value)
  return menu ? menu.title : ''
})
</script>