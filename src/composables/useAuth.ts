import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import { sha512 } from 'js-sha512';
import { md5 } from 'js-md5';
import CryptoJS from 'crypto-js';

const currentUser = ref<User | null>(null);
const isLoading = ref(false);

// 與C#相同的 DES+MD5 加密函式
function md5Encrypt(txt: string, skey: string): string {
  // 1. 先用 MD5 算出 key
  const md5Key = CryptoJS.MD5(skey).toString().substring(0, 8);
  const key = CryptoJS.enc.Utf8.parse(md5Key);
  const iv = CryptoJS.enc.Utf8.parse(md5Key);

   // DES 加密
   const encrypted = CryptoJS.DES.encrypt(txt, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // 3. 轉成大寫十六進制字串
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}

// 登入成功後自動跳轉到 work.elf.com.tw
function jumpToWorkElf(email: string, password: string) {
  // 範例：用 C# 相同邏輯加密 password
  const skey = "9B3DCD0BA36C67A9B8CA7D0D1C669D42";
  const encrypted = md5Encrypt(password, skey);

  const v2 = sha512('AIR' + encrypted + 'ELF');
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://work.elf.com.tw/index.aspx';

  const inputV1 = document.createElement('input');
  inputV1.type = 'hidden';
  inputV1.name = 'v1';
  inputV1.value = email;
  form.appendChild(inputV1);

  const inputV2 = document.createElement('input');
  inputV2.type = 'hidden';
  inputV2.name = 'v2';
  inputV2.value = v2;
  form.appendChild(inputV2);

  document.body.appendChild(form);
  form.submit();
}

export function useAuth() {
  const login = async (credentials: LoginCredentials) => {
  // 這裡可以加前端格式驗證（如 email/password 不為空）
  jumpToWorkElf(credentials.email, credentials.password);
  return { success: true };
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