<template>
  <div class="min-h-screen bg-gray-900 pb-24 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex flex-col h-screen pt-12 px-2 overflow-hidden">
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-md p-1">
        <header class="bg-gray-800/90 backdrop-blur-md p-4 border-b border-cyan-500/30 flex justify-center items-center rounded-t-2xl sticky top-0 z-10">
          <h1 class="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tracking-wide text-center w-full">
            {{ t('footer.links.service3') }}
          </h1>
        </header>
        <div class="p-2 pt-0 border-t border-cyan-500/10">
          <div class="overflow-x-auto rounded-xl shadow-md bg-gray-800/70 mb-4 mx-1">
            <h2 class="text-cyan-400 font-bold mt-4 mb-2 px-2 text-base sm:text-lg">{{ header }} :</h2>
            <table class="w-full border-collapse min-w-[320px]">
              <thead>
                <tr class="bg-gray-800/80 text-gray-300">
                  <th class="p-3 text-center border-b border-cyan-500/20 text-sm sm:text-base">{{ goods }}</th>
                  <th class="p-3 text-center border-b border-cyan-500/20 text-sm sm:text-base">{{ riskLevel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in items"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/40 transition-colors"
                >
                  <td class="p-3 text-gray-300 text-center text-sm sm:text-base break-words">{{ item.name }}</td>
                  <td class="p-3 text-gray-400 text-center text-sm sm:text-base break-words">{{ item.riskLevel }}</td>
                </tr>
              </tbody>
            </table>
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
const goods = ref()
const riskLevel = ref()
const items = ref()

// 根據語言自動切換 id
const getIdByLocale = (currentLanguage) => {
  if (currentLanguage === 'zh-TW') return 3
  if (currentLanguage === 'en-US') return 19
  return 3
}


const fetchLinksContent = async (id) => {
  try {
    const response = await getFooterDetail(id)
    const data = JSON.parse(response.body)
    header.value = data.header
    goods.value = data.goods
    riskLevel.value = data.riskLevel
    items.value = data.items

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