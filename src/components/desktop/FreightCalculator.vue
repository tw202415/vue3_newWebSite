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
                    COLLECTION
                  </span>
                </h2>
                <h3 class="text-4xl font-bold mb-4">
                  <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    {{ t('consolidated.title') }}
                  </span>
                </h3>
              </div>
              <div class="col-space-R">
                <div class="col-bg"></div>
                <div class="col-p text-white">
                  <p>{{ t('consolidated.overview') }}</p>
                </div>
              </div>
            </div>
            <div class="m-2 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900 p-6">
            <table class="index-table col">
              <tbody>
                <!-- 集貨站選擇 -->
                <tr>
                  <th>集貨站：</th>
                  <td>
                    <ul style="display: flex; gap: 12px; list-style: none; padding: 0; margin: 0;">
                      <li v-for="(station, index) in stations" :key="index">
                        <label>
                          <input type="radio" name="colplace" v-model="selectedStation" :value="station.value" />
                          {{ station.label }}
                        </label>
                      </li>
                    </ul>
                  </td>
                </tr>
                <!-- 實重 -->
              <tr>
                <th>實重：</th>
                <td>
                  <input
                        v-model="realWeight"
                        inputmode="numeric"
                        type="tel"
                        maxlength="3"
                        pattern="[0-9]*"
                        placeholder="實重"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                  <span>{{ weightUnit }}</span>
                </td>
              </tr>

              <!-- 材積重 -->
              <tr>
                <th>材積重：</th>
                <td>
                  <ul style="display: flex; gap: 12px; list-style: none; padding: 0; margin: 0;">
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        v-model="length"
                        inputmode="numeric"
                        type="tel"
                        maxlength="5"
                        pattern="[0-9]*"
                        placeholder="長"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <span>×</span>
                    </li>
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        v-model="width"
                        inputmode="numeric"
                        type="tel"
                        maxlength="5"
                        pattern="[0-9]*"
                        placeholder="寬"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <span>×</span>
                    </li>
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        v-model="height"
                        inputmode="numeric"
                        type="tel"
                        maxlength="5"
                        pattern="[0-9]*"
                        placeholder="高"
                        class="w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <span>{{ volumeFormulaText }}</span>
                    </li>
                    <li style="display: inline-flex; align-items: center;">
                      <input
                        :value="calculatedVolumeWeight"
                        type="text"
                        disabled
                        class=" w-32 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <span>{{ weightUnit }}</span>
                    </li>
                    <li style="display: inline-flex; align-items: center;"><span>(尺寸單位為公分)</span></li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- 運費計算結果 -->
          <div v-if="feeResult" class="m-2">
            <table class="index-table result-table same-style">
              <thead>
                <tr>
                  <th rowspan="2">集貨站</th>
                  <th
                    :colspan="feeResult.warehouses[0].methods.length"
                    v-for="warehouse in feeResult.warehouses"
                    :key="warehouse.warehouseName"
                  >
                    {{ warehouse.warehouseName }}
                  </th>
                </tr>
                <tr>
                  <template v-for="warehouse in feeResult.warehouses" :key="warehouse.warehouseName + '-methods'">
                    <th v-for="method in warehouse.methods" :key="method.methodName">
                      {{ method.methodName }}
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>集貨幣運費</td>
                  <template v-for="warehouse in feeResult.warehouses" :key="warehouse.warehouseName + '-coin'">
                    <td v-for="method in warehouse.methods" :key="method.methodName + '-coin'">
                      <span v-if="method.feesByPayment.Coin.available">
                        {{ method.feesByPayment.Coin.cost }} 元
                      </span>
                      <span v-else class="unavailable">
                        {{ method.feesByPayment.Coin.message }}
                      </span>
                    </td>
                  </template>
                </tr>
                <tr>
                  <td>信用卡運費</td>
                  <template v-for="warehouse in feeResult.warehouses" :key="warehouse.warehouseName + '-cc'">
                    <td v-for="method in warehouse.methods" :key="method.methodName + '-cc'">
                      <span v-if="method.feesByPayment.CreditCard.available">
                        {{ method.feesByPayment.CreditCard.cost }} 元
                      </span>
                      <span v-else class="unavailable">
                        {{ method.feesByPayment.CreditCard.message }}
                      </span>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 按鈕 -->
          <div class="text-center">
            <button class="m-5 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200" @click="resetForm">重新填寫</button>
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200" @click="fetchShippingFee">下一步</button>
          </div>
          <BaseDialog v-if="showDialog" :message="dialogMessage" @close="showDialog = false" />

          <!-- 注意事項 -->
          <div class="rounded-xl shadow-lg bg-black bg-opacity-50 text-white dark:bg-gray-900 p-6">
            <p class="text-lg text-orange-500 font-bold">{{ t('notice.notice') }}</p>
            <p>1. {{ t('notice.row1') }}</p>
            <p>2. {{ t('notice.row2') }}</p>
            <p>3. {{ t('notice.row3') }}</p>
            <p>4. {{ t('notice.row4') }}</p>
            <p>5. {{ t('notice.row5') }}</p>
            <p>6. {{ t('notice.row6') }}</p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getCalculatorNotice,calculateShippingFee  } from '@/apis/CMSAPI'
import { useI18n } from '@/composables/useI18n';
import BaseDialog from '@/components/common/BaseDialog.vue'

const { t } = useI18n();

// 集貨站選項
const stations = ref([
  { label: "大陸", value: 1, noticeId: 99251 },
  { label: "日本", value: 2, noticeId: 99253 },
  { label: "韓國", value: 3, noticeId: 99255 },
  { label: "美國", value: 4, noticeId: 99256 },
  { label: "德國", value: 5, noticeId: 99258 }
])

// 表單資料
const selectedStation = ref(null)
const realWeight = ref(0)
const length = ref(0)
const width = ref(0)
const height = ref(0)
const noticeHtml = ref("")
const feeResult = ref(null)
const showDialog = ref(false)
const dialogMessage = ref('')


const isUSA = computed(() => selectedStation.value === 4)

const weightUnit = computed(() => isUSA.value ? 'lbs' : 'KG')

const volumeFormulaText = computed(() => isUSA.value ? '÷ 6000 × 2.2 =' : '÷ 6000 =')


const fetchShippingFee = async () => {
  try {
    // 🧾 使用使用者實際填入的欄位
    const payload = {
      countryId: selectedStation.value,
      actualWeight: realWeight.value,
      length: length.value,
      width: width.value,
      height: height.value
    }
    console.log('payload:', payload)

    // 防呆：欄位未填寫就中止
    if (!selectedStation.value) {
      dialogMessage.value = '請選擇集貨站'
      showDialog.value = true
      return
    }
    if (!realWeight.value || !length.value || !width.value || !height.value) {
      dialogMessage.value = '請完整填寫所有重量與尺寸'
      showDialog.value = true
      return
    }


    const res = await calculateShippingFee(payload)
    feeResult.value = res
    console.log('✅ 成功接收到 feeResult:', res)
  } catch (error) {
    console.error('🔥 API 錯誤:', error)
    dialogMessage.value = error.message || '試算失敗'
    showDialog.value = true
  }
}

// 計算邏輯
const calculatedVolumeWeight = computed(() => {
  const volume = (length.value * width.value * height.value) / 6000
  const result = isUSA.value ? volume * 2.2 : volume
  return result.toFixed(2)
})

// 清除表單
const resetForm = () => {
  selectedStation.value = null
  realWeight.value = 0
  length.value = 0
  width.value = 0
  height.value = 0
  feeResult.value = null // 🧽 清除試算結果，讓表格區塊自動消失
}

// 注意事項隨選項變動
watch(selectedStation, async (newVal) => {
  const station = stations.value.find(s => s.value === newVal)
  if (!station || !station.noticeId) {
    noticeHtml.value = ''
    return
  }

  try {
    const htmlRaw = await getCalculatorNotice(station.noticeId)
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
    noticeHtml.value = ''
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