import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import * as MemberAPI from '@/apis/MemberAPI';

const currentUser = ref<User | null>(null);
const isLoading = ref(false);

export function useAuth() {
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    try {
      // 呼叫 API 取得 token 與 user
      alert(credentials.email)
      const res = await MemberAPI.login(credentials);
      // 假設回傳格式 { token, user }
      if (res.token && res.user) {
        currentUser.value = res.user;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        return { success: true };
      } else {
        return { success: false, error: '登入失敗，缺少 token' };
      }
    } catch (error) {
      return { success: false, error: error?.message || '登入失敗' };
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
    localStorage.removeItem('token');
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

  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated: computed(() => !!currentUser.value),
    isLoading: computed(() => isLoading.value),
    login,
    register,
    logout,
    initAuth,
    upgradeToVip,
    getToken
  };
}