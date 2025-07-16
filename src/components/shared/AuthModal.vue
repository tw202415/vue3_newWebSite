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