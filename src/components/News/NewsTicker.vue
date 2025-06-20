<template>
  <div class="news-ticker-wrapper">
    <div class="news-ticker">
      <swiper
        :modules="[Autoplay, Navigation]"
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :direction="'vertical'"
        :centeredSlides="true"
        :autoplay="{ delay: 300000, disableOnInteraction: false }"
        :navigation="navigationOptions"
        :freeMode="true"
        class="news-content"
      >
        <!-- ✅ 使用 index 當 key -->
        <swiper-slide v-for="(news, index) in newsList" :key="index">
          <div class="news1">
            <NewsCard :news="news" @click="openNews" />
          </div>
        </swiper-slide>
      </swiper>

      <!-- 上下箭頭 -->
      <button class="newsUp"></button>
      <button class="newsDown"></button>

      <!-- 全部按鈕 -->
      <router-link to="/news" class="allnews">全部</router-link>

      <!-- 對話框 -->
      <NewsDialog ref="newsDialogRef" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import { getAnnouncements } from "@/apis/CMSAPI" // ✅ 改成正式 API
import NewsDialog from "@/components/Common/NewsDialog.vue"
import NewsCard from "@/components/Common/NewsCard.vue"

const newsList = ref([])
const newsDialogRef = ref(null)

const navigationOptions = {
  nextEl: ".newsDown",
  prevEl: ".newsUp"
}

const fetchNews = async () => {
  try {
    newsList.value = await getAnnouncements()
    
  } catch (error) {
    console.error("無法取得新聞資料:", error.message)
    newsList.value = []
  }
}

const openNews = (news) => {
  newsDialogRef.value?.openDialog(news.title, news.content)
}

onMounted(fetchNews)
</script>

<style scoped>
.news-ticker-wrapper {
  height: 550px;
  width: 600px;
  position: relative;
}

.news-ticker {
  position: absolute;
  margin: 0 auto;
  height: 100%;
  transition: all 0.5s;
}

.news-content {
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.news1 {
  width: 100%;
}

.allnews {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-weight: bold;
}
</style>
