<template>
  <div class="bg-white/5 border border-white/10 rounded-lg p-6 text-gray-200 relative overflow-hidden">
    <!-- 標題 -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold">📢 最新公告</h2>
      <div class="flex items-center space-x-2 text-sm text-gray-400">
        <span>{{ currentIndex + 1 }} / {{ newsList.length }}</span>
      </div>
    </div>

    <!-- 公告內容區域 -->
    <div class="relative min-h-[100px] overflow-hidden">
      <!-- 公告內容 -->
      <div 
        class="transition-all duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="flex">
          <div 
            v-for="(announcement, index) in newsList" 
            :key="index"
            class="w-full flex-shrink-0 px-2"
          >
            <div class="space-y-4">
              <!-- 公告標題 -->
              <h3 class="text-lg font-semibold text-blue-300 flex items-center">
                <span class="mr-2">{{ announcement.icon }}</span>
                {{ announcement.title }}
              </h3>
              
              <!-- 公告日期 -->
              <p class="text-sm text-gray-400">
                📅 {{ announcement.date }}
              </p>
              
              <!-- 公告內容 
              <div class="text-gray-300 leading-relaxed">
                <p v-if="announcement.content" class="mb-3">{{ announcement.content }}</p>
                
              </div> -->
              <!-- more -->
              <button
                  @click="openNews(announcement)"
                  class="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 transition-all duration-200 text-sm font-medium border border-blue-500/30 hover:border-blue-400/50"
                >
                  <span>More</span>
                  <ChevronRight :size="14" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 彈出視窗 Modal -->
  <div 
    v-if="showModal" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
    
    <!-- Modal 內容 -->
    <div 
      class="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
      @click.stop
    >
      <!-- 關閉按鈕 -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
      >
        <X :size="18" />
      </button>

      <!-- Modal 標題 -->
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-3">📢</span>
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">
            {{ selectedNews?.title }}
          </h2>
          <p class="text-gray-400 text-sm" v-if="selectedNews?.created_at">
            📅 {{ formatDate(selectedNews.created_at) }}
          </p>
        </div>
      </div>

      <!-- 完整內容 -->
      <div class="text-gray-200 leading-relaxed space-y-4">
        <div v-if="selectedNews?.content" class="text-lg" v-html="selectedNews.content">
        </div>
        
      </div>

      <!-- Modal 底部按鈕 -->
      <div class="flex justify-end mt-8 space-x-3">
        <button
          @click="closeModal"
          class="px-6 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
        >
          關閉
        </button>
      </div>
    </div>
  </div>

    <!-- 導航按鈕 -->
    <div class="flex items-center justify-between mt-6" v-if="newsList.length > 0">
      <!-- 左箭頭 -->
      <button 
        @click="previousAnnouncement"
        :disabled="currentIndex === 0"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft :size="20" />
      </button>

      <!-- 指示器 
      <div class="flex space-x-2">
        <button
          v-for="(_, index) in newsList.value"
          :key="index"
          @click="goToAnnouncement(index)"
          :class="[
            'w-2 h-2 rounded-full transition-colors',
            currentIndex === index ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
          ]"
        />
      </div> -->

      <!-- 右箭頭 -->
      <button 
        @click="nextAnnouncement"
        :disabled="currentIndex === newsList.length - 1"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <!-- 自動播放控制 -->
    <div class="flex items-center justify-center mt-4" v-if="newsList.length > 0">
      <button
        @click="toggleAutoPlay"
        class="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
      >
        <component :is="isAutoPlay ? Pause : Play" :size="14" />
        <span>{{ isAutoPlay ? '暫停' : '播放' }}</span>
      </button>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-vue-next'
import { getAnnouncements } from '@/apis/CMSAPI'

const newsList = ref([])
const page = ref(1)
const pageSize = 10

// Modal 相關
const showModal = ref(false)
const selectedNews = ref(null)

// ✅ 抓資料（不補 id）
const announcements = async () => {
  try {
    const response = await getAnnouncements()
    newsList.value = response
  } catch (error) {
    console.error("無法取得新聞資料:", error.message)
  }
}

// ✅ 分頁邏輯
const totalPages = computed(() =>
  Math.ceil(newsList.value.length / pageSize)
)

const displayedNews = computed(() => {
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  return newsList.value.slice(start, end)
})

const hasMore = computed(() => page.value < totalPages.value)

const prevPage = () => {
  if (page.value > 1) page.value--
}

const nextPage = () => {
  if (hasMore.value) page.value++
}

// 當前顯示的公告索引
const currentIndex = ref(0)

// 自動播放相關
const isAutoPlay = ref(true)
const autoPlayInterval = ref<NodeJS.Timeout | null>(null)

// 切換到上一個公告
const previousAnnouncement = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// 切換到下一個公告
const nextAnnouncement = () => {
  if (currentIndex.value < newsList.value.length - 1) {
    currentIndex.value++
  } else if (isAutoPlay.value) {
    // 自動播放時循環到第一個
    currentIndex.value = 0
  }
}

// 跳轉到指定公告
const goToAnnouncement = (index: number) => {
  currentIndex.value = index
}

// 切換自動播放
const toggleAutoPlay = () => {
  isAutoPlay.value = !isAutoPlay.value
  if (isAutoPlay.value) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
}

// 開始自動播放
const startAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  autoPlayInterval.value = setInterval(() => {
    nextAnnouncement()
  }, 5000) // 每5秒切換一次
}

// 停止自動播放
const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// 關閉 Modal
const closeModal = () => {
  showModal.value = false
  selectedNews.value = null
  // 恢復自動播放
  if (isAutoPlay.value) {
    startAutoPlay()
  }
}

// ✅ 開啟對話框
const openNews = (news) => {
  selectedNews.value = news
  showModal.value = true
  // 暫停自動播放
  if (isAutoPlay.value) {
    stopAutoPlay()
  }
}
onMounted(announcements)

// 組件掛載時開始自動播放
onMounted(() => {
    
    if (isAutoPlay.value) {
        startAutoPlay()
    }
})



// 組件卸載時清理定時器
onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* 自定義滾動條樣式 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>