import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';

const currentUser = ref<User | null>(null);
const isLoading = ref(false);

export function useAuth() {
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    try {
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬登入成功
      const user: User = {
        id: '1',
        email: credentials.email,
        name: '測試用戶',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        isVip: false,
        joinDate: new Date(),
        totalOrders: 5,
        totalSpent: 15000
      };
      
      currentUser.value = user;
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: '登入失敗' };
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    isLoading.value = true;
    try {
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬註冊成功
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        isVip: false,
        joinDate: new Date(),
        totalOrders: 0,
        totalSpent: 0
      };
      
      currentUser.value = user;
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: '註冊失敗' };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('user');
  };

  const initAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      currentUser.value = JSON.parse(savedUser);
    }
  };

  const upgradeToVip = async () => {
    if (currentUser.value) {
      currentUser.value.isVip = true;
      localStorage.setItem('user', JSON.stringify(currentUser.value));
    }
  };

  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated: computed(() => !!currentUser.value),
    isLoading: computed(() => isLoading.value),
    login,
    register,
    logout,
    initAuth,
    upgradeToVip
  };
}