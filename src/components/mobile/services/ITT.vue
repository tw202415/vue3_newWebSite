<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex overflow-x-auto h-screen pt-16">
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <header class="bg-gray-800/80 backdrop-blur-sm p-6 border-b border-cyan-500/20 flex justify-center items-center">
          <h1 class="text-4xl font-bold text-cyan-400 font-mono tracking-wider text-center w-full">
            {{ t('footer.links.service1') }}
          </h1>
        </header>
        <h2 class="text-4xl font-bold text-gray-300 m-4 font-mono tracking-wider text-left flex justify-center items-center">
          {{ title }}
        </h2>
        <h2 class="text-2xl font-bold text-gray-300 m-4 font-mono tracking-wider text-left w-full">
          {{ termHeader }}
        </h2>
        
        <div 
            v-for="(item, index) in termContent"
            :key="index"
            class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
          >
            <div class="p-6 pt-0 border-t border-cyan-500/20">
              <p class="mt-4 font-bold text-xl text-gray-200 group-hover:text-cyan-300 transition-colors">
                {{ item.title }}
              </p>
              <p v-if="index === 0" class="mt-2 font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
                {{ item.terms[index] }}
              </p>
              <p class="mt-2 text-gray-400" v-for="(i, idx) in item.terms">
                <template v-if="i[1] === '.'">
                  {{ i }}
                </template>
                <template v-else>
                  {{ idx + 1 }}.{{ i }}
                </template>
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
const title = ref()
const termHeader = ref()
const termContent = ref()

// 根據語言自動切換 id
const getIdByLocale = (currentLanguage) => {
  if (currentLanguage === 'zh-TW') return 1
  if (currentLanguage === 'en-US') return 17
  return 1
}


const fetchLinksContent = async (id) => {
  try {
    const response = await getFooterDetail(id)
    const termsData = JSON.parse(response.body)

    title.value = termsData.title
    termHeader.value = termsData.header
    termContent.value = termsData.terms

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



</script>{