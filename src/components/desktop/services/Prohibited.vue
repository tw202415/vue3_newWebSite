<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex overflow-x-auto h-screen pt-16">
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <header class="bg-gray-800/80 backdrop-blur-sm p-6 border-b border-cyan-500/20 flex justify-center items-center">
          <h1 class="text-4xl font-bold text-cyan-400 font-mono tracking-wider text-center w-full">
            {{ t('footer.links.service3') }}
          </h1>
        </header>
        <div class="p-6 pt-0 border-t border-cyan-500/20">
          <div class="overflow-x-auto">
            <h2 class="text-cyan-400 font-bold m-3">{{ header }} :</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-800/70 text-gray-300">
                  <th class="p-4 text-center border-b border-cyan-500/20">{{ goods }}</th>
                  <th class="p-4 text-center border-b border-cyan-500/20">{{ riskLevel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in items"
                  :key="index"
                  class="border-b border-cyan-500/10 hover:bg-gray-800/30"
                >
                  <td class="p-4 text-gray-300 text-center">{{ item.name }}</td>
                  <td class="p-4 text-gray-400 text-center">{{ item.riskLevel }}</td>
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