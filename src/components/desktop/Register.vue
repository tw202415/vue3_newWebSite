<template>
  <div class="py-12 bg-[var(--primary-gradient)] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center mb-12">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {{ t('auth.register.title') }}
        </h2>
      </div>

      <div class="bg-white mt-10 max-w-lg mx-auto rounded-xl shadow-md overflow-hidden p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          
          <!-- 姓名 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.name') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.name"
              type="text"
              @blur="formErrors.name = validateChineseName(registerForm.name)"
              required
              :placeholder="t('auth.namePlaceholder')"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 dark:text-white transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.name }"
            />
            <p v-if="formErrors.name" class="mt-1 text-sm text-red-500">
              {{ formErrors.name }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.nameHint') }}
            </p>
          </div>

          <!-- 信箱 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.email') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              :placeholder="t('auth.emailPlaceholder')"
              @blur="formErrors.email = validateEmail(registerForm.email)"
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              ]"
              required
            />
            <p v-if="formErrors.email" class="mt-1 text-sm text-red-600">{{ formErrors.email }}</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.emailHint') }}
            </p>
          </div>

          <!-- 密碼 --> 
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.password') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              @blur="formErrors.password = validatePassword(registerForm.password)"
              required
              :placeholder="t('auth.passwordPlaceholder')"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.password }"
            />
            <p v-if="formErrors.password" class="mt-1 text-sm text-red-500">
              {{ formErrors.password }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.passwordHint') }}
            </p>
          </div>

          <!-- 確認密碼 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.confirmPassword') }}
            </label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              @blur="formErrors.confirmPassword = validateConfirmPassword(registerForm.confirmPassword)"
              @input="clearConfirmPasswordError"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.confirmPassword }"
            />
            <p v-if="formErrors.confirmPassword" class="mt-1 text-sm text-red-500">
              {{ formErrors.confirmPassword }}
            </p>
          </div>

          <!-- 身分證字號 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.idNumber') }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.idNumber"
              type="text"
              maxlength="10"
              required
              @input="onIdNumberChange"
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.idNumber }"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.idNumberHint') }}
            </p>
            <p v-if="formErrors.idNumber" class="mt-1 text-sm text-red-500">
              {{ formErrors.idNumber }}
            </p>
          </div>

          <!-- 出生年月日 -->
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('auth.birthYear') }}<span class="text-red-500">*</span>
              </label>
              <select
                v-model="registerForm.birthYear"
                @change="formErrors.birthYear = registerForm.birthYear ? '' : '請選擇出生年'"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
                :class="{ 'border-red-500': formErrors.birthYear }"
              >
                <option value="" disabled selected>{{ t('auth.birthYear') }}</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('auth.birthMonth') }}<span class="text-red-500">*</span>
              </label>
              <select
                v-model="registerForm.birthMonth"
                @change="formErrors.birthMonth = registerForm.birthMonth ? '' : '請選擇出生月'"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
                :class="{ 'border-red-500': formErrors.birthMonth }"
              >
                <option value="" disabled selected>{{ t('auth.birthMonth') }}</option>
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('auth.birthDay') }}<span class="text-red-500">*</span>
              </label>
              <select
                v-model="registerForm.birthDay"
                @change="formErrors.birthDay = registerForm.birthDay ? '' : '請選擇出生日'"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
                :class="{ 'border-red-500': formErrors.birthDay }"
              >
                <option value="" disabled selected>{{ t('auth.birthDay') }}</option>
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
              </select>
            </div>
          </div>

          <!-- 手機號碼 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.mobile') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.mobile"
              type="tel"
              @blur="formErrors.mobile = validateMobile(registerForm.mobile)"
              @input="clearMobileError"
              maxlength="10"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.mobile }"
            />
            <p v-if="formErrors.mobile" class="mt-1 text-sm text-red-500">
              {{ formErrors.mobile }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.mobileHint') }}
            </p>
          </div>

          <!-- 電話號碼 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.phone') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.phone"
              type="tel"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.phone }"
            />
            <p v-if="formErrors.phone" class="mt-1 text-sm text-red-500">
              {{ formErrors.phone }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.phoneHint') }}
            </p>
          </div>

          <!-- 地址 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('auth.address') }}<span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerForm.address"
              type="text"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors duration-200"
              :class="{ 'border-red-500': formErrors.address }"
            />
            <p v-if="formErrors.address" class="mt-1 text-sm text-red-500">
              {{ formErrors.address }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ t('auth.addressHint') }}
            </p>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="bg-[var(--primary-button)] w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {{ t('auth.register.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/useI18n';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { t } = useI18n();
const { register } = useAuth();

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  idNumber: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  mobile: '',
  phone: '',
  address: ''
});

const formErrors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  idNumber: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  mobile: '',
  phone: '',
  address: ''
});

// Generate years (from current year to 1900)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

// Generate months (1-12)
const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Generate days (1-31)
const days = Array.from({ length: 31 }, (_, i) => i + 1);

// 清除確認密碼錯誤訊息
const clearConfirmPasswordError = () => {
  if (registerForm.password) {
    formErrors.confirmPassword = '';
  }
};

// 驗證出生日期
const validateBirthDate = () => {
  let hasError = false;
  
  if (!registerForm.birthYear) {
    formErrors.birthYear = '請選擇出生年';
    hasError = true;
  } else {
    formErrors.birthYear = '';
  }
  
  if (!registerForm.birthMonth) {
    formErrors.birthMonth = '請選擇出生月';
    hasError = true;
  } else {
    formErrors.birthMonth = '';
  }
  
  if (!registerForm.birthDay) {
    formErrors.birthDay = '請選擇出生日';
    hasError = true;
  } else {
    formErrors.birthDay = '';
  }
  
  return hasError;
};

// 清除手機號碼錯誤訊息
const clearMobileError = () => {
  if (formErrors.mobile) {
    formErrors.mobile = '';
  }
};

// 驗證台灣手機號碼
const validateMobile = (mobile) => {
  if (!mobile) return '請輸入手機號碼';
  if (!/^09\d{8}$/.test(mobile)) return '請輸入正確的手機號碼格式 (09開頭，共10碼)';
  return '';
};

// 驗證確認密碼是否一致
const validateConfirmPassword = (confirmPassword) => {
  if (!confirmPassword) return '請再次輸入密碼';
  if (confirmPassword !== registerForm.password) return '密碼不一致';
  return '';
};

// 驗證密碼格式 (6-16個字，需包含英文和數字)
const validatePassword = (password) => {
  if (!password) return '請輸入密碼';
  if (password.length < 6 || password.length > 16) return '密碼長度需為6-16個字';
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    return '密碼需包含英文和數字';
  }
  return '';
};

// 驗證中文姓名
const validateChineseName = (name) => {
  if (!name) return '請輸入姓名';
  if (!/^[\u4e00-\u9fa5]{2,10}$/.test(name)) return '姓名只能包含2-10個中文字';
  return '';
};

// 驗證電子郵件格式
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '請輸入電子郵件';
  if (!re.test(email)) return '請輸入有效的電子郵件格式';
  return '';
};

// 驗證台灣身分證字號
const validateIdNumber = (id) => {
  // 基本格式檢查
  if (!/^[A-Z][12]\d{8}$/.test(id)) {
    return '身分證字號格式不正確';
  }

  // 轉換英文字母為對應數字
  const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  const firstChar = id.charAt(0);
  const firstNum = letters.indexOf(firstChar) + 10;
  
  // 計算加權值
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const idArray = (firstNum.toString() + id.slice(1)).split('').map(Number);
  
  // 計算加權和
  const sum = idArray.reduce((acc, curr, index) => {
    return acc + (curr * weights[index]);
  }, 0);

  // 檢查是否為10的倍數
  if (sum % 10 !== 0) {
    return '身分證字號檢查碼錯誤';
  }

  return '';
};

// 監聽身分證字號變化
const onIdNumberChange = () => {
  if (!registerForm.idNumber) {
    formErrors.idNumber = '';
    return;
  }
  
  // 轉換為大寫
  registerForm.idNumber = registerForm.idNumber.toUpperCase();
  
  // 驗證
  formErrors.idNumber = validateIdNumber(registerForm.idNumber);
};

const handleRegister = async () => {
  // 驗證必填欄位
  let hasError = false;
  
  // 驗證手機號碼
  const mobileError = validateMobile(registerForm.mobile);
  if (mobileError) {
    formErrors.mobile = mobileError;
    hasError = true;
  } else {
    formErrors.mobile = '';
  }
  
  // 驗證出生日期
  const birthDateError = validateBirthDate();
  if (birthDateError) {
    hasError = true;
  }
  
  // 驗證確認密碼
  const confirmPasswordError = validateConfirmPassword(registerForm.confirmPassword);
  if (confirmPasswordError) {
    formErrors.confirmPassword = confirmPasswordError;
    hasError = true;
  } else {
    formErrors.confirmPassword = '';
  }
  
  // 驗證密碼
  const passwordError = validatePassword(registerForm.password);
  if (passwordError) {
    formErrors.password = passwordError;
    hasError = true;
  } else {
    formErrors.password = '';
  }
  
  // 驗證姓名
  const nameError = validateChineseName(registerForm.name);
  if (nameError) {
    formErrors.name = nameError;
    hasError = true;
  } else {
    formErrors.name = '';
  }
  
  // 驗證電子郵件
  const emailError = validateEmail(registerForm.email);
  if (emailError) {
    formErrors.email = emailError;
    hasError = true;
  } else {
    formErrors.email = '';
  }
  
  // 驗證密碼是否一致
  if (registerForm.password !== registerForm.confirmPassword) {
    formErrors.confirmPassword = '密碼不一致';
    hasError = true;
  } else {
    formErrors.confirmPassword = '';
  }

  // 驗證身分證字號
  if (registerForm.idNumber) {
    const error = validateIdNumber(registerForm.idNumber);
    if (error) {
      formErrors.idNumber = error;
      hasError = true;
    } else {
      formErrors.idNumber = '';
    }
  }
  
  // 如果有任何驗證錯誤，停止提交
  if (hasError) return;
  
  // 所有驗證通過，執行註冊
  try {
    await register(registerForm);
    // 註冊成功後跳轉到登入頁面
    //router.push('/login');
  } catch (error) {
    console.error('註冊失敗:', error);
  }
};
</script>

<style scoped>
/* 表單輸入框焦點樣式 */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* 按鈕懸停效果 */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}

/* 響應式調整 */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>