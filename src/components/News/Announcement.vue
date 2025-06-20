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
    <div class="relative min-h-[100px]">
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
              
              <!-- 公告內容 -->
              <div class="text-gray-300 leading-relaxed">
                <p v-if="announcement.content" class="mb-3">{{ announcement.content }}</p>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 導航按鈕 -->
    <div class="flex items-center justify-between mt-6">
      <!-- 左箭頭 -->
      <button 
        @click="previousAnnouncement"
        :disabled="currentIndex === 0"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft :size="20" />
      </button>

      <!-- 指示器 -->
      <div class="flex space-x-2">
        <button
          v-for="(_, index) in newsList"
          :key="index"
          @click="goToAnnouncement(index)"
          :class="[
            'w-2 h-2 rounded-full transition-colors',
            currentIndex === index ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
          ]"
        />
      </div>

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
    <div class="flex items-center justify-center mt-4">
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
import type { Announcement } from '@/types'

const newsList = ref<Announcement[]>([])
const page = ref(1)
const pageSize = 10
const newsDialogRef = ref(null)

// ✅ 抓資料（不補 id）
const getAnnouncementsData = async () => {
  try {
    // This should be replaced with actual API call
    // newsList.value = await getAnnouncements()
    
    // Temporary mock data for demonstration
    newsList.value = [
      {
        icon: '📢',
        title: '系統維護通知',
        date: '2024-01-15',
        content: '系統將於本週末進行維護升級，屆時服務可能暫時中斷。'
      },
      {
        icon: '🎉',
        title: '新功能上線',
        date: '2024-01-10',
        content: '我們很高興宣布新的物流追蹤功能已經上線！'
      }
    ]
    
    console.log(newsList.value)
  } catch (error) {
    console.error("無法取得新聞資料:", error)
    newsList.value = []
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

// 獲取優先級樣式
const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/20 text-red-300 border border-red-500/30'
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
    case 'low':
      return 'bg-green-500/20 text-green-300 border border-green-500/30'
    default:
      return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
  }
}

// 獲取優先級文字
const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high':
      return '重要'
    case 'medium':
      return '一般'
    case 'low':
      return '通知'
    default:
      return '公告'
  }
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

// ✅ 開啟對話框
const openNews = (news: Announcement) => {
  newsDialogRef.value?.openDialog(news.title, news.content)
}

// 組件掛載時開始自動播放
onMounted(() => {
  getAnnouncementsData()
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