<template>
  <div class="min-h-screen bg-gray-900 pb-20 safe-area-pb">
    <div class="max-w-md mx-auto px-2 pt-14 pb-6 m-5">
      <h1 class="text-2xl font-bold text-cyan-400 font-mono tracking-wide text-center w-full">
        {{ t('footer.links.service1.title') }}
      </h1>
      <h2 class="text-lg font-bold text-gray-300 mb-2 font-mono tracking-wide text-left w-full">
        {{ t('footer.links.service1.content.header') }}
      </h2>
      <div 
        v-for="(item, index) in termsItems"
        :key="index"
        class="bg-gray-800/80 rounded-lg border border-cyan-500/20 shadow mb-4 overflow-hidden p-4"
      >
        <div class="p-4 pt-2 border-t border-cyan-500/10">
          <p class="mt-2 font-bold text-base text-gray-200">
            {{ item.item }}
          </p>
          <p v-if="index === 0" class="mt-1 font-bold text-sm text-gray-200">
            {{ t('footer.links.service1.content.term1.row') }}
          </p>
          <div class="mt-1 space-y-1">
            <div v-for="(i, idx) in item.content" :key="idx">
              <span class="text-gray-400 text-sm">{{ idx + 1 }}.{{ i.text }}</span>
              <ul v-if="i.children" class="pl-4 mt-1 list-disc text-cyan-300 text-xs">
                <li v-for="(detail, dIdx) in i.children" :key="dIdx">{{ detail }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

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