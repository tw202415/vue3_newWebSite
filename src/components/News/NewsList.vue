<template>
  <section class="index-banner">
    <!-- 新聞清單 -->
    <NewsCard
      v-for="(news, index) in displayedNews"
      :key="index"
      :news="news"
      @click="openNews"
    />

    <!-- 分頁 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">＜</button>
      <span>第 {{ page }} 頁 / 共 {{ totalPages }} 頁</span>
      <button @click="nextPage" :disabled="!hasMore">＞</button>
    </div>

    <!-- 對話框 -->
    <NewsDialog ref="newsDialogRef" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { getAnnouncements } from "@/apis/CMSAPI"
import NewsDialog from "../Common/NewsDialog.vue"
import NewsCard from "../Common/NewsCard.vue"

const newsList = ref([])
const page = ref(1)
const pageSize = 10
const newsDialogRef = ref(null)

// ✅ 抓資料（不補 id）
const fetchNews = async () => {
  try {
    newsList.value = await getAnnouncements()
  } catch (error) {
    console.error("無法取得新聞資料:", error.message)
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

// ✅ 開啟對話框
const openNews = (news) => {
  newsDialogRef.value?.openDialog(news.title, news.content)
}

onMounted(fetchNews)
</script>
