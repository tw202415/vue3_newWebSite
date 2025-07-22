<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="text-8xl mb-4">{{ countryInfo.flag }}</div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ countryInfo.name }}{{ t('shopping.shop.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ t(`shopping.countries.${country}.description`) }}
        </p>
      </div>
      
      <!-- Search Bar -->
      <div class="mb-6">
        <div class="flex gap-2 max-w-2xl">
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('shopping.search')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              @keyup.enter="fetchProducts"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            @click="queryProducts(searchQuery, '')"
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            {{ t('shopping.search') }}
          </button>
        </div>
      </div>

      <!-- Category Navigation -->
      <div class="mb-12">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            {{ t('shopping.categories.title') }}
          </h2>
          <div class="relative">
            <div class="flex space-x-1 overflow-x-auto pb-2">
              <button
              v-for="category in categories"
              :key="category.id"
              @click="queryProducts('', category.id)"
              :class="[
                'whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              {{ t(`shopping.categories.${category.id}`) }}
            </button>
          </div>
          
        </div>
      </div>

        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <!-- Hot Products Toggle -->
          <button
            @click="showHotOnly = !showHotOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              showHotOnly
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'border-gray-200 hover:bg-gray-50'
            ]"
          >
            🔥 熱銷商品
          </button>
          <button
            @click="show24HOnly = !show24HOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              show24HOnly
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            ⚡ 24H出貨
          </button>
          <button
            v-if="isAuthenticated && currentUser?.isVip"
            @click="showVipOnly = !showVipOnly"
            :class="[
              'px-4 py-2 rounded-lg border transition-colors duration-200',
              showVipOnly
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            👑 VIP專屬
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :country-info="countryInfo"
          class="cursor-pointer hover:shadow-lg transition-hover:-translate-y-1 duration-200"
          @click="toProductDetail(product.productId, country)"
        />
      </div>
      <div ref="loadMoreTrigger" style="height: 1px;"></div>
      <div class="w-full text-center py-4">
        <span v-if="isLoading">載入中...</span>
        <span v-else-if="!hasMore">已經到最底部了喔!!</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router'
import ProductCard from '@/components/shared/ProductCard.vue';
import type { EnhancedProduct } from '@/types';
import { getProducts } from '@/apis/CMSAPI';
import { useInfiniteScroll } from '@vueuse/core'

interface Props {
  country: string;
}

const props = defineProps<Props>();
const { t } = useI18n();
const { isAuthenticated, currentUser, initAuth } = useAuth();
const router = useRouter()

const selectedCategory = ref('');
const products = ref([]);
const showHotOnly = ref(false);
const show24HOnly = ref(false);
const showVipOnly = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(12);
const isLoading = ref(false);
const loadMoreTrigger = ref(null)
const hasMore = ref(true)


const loadMore = async () => {
  if (isLoading.value || !hasMore.value) return;

  const payload = {
    country: props.country,
    name: searchQuery.value,
    categoryId: selectedCategory.value,
    page: ++currentPage.value,
    size: pageSize.value
  }

  const newProducts = await getProducts(payload);
  products.value.push(...newProducts);
  
  // 判斷是否還有更多資料
  if (newProducts.length < pageSize.value) {
    hasMore.value = false // 沒資料了，不再觸發 loadMore
  } 

};


useInfiniteScroll(
  loadMoreTrigger,
  loadMore,
  { distance: 100 }
)

// 查詢第一頁
const queryProducts = async (name: string, categoryId: number) => {
  selectedCategory.value = categoryId;
  hasMore.value = true;
  currentPage.value = 1;
  const payload = {
    country: props.country,
    name: name,
    categoryId: categoryId,
    page: currentPage.value,
    size: pageSize.value
  }
  try {
    const response = await getProducts(payload)
    products.value = response;
  } catch (error) {
    console.error(error)
  }
  
}

const toProductDetail = (productId: string, country: string) => {
  router.push({
    name: 'ProductDetail', // 請替換為您的商品詳情頁路由名稱
    params: { 
      id: productId,
      country: country
    }
  })
}

const countryInfo = computed(() => {
  const countries = {
    japan: { name: '日本', flag: '🇯🇵', currency: 'JPY' },
    korea: { name: '韓國', flag: '🇰🇷', currency: 'KRW' },
    germany: { name: '德國', flag: '🇩🇪', currency: 'EUR' }
  };
  return countries[props.country as keyof typeof countries] || countries.japan;
});

const categories = [
  { id: 1, name: '3C' },
  { id: 2, name: '周邊' },
  { id: 3, name: '筆電' },
  { id: 4, name: '通訊' },
  { id: 5, name: '數位' },
  { id: 6, name: '家電' },
  { id: 7, name: '日用' },
  { id: 8, name: '母嬰' },
  { id: 9, name: '食品' },
  { id: 10, name: '生活' },
  { id: 11, name: '居家' },
  { id: 12, name: '休閒' },
  { id: 13, name: '保健' },
  { id: 14, name: '美妝' },
  { id: 15, name: '時尚' },
  { id: 16, name: '書店' }
];

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Hot products filter
  if (showHotOnly.value) {
    filtered = filtered.filter(product => product.isHot);
  }

  // 24H shipping filter
  if (show24HOnly.value) {
    filtered = filtered.filter(product => product.is24hshipping);
  }

  // VIP only filter
  if (showVipOnly.value) {
    filtered = filtered.filter(product => product.isVipOnly);
  }

  return filtered;
});

onMounted(() => {
  initAuth();
  queryProducts('', null);
});
</script>
