<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative z-[61] mx-auto my-auto"
      style="max-height: 90vh; overflow-y: auto;"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ isLoginMode ? t('auth.login.title') : t('auth.register.title') }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <X :size="24" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Login Form -->
        <form v-if="isLoginMode" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.email') }}
            </label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.email.placeholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.password') }}
            </label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.password.placeholder')"
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ isLoading ? t('auth.loading') : t('auth.login.submit') }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.name') }}
            </label>
            <input
              v-model="registerForm.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.name.placeholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.email') }}
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.email.placeholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.password') }}
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.password.placeholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('auth.confirmPassword') }}
            </label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              :placeholder="t('auth.confirmPassword.placeholder')"
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading || registerForm.password !== registerForm.confirmPassword"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {{ isLoading ? t('auth.loading') : t('auth.register.submit') }}
          </button>
          
          <!-- Password Mismatch Warning -->
          <div
            v-if="registerForm.confirmPassword && registerForm.password !== registerForm.confirmPassword"
            class="text-red-500 text-sm text-center"
          >
            {{ t('auth.passwordMismatch') }}
          </div>
        </form>

        <!-- Switch Mode -->
        <div class="mt-6 text-center">
          <button
            @click="switchMode"
            class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            {{ isLoginMode ? t('auth.switchToRegister') : t('auth.switchToLogin') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { X } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';
import { useAuth } from '@/composables/useAuth';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();
const { login, register, isLoading } = useAuth();

const isLoginMode = ref(true);

const loginForm = reactive({
  email: '',
  password: ''
});

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const closeModal = () => {
  emit('close');
  // Reset forms
  Object.assign(loginForm, { email: '', password: '' });
  Object.assign(registerForm, { name: '', email: '', password: '', confirmPassword: '' });
  isLoginMode.value = true;
};

const switchMode = () => {
  isLoginMode.value = !isLoginMode.value;
  // Clear forms when switching
  Object.assign(loginForm, { email: '', password: '' });
  Object.assign(registerForm, { name: '', email: '', password: '', confirmPassword: '' });
};

const handleLogin = async () => {
  const result = await login(loginForm);
  if (result.success) {
    closeModal();
  } else {
    alert(result.error || '登入失敗，請檢查您的帳號密碼');
  }
};

const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    return; // Error message is shown in template
  }
  
  const result = await register({
    name: registerForm.name,
    email: registerForm.email,
    password: registerForm.password
  });
  
  if (result.success) {
    closeModal();
  } else {
    alert(result.error || '註冊失敗，請稍後再試');
  }
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