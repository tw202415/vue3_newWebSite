<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div 
      class="bg-white rounded-lg shadow-xl w-full max-w-md relative z-[61] mx-auto my-auto"
      style="max-height: 90vh; overflow-y: auto;"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isLoginMode ? t('auth.login.title') : t('auth.register.title') }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Login Form -->
        <form v-if="isLoginMode" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('auth.username') }}
            </label>
            <input
              v-model="loginForm.username"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-var(--color-text-gray-900) transition-colors duration-200"
              :placeholder="t('auth.usernamePlaceholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('auth.password') }}
            </label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-var(--color-text-gray-900) transition-colors duration-200"
              :placeholder="t('auth.passwordPlaceholder')"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ t('auth.login.submit') }}
          </button>
        </form>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              或使用以下方式繼續
            </span>
          </div>
        </div>
        <!-- Google 登入按鈕 -->
        <button
          @click="handleGoogleLogin"
          type="button"
          class="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span class="text-gray-700 font-medium">
            使用 Google 帳號登入
          </span>
        </button>


        <!-- Switch Mode -->
        <div class="mt-6 text-center">
          <button
            @click="handleRegister"
            class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            {{ t('auth.switchToRegister') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();
const { login, register } = useAuth();

const isLoginMode = ref(true);

const loginForm = reactive({
  username: '',
  password: ''
});

const closeModal = () => {
  emit('close');
  // Reset forms
  Object.assign(loginForm, { username: '', password: '' });
  isLoginMode.value = true;
};

const switchMode = () => {
  isLoginMode.value = !isLoginMode.value;
  // Clear forms when switching
  Object.assign(loginForm, { username: '', password: '' });
};

const handleLogin = async () => {
  const result = await login(loginForm);
  if (result.success) {
    closeModal();
  } else {
    alert(result.error || '登入失敗，請檢查您的帳號密碼');
  }
};

const router = useRouter();

const handleRegister = () => {
  router.push('/register');
};

const handleGoogleLogin = () => {
  // 替換為您的 Google OAuth 登入網址
  window.location.href = 'https://new-web.elf.tw/api/auth/google';
  // 或者如果您使用 @react-oauth/google 等套件
  // googleLogin();
};
</script>

<style scoped>
/* 確保彈窗在所有瀏覽器中都能正確置中 */
.fixed.inset-0 {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh; /* 支援動態視窗高度 */
}

/* 確保彈窗內容不會超出視窗 */
.bg-white.dark\:bg-gray-800 {
  margin: auto;
  transform: translateZ(0); /* 強制硬體加速 */
}
</style>