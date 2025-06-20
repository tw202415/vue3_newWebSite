<template>
  <section class="subpage-banner">
    <Swiper
      :modules="[Autoplay, EffectFade]"
      effect="fade"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="true"
      class="swiper-banner"
    >
      <SwiperSlide v-for="(img, i) in images" :key="i">
        <div class="banner" :style="{ backgroundImage: `url(${img})` }"></div>
      </SwiperSlide>
    </Swiper>

    <!-- Banner 標題 -->
    <h2 class="banner-title titleFont">最新消息</h2>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"

const images = [
  "/image/subpage-banner/subpage_banner_1.png",
  "/image/subpage-banner/subpage_banner_2.png",
  "/image/subpage-banner/subpage_banner_3.png"
]
</script>

<style scoped>
.subpage-banner {
  position: relative;
  aspect-ratio: 6 / 1; /* ✅ 統一比例 */
  overflow: hidden;
  width: 100%;
}

.swiper-banner {
  width: 100%;
  height: 100%;
}

.banner {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 1s ease;
}

/* ✅ 新增縮放效果：上一張縮小 */
.swiper-slide-prev .banner {
  transform: scale(0.8);
}

/* Banner 標題 */
.banner-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}
</style>
