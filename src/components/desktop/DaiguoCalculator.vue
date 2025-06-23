<template>
  <div :class="noWrap ? '' : 'wrap index-wrap'">
    <section class="index-collection mb-16">
      <div class="col-left">
        <div class="col-space-L">
          <div class="calcu-before">
            <div class="col-right">
              <div class="col-tit-pos">
                <h2 class="text-4xl font-bold mb-4">
                  <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Diaguo
                  </span>
                </h2>
                <h3 class="text-4xl font-bold mb-4">
                  <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    {{ t('proxyPurchase.title') }}
                  </span>
                </h3>
              </div>
              <div class="col-space-R">
                <div class="col-bg"></div>
                <div class="col-p text-white">
                  <p>{{ t('proxyPurchase.overview') }}</p>
                </div>
              </div>
            </div>
            <div class="m-2 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900 p-6">
            <table class="index-table col">
              <tbody>
                <tr>
                  <th>國家：</th>
                  <td>
                    <ul style="display: flex; gap: 12px; list-style: none; padding: 0; margin: 0;">
                      <li v-for="(country, index) in countries" :key="index">
                        <label>
                          <input type="radio" name="daiplace" v-model="selectedCountry" :value="country.value" />
                          {{ country.label }}
                        </label>
                      </li>
                    </ul>
                  </td>
                </tr>
              <tr>
                <th>商品購買金額：</th>
                <td>
                  <input
                        v-model="purchaseAmount"
                        inputmode="numeric"
                        type="tel"
                        pattern="[0-9]*"
                        placeholder="購買金額"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                  <span>{{ selectedCurrency }}</span>
                </td>
              </tr>
              <tr>
                <th>預估當地運費：</th>
                <td>
                  <ul style="display: flex; gap: 12px; list-style: none; padding: 0; margin: 0;">
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        v-model="localFreight"
                        inputmode="numeric"
                        type="tel"
                        pattern="[0-9]*"
                        placeholder="當地運費"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <span>{{ selectedCurrency }}</span>
                    </li>
                    <li><span>(購買後送至集貨站的運費)</span></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>銀行轉帳手續費：</th>
                <td>
                  <ul style="display: flex; align-items: center; gap: 12px; list-style: none; padding: 0; margin: 0;">
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        :value="calculatedTransferFee"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                        type="tel"
                        disabled
                      />
                    <span class="text-muted">{{ selectedCurrency }}</span>
                    </li>
                    <li><span>(當地銀行轉帳給賣家費用)</span></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>代購服務費：</th>
                <td>
                  <ul style="display: flex; align-items: center; gap: 12px; list-style: none; padding: 0; margin: 0;">
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        :value="calculatedServiceFee"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                        type="tel"
                        disabled
                      />
                    <span class="text-muted">{{ selectedCurrency }}</span>
                    </li>
                    <li><span>(集貨網收取費用)</span></li>
                  </ul>
                </td>
              </tr>
              <tr class="calcu-after" :style="{ display: isSubmitted ? 'table-row' : 'none' }">
                  <th class="th_3">預估台幣費用：</th>
                  <td>{{ totalAmountTWD }} 台幣（集貨幣扣款）</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- 按鈕 -->
          <div class="text-center">
            <button class="m-5 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200" @click="resetForm">重新填寫</button>
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200" v-if="!isSubmitted" @click="submitForm">下一步</button>
          </div>
          <BaseDialog v-if="showDialog" :message="dialogMessage" @close="showDialog = false" />

          <!-- 注意事項 -->
          <div class="rounded-xl shadow-lg bg-black bg-opacity-50 text-white dark:bg-gray-900 p-6">
            <p class="text-lg text-orange-500 font-bold">{{ t('notice.notice') }}</p>
            <p>1. {{ t('notice.row7') }}</p>
            <p>2. {{ t('notice.row8') }}</p>
            <p>3. {{ t('notice.row9') }}</p>
            <p>4. {{ t('notice.row10') }}</p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCalculatorNotice, getPurchaseSettings } from '@/apis/CMSAPI'
import { useI18n } from '@/composables/useI18n';
import BaseDialog from '@/components/Common/BaseDialog.vue'

const { t } = useI18n();
const countries = ref([
  { label: '日本', value: 'JP', currency: '日幣', idCompany: 'S4' },
  { label: '韓國', value: 'KR', currency: '韓元', idCompany: 'S7' },
  { label: '美國', value: 'US', currency: '美金', idCompany: 'S8' },
  { label: '德國', value: 'EU', currency: '歐元', idCompany: 'S13' }
])

const selectedCountry = ref(null)
const purchaseAmount = ref(0)
const localFreight = ref(0)
const isSubmitted = ref(false)
const feeMap = ref({})
const noticeHtml = ref("")
const showDialog = ref(false)
const dialogMessage = ref("")
const noticeId = 99261 // 代購頁用的 ID

const selectedCurrency = computed(() => {
  const c = countries.value.find(c => c.value === selectedCountry.value)
  return c ? c.currency : '請選擇國家'
})

const selectedConfig = computed(() => {
  const c = countries.value.find(c => c.value === selectedCountry.value)
  return c ? feeMap.value[c.idCompany] || {
    transferFee: 0,
    serviceFee: 0,
    currency: '',
    exchangeRate: 0
  } : { transferFee: 0, serviceFee: 0, currency: '', exchangeRate: 0 }
})

const calculatedTransferFee = computed(() => selectedConfig.value.transferFee)
const calculatedServiceFee = computed(() => selectedConfig.value.serviceFee)

const totalAmount = computed(() => {
  const total =
    Number(purchaseAmount.value || 0) +
    Number(localFreight.value || 0) +
    Number(calculatedTransferFee.value || 0) +
    Number(calculatedServiceFee.value || 0);

  return total.toFixed(2);
})

const totalAmountTWD = computed(() => {
  const rate = selectedConfig.value.exchangeRate || 0
  const totalForeign = Number(purchaseAmount.value) +
    Number(localFreight.value) +
    Number(selectedConfig.value.transferFee) +
    Number(selectedConfig.value.serviceFee)
  return Math.round(totalForeign * rate) // 取整數
})


const submitForm = () => {
  if (!selectedCountry.value) {
    dialogMessage.value = '請選擇國家'
    showDialog.value = true
    return
  }
  if (!purchaseAmount.value || purchaseAmount.value <= 0) {
    dialogMessage.value = '請輸入購買金額'
    showDialog.value = true
    return
  }
  isSubmitted.value = true
}

const resetForm = () => {
  selectedCountry.value = null
  purchaseAmount.value = 0
  localFreight.value = 0
  isSubmitted.value = false
}

onMounted(async () => {
  try {
    const settings = await getPurchaseSettings()
    const map = {}
    settings.forEach(item => {
      map[item.idCompany] = {
        transferFee: item.transferFee,
        serviceFee: item.serviceFee,
        currency: item.currency,
        exchangeRate: item.exchangeRate
      }
    })
    feeMap.value = map
  } catch (err) {
    console.error('載入費率失敗', err)
  }

  try {
    const htmlRaw = await getCalculatorNotice(noticeId)
    let html = htmlRaw.htmlContent
    html = html
      .replace(/elf-tixing-ol/g, 'precaution')
      .replace(/title/g, 'pre-tit')
      .replace(/<span/g, '<div')
      .replace(/<\/span>/g, '</div>')
      .replace(/<i class/g, "<i style='display:none;' class")
    noticeHtml.value = html
  } catch (err) {
    console.error('載入注意事項失敗', err)
  }
})
</script>

<style scoped>
/* 讓試算結果表格跟填入表相同風格 */
.result-table.same-style {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 16px;
  overflow: hidden;
  background-color: #fff;
  font-size: 15px;
}

.result-table.same-style th,
.result-table.same-style td {
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.result-table.same-style th:last-child,
.result-table.same-style td:last-child {
  border-right: none;
}

.result-table.same-style thead th {
  background-color: #f9f4ea; /* 淡橘或米色 */
  font-weight: bold;
}

.result-table.same-style tbody tr:last-child td {
  border-bottom: none;
}

.result-table.same-style .unavailable {
  color: #999;
  font-style: italic;
}


</style>