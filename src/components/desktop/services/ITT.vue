<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <!-- 主內容區 -->
    <div class="flex overflow-x-auto h-screen pt-16">
      <div class="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800">
        <header class="bg-gray-800/80 backdrop-blur-sm p-6 border-b border-cyan-500/20 flex justify-center items-center">
          <h1 class="text-4xl font-bold text-cyan-400 font-mono tracking-wider text-center w-full">
            {{ termTitle }}
          </h1>
        </header>
        <h2 class="text-2xl font-bold text-gray-300 m-4 font-mono tracking-wider text-left w-full">
          {{ t('footer.links.service1.content.header') }}
        </h2>
        
        <div 
            v-for="(item, index) in termsItems"
            :key="index"
            class="bg-gray-800/50 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 overflow-hidden"
          >
            <div class="p-6 pt-0 border-t border-cyan-500/20">
              <p class="mt-4 font-bold text-xl text-gray-200 group-hover:text-cyan-300 transition-colors">
                {{ item.item }}
              </p>
              <p v-if="index === 0" class="mt-2 font-bold text-lg text-gray-200 group-hover:text-cyan-300 transition-colors">
                {{ t('footer.links.service1.content.term1.row') }}
              </p>
              <p class="mt-2 text-gray-400" v-for="(i, idx) in item.content">
                  {{ idx + 1 }}.{{ i.text }}
                  <p v-if="i.children" v-for="(detail, idx) in i.children" :key="idx">
                    {{ detail }}
                  </p>
              </p>
            </div>
          </div>
      </div>
    </div>
  </div>

  <div v-html="termContent"></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { getFooterDetail } from '@/apis/CMSAPI'

const { t } = useI18n()
const termTitle = ref()
const termContent = ref()


const fetchLinksContent = async () => {
  try {
    const response = await getFooterDetail(1)
    termTitle.value = response.title
    termContent.value = response.body
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchLinksContent()
})

const termsItems = computed(() => [
  {
    item: t('footer.links.service1.content.term1.title'),
    content: [
        { text: t('footer.links.service1.content.term1.row1') },
        { text: t('footer.links.service1.content.term1.row2') },
        { text: t('footer.links.service1.content.term1.row3') },
        { text: t('footer.links.service1.content.term1.row4') },
        { text: t('footer.links.service1.content.term1.row5') },
        { text: t('footer.links.service1.content.term1.row6') },
        { text: t('footer.links.service1.content.term1.row7') },
        { text: t('footer.links.service1.content.term1.row8') },
    ],
  },
  {
    item: t('footer.links.service1.content.term2.title'),
    content: [
        { text: t('footer.links.service1.content.term2.row1') },
        { text: t('footer.links.service1.content.term2.row2') },
        { text: t('footer.links.service1.content.term2.row3') },
        { text: t('footer.links.service1.content.term2.row4') },
        { text: t('footer.links.service1.content.term2.row5') },
    ]
  },
  {
    item: t('footer.links.service1.content.term3.title'),
    content: [
        { text: t('footer.links.service1.content.term3.row1') },
        { text: t('footer.links.service1.content.term3.row2') },
        { text: t('footer.links.service1.content.term3.row3') },
        { text: t('footer.links.service1.content.term3.row4') },
        { text: t('footer.links.service1.content.term3.row5') },
        { text: t('footer.links.service1.content.term3.row6') },
        { text: t('footer.links.service1.content.term3.row7') },
        { text: t('footer.links.service1.content.term3.row8') },
    ]
  },
  {
    item: t('footer.links.service1.content.term4.title'),
    content: [
        { text: t('footer.links.service1.content.term4.row1') },
        { text: t('footer.links.service1.content.term4.row2') },
        { text: t('footer.links.service1.content.term4.row3') },
        { text: t('footer.links.service1.content.term4.row4') },
    ]
  },
  {
    item: t('footer.links.service1.content.term5.title'),
    content: [
        { text: t('footer.links.service1.content.term5.row1') },
        { text: t('footer.links.service1.content.term5.row2') },
        { text: t('footer.links.service1.content.term5.row3') },
        { text: t('footer.links.service1.content.term5.row4') },
        { text: t('footer.links.service1.content.term5.row5') },
        { 
          text: t('footer.links.service1.content.term5.row6'),
          children: [
            t('footer.links.service1.content.termA.row1'),
            t('footer.links.service1.content.termA.row2'),
            t('footer.links.service1.content.termA.row3'),
            t('footer.links.service1.content.termA.row4'),
          ]
        },
        { text: t('footer.links.service1.content.term5.row7') },
        { text: t('footer.links.service1.content.term5.row8') },
        { text: t('footer.links.service1.content.term5.row9') },
    ]
  },
  {
    item: t('footer.links.service1.content.term6.title'),
    content: [
        { text: t('footer.links.service1.content.term6.row1') },
        { text: t('footer.links.service1.content.term6.row2') },
        { text: t('footer.links.service1.content.term6.row3') },
        { text: t('footer.links.service1.content.term6.row4') },
    ]
  },
  {
    item: t('footer.links.service1.content.term7.title'),
    content: [
        { text: t('footer.links.service1.content.term7.row1') },
        { text: t('footer.links.service1.content.term7.row2') },
        { text: t('footer.links.service1.content.term7.row3') },
        { text: t('footer.links.service1.content.term7.row4') },
        { text: t('footer.links.service1.content.term7.row5') },
        { text: t('footer.links.service1.content.term7.row6') },
    ]
  },
  {
    item: t('footer.links.service1.content.term8.title'),
    content: [
        { text: t('footer.links.service1.content.term8.row1') },
        { text: t('footer.links.service1.content.term8.row2') },
        { text: t('footer.links.service1.content.term8.row3') },
        { text: t('footer.links.service1.content.term8.row4') },
        { text: t('footer.links.service1.content.term8.row5') },
        { text: t('footer.links.service1.content.term8.row6') },
    ]
  },
  {
    item: t('footer.links.service1.content.term9.title'),
    content: [
        { 
          text: t('footer.links.service1.content.term9.row1'),
          children: [
            t('footer.links.service1.content.termB.row1'),
            t('footer.links.service1.content.termB.row2'),
          ] 
        },
        { text: t('footer.links.service1.content.term9.row2') },
        { text: t('footer.links.service1.content.term9.row3') },
    ],
  },
])

</script>