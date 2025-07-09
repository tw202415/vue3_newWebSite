<template>
  <div class="min-h-screen bg-gray-900 pb-24 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex flex-col h-screen pt-12 px-2 overflow-hidden">
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-md p-1">
        <header class="bg-gray-800/90 backdrop-blur-md p-4 border-b border-cyan-500/30 flex justify-center items-center rounded-t-2xl sticky top-0 z-10">
          <h1 class="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tracking-wide text-center w-full">
            {{ t('footer.links.service4') }}
          </h1>
        </header>
        <h2 class="text-lg sm:text-xl font-bold text-gray-300 mt-4 mb-2 font-mono tracking-wide text-left w-full px-2">
          {{ header }}
        </h2>
        <div 
          v-for="(item, index) in categories"
          :key="index"
          class="bg-gray-800/70 rounded-xl border border-cyan-500/20 shadow-md shadow-cyan-500/10 overflow-hidden mb-4 mx-1"
        >
          <div class="p-4 pt-0 border-t border-cyan-500/10">
            <p class="mt-4 font-bold text-base text-gray-200 group-hover:text-cyan-300 transition-colors">
              {{ item.title }}
            </p>
            <p class="mt-2 text-gray-400 text-sm leading-relaxed" v-for="(i, idx) in item.examples">
              {{ idx + 1 }}.{{ i }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { getFooterDetail } from '@/apis/CMSAPI'

const { t, currentLanguage } = useI18n()
const header = ref()
const categories = ref()

// 根據語言自動切換 id
const getIdByLocale = (currentLanguage) => {
  if (currentLanguage === 'zh-TW') return 4
  if (currentLanguage === 'en-US') return 20
  return 4
}


const fetchLinksContent = async (id) => {
  try {
    const response = await getFooterDetail(id)
    const data = JSON.parse(response.body)

    header.value = data.header
    categories.value = data.categories

  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchLinksContent(getIdByLocale(currentLanguage.value))
})

// 監聽語言切換
watch(currentLanguage, (newLocale) => {
  fetchLinksContent(getIdByLocale(newLocale))
})
</script>